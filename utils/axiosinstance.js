import axios from 'axios'

// use environment variable so we can point at Render in production
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://master-bakers-backend-n9iw.onrender.com/api',
  // baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  withCredentials: true, // cookies still used for other data if needed
  headers: { 'Content-Type': 'application/json' },
})

// Flag to track if interceptors are set up
let interceptorsSet = false;

export function setupCartInterceptors() {
  // Only set up once
  if (interceptorsSet) {
    // console.log('[CART] Interceptors already set up, skipping...');
    return;
  }
  
  interceptorsSet = true;
  // console.log('[CART] 🔧 Setting up interceptors...');

  // attach visitor token from localStorage to every request
  api.interceptors.request.use((config) => {
    try {
      const token = localStorage.getItem('visitor_token');
      if (token) {
        config.headers['x-visitor-token'] = token;
        // console.log('[CART] 📤 REQUEST: Sending token from localStorage');
      } else {
        // console.log('[CART] ⚠️  REQUEST: No token in localStorage, backend will generate');
      }
    } catch (e) {
      console.error('[CART] ❌ REQUEST Error:', e.message);
    }
    return config;
  });

  // capture new token sent by server and persist it
  api.interceptors.response.use(
    (response) => {
      // Success response - save token
      const newToken = response.headers['x-visitor-token'];
      if (newToken) {
        try {
          localStorage.setItem('visitor_token', newToken);
          // console.log('[CART] 💾 RESPONSE: Token saved to localStorage');
        } catch (e) {
          // console.error('[CART] ❌ RESPONSE Error saving token:', e.message);
        }
      }
      return response;
    },
    (error) => {
      // Error response - also try to save token
      if (error.response?.headers['x-visitor-token']) {
        try {
          localStorage.setItem('visitor_token', error.response.headers['x-visitor-token']);
          // console.log('[CART] 💾 ERROR RESPONSE: Token saved to localStorage');
        } catch (e) {
          console.error('[CART] ❌ Error response save failed:', e.message);
        }
      }
      return Promise.reject(error);
    }
  );
  
  // console.log('[CART] ✅ Interceptors setup complete');
}

export default api
