import axios from 'axios'

// use environment variable so we can point at Render in production
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://master-bakers-backend-n9iw.onrender.com/api',
  withCredentials: true, // required for cookies
  headers: { 'Content-Type': 'application/json' },
})

export default api
