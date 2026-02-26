import axios from 'axios'

// use environment variable so we can point at Render in production
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://master-bakers-backend-n9iw.onrender.com/api',
  withCredentials: true, // cookies still used for other data if needed
  headers: { 'Content-Type': 'application/json' },
})

// Only attach interceptors on the client side; server builds can't access localStorage
if (typeof window !== 'undefined') {
  // attach visitor token from localStorage to every request
  api.interceptors.request.use((config) => {
    try {
      const token = localStorage.getItem('visitor_token');
      if (token) {
        config.headers['x-visitor-token'] = token;
      }
    } catch (e) {
      // ignore
    }
    return config;
  });

  // capture new token sent by server and persist it
  api.interceptors.response.use((response) => {
    const newToken = response.headers['x-visitor-token'];
    if (newToken) {
      try {
        localStorage.setItem('visitor_token', newToken);
      } catch (e) {
        // ignore
      }
    }
    return response;
  });
}

export default api
