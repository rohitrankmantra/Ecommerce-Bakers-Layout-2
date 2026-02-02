
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'lib', 'products.js');

// 1. Read the file
let fileContent = fs.readFileSync(filePath, 'utf8');

// 2. Locate the products block
const productsStartMarker = 'export const products = [';
const productsStartIndex = fileContent.indexOf(productsStartMarker);

if (productsStartIndex === -1) {
    console.error('Could not find products array start');
    process.exit(1);
}

// Find the next export or end of file
const nextExportIndex = fileContent.indexOf('export const', productsStartIndex + 1);
let productsEndIndex;

if (nextExportIndex !== -1) {
    productsEndIndex = nextExportIndex;
} else {
    productsEndIndex = fileContent.length;
}

const originalProductsBlock = fileContent.substring(productsStartIndex, productsEndIndex);

// 3. Extract Valid Objects from the Block
// The block is corrupted at the start.
// We look for the first occurrence of "id: 2," or "id: 2" inside a curly brace.
// But wait, indentation might vary.
// Let's find the first `{` that is followed (eventually) by `id: 2`.
// Actually, simpler: finding "id: 2," and then backtracking to `{`.

const id2Index = originalProductsBlock.indexOf('id: 2,');
if (id2Index === -1) {
    console.error('Could not find "id: 2" in products block. Aborting to avoid data loss.');
    process.exit(1);
}

// Backtrack to find the opening '{'
let validDataStartIndex = -1;
for (let i = id2Index; i >= 0; i--) {
    if (originalProductsBlock[i] === '{') {
        validDataStartIndex = i;
        break;
    }
}

if (validDataStartIndex === -1) {
    console.error('Could not find start of first valid object.');
    process.exit(1);
}

// Find the end of the array ']'
// It should be the last ']' in the block before the next export.
const arrayCloseIndex = originalProductsBlock.lastIndexOf(']');
if (arrayCloseIndex === -1 || arrayCloseIndex < validDataStartIndex) {
    console.error('Could not find closing bracket for products array.');
    process.exit(1);
}

// Extract the string containing valid objects
const validObjectsString = originalProductsBlock.substring(validDataStartIndex, arrayCloseIndex);

// 4. Parse Objects
let validProducts;
try {
    // Wrap in brackets to make it an array
    validProducts = eval('[' + validObjectsString + ']');
} catch (e) {
    console.error('Failed to parse valid products:', e);
    // Fallback: try to cleanup trailing comma if any
    try {
        validProducts = eval('[' + validObjectsString.trim().replace(/,$/, '') + ']');
    } catch (e2) {
        console.error('Retry failed:', e2);
        process.exit(1);
    }
}

// 5. Restore First Product
const product1 = {
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

const allProducts = [product1, ...validProducts];

// 6. Fix Categories
// Logic: 
// - If category is 'rusk' AND name contains 'bread', 'loaf', 'bun' -> 'fresh-bread'
// - If category is 'rusk' AND name contains 'dry cake' -> 'tea-time-cake'
allProducts.forEach(p => {
    if (!p) return;
    const nameLower = p.name.toLowerCase();
    
    if (p.category === 'rusk') {
        if (nameLower.includes('bread') || nameLower.includes('loaf') || nameLower.includes('bun') || nameLower.includes('kulcha') || nameLower.includes('pav')) {
            p.category = 'fresh-bread';
        } else if (nameLower.includes('dry cake')) {
            p.category = 'tea-time-cake';
        }
    }
});

// 7. Sort
// Order: Biscuits (1) -> Rusk (2) -> Tea Cake (3) -> Bread (4)
const categoryOrder = {
    'biscuit-and-confections': 1,
    'rusk': 2,
    'tea-time-cake': 3,
    'fresh-bread': 4
};

allProducts.sort((a, b) => {
    const orderA = categoryOrder[a.category] || 99;
    const orderB = categoryOrder[b.category] || 99;
    
    if (orderA !== orderB) {
        return orderA - orderB;
    }
    // Secondary sort by name for stability
    return a.name.localeCompare(b.name);
});

// 8. Renumber IDs
allProducts.forEach((p, idx) => {
    p.id = idx + 1;
});

// 9. Generate Output
function stringifyProduct(obj) {
    const entries = Object.entries(obj).map(([key, value]) => {
        let valStr;
        if (typeof value === 'string') {
            valStr = `'${value}'`;
        } else if (typeof value === 'number') {
             // ensure float format like 650.0 if integer? JS doesn't distinguish. 
             // original file had 650.0, but 650 is fine.
             valStr = value;
        } else if (Array.isArray(value)) {
            valStr = `[\n      ${value.map(v => `'${v}'`).join(',\n      ')}\n    ]`;
        } else {
            valStr = value;
        }
        return `${key}: ${valStr}`;
    });
    return `  {\n    ${entries.join(',\n    ')},\n  }`;
}

const newArrayString = `[\n${allProducts.map(stringifyProduct).join(',\n')}\n]`;

const newProductsBlock = `export const products = ${newArrayString};\n\n`;

// 10. Replace in file
const newFileContent = fileContent.substring(0, productsStartIndex) + 
                       newProductsBlock + 
                       fileContent.substring(productsEndIndex);

fs.writeFileSync(filePath, newFileContent, 'utf8');
console.log(`Successfully restored and processed ${allProducts.length} products.`);
