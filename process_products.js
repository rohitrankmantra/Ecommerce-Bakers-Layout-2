
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'lib', 'products.js');

// 1. Read the file
let fileContent = fs.readFileSync(filePath, 'utf8');

// 2. Extract the array part
// We assume the file format is: export const products = [ ... ]; ...
const startMarker = 'export const products = [';
const endMarker = '];'; // We need to find the closing bracket for the array

const startIndex = fileContent.indexOf(startMarker);
if (startIndex === -1) {
    console.error('Could not find products array start');
    process.exit(1);
}

// Find the matching closing bracket
let openBrackets = 0;
let arrayEndIndex = -1;
let arrayStartIndex = startIndex + startMarker.length - 1; // pointing to '['

for (let i = arrayStartIndex; i < fileContent.length; i++) {
    if (fileContent[i] === '[') openBrackets++;
    if (fileContent[i] === ']') openBrackets--;
    
    if (openBrackets === 0) {
        arrayEndIndex = i + 1;
        break;
    }
}

if (arrayEndIndex === -1) {
    console.error('Could not find products array end');
    process.exit(1);
}

const arrayString = fileContent.substring(startIndex + 'export const products = '.length, arrayEndIndex);

// 3. Parse the array
// Since the file has `null` and object literals with unquoted keys, `JSON.parse` won't work directly.
// We'll use `eval` which is safe enough here as we are processing a local file we just read.
let products;
try {
    products = eval('(' + arrayString + ')');
} catch (e) {
    console.error('Failed to parse products array:', e);
    process.exit(1);
}

// 4. Fix Corruption (Replace null with Belgian Choco Truffle)
// If the first item is null, replace it.
if (products[0] === null) {
    products[0] = {
        id: 1,
        name: 'Belgian Choco Truffle ',
        price: 650.0,
        category: 'tea-time-cake',
        image: 'https://res.cloudinary.com/dzq7axes2/image/upload/v1769579287/_STU0302_hes6qb.jpg',
        images: [
            'https://res.cloudinary.com/dzq7axes2/image/upload/v1769579287/_STU0302_hes6qb.jpg',
            'https://res.cloudinary.com/dzq7axes2/image/upload/v1769579287/_STU0302_hes6qb.jpg',
            'https://res.cloudinary.com/dzq7axes2/image/upload/v1769579287/_STU0302_hes6qb.jpg',
        ],
        featured: true,
    };
}

// 5. Fix Categories
// Logic: 
// - If category is 'rusk' AND name contains 'bread', 'loaf', 'bun' -> 'fresh-bread'
// - If category is 'rusk' AND name contains 'dry cake' -> 'tea-time-cake' (to satisfy "Rusk -> Tea Cake" order)
products.forEach(p => {
    if (!p) return;
    const nameLower = p.name.toLowerCase();
    
    if (p.category === 'rusk') {
        if (nameLower.includes('bread') || nameLower.includes('loaf') || nameLower.includes('bun')) {
            p.category = 'fresh-bread';
        } else if (nameLower.includes('dry cake')) {
            p.category = 'tea-time-cake';
        }
    }
});

// 6. Sort
// Order: Biscuits (1) -> Rusk (2) -> Tea Cake (3) -> Bread (4)
const categoryOrder = {
    'biscuit-and-confections': 1,
    'rusk': 2,
    'tea-time-cake': 3,
    'fresh-bread': 4
};

products.sort((a, b) => {
    const orderA = categoryOrder[a.category] || 99;
    const orderB = categoryOrder[b.category] || 99;
    
    if (orderA !== orderB) {
        return orderA - orderB;
    }
    return 0; // Maintain stable sort otherwise
});

// 7. Renumber IDs
products.forEach((p, idx) => {
    p.id = idx + 1;
});

// 8. Generate Output
// Convert back to string with unquoted keys if possible, or just formatted JSON
// To keep it clean and simple, we'll use a helper to stringify with unquoted keys where valid.
function stringifyProduct(obj) {
    const entries = Object.entries(obj).map(([key, value]) => {
        let valStr;
        if (typeof value === 'string') {
            valStr = `'${value}'`; // Use single quotes
        } else if (Array.isArray(value)) {
            valStr = `[\n      ${value.map(v => `'${v}'`).join(',\n      ')}\n    ]`;
        } else {
            valStr = value;
        }
        return `${key}: ${valStr}`;
    });
    return `  {\n    ${entries.join(',\n    ')},\n  }`;
}

const newArrayString = `[\n${products.map(stringifyProduct).join(',\n')}\n]`;

// 9. Write back
const newFileContent = fileContent.substring(0, startIndex + 'export const products = '.length) + 
                       newArrayString + 
                       fileContent.substring(arrayEndIndex);

fs.writeFileSync(filePath, newFileContent, 'utf8');
console.log(`Successfully processed ${products.length} products.`);
