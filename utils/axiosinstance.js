import axios from 'axios'

const api = axios.create({
  baseURL: 'https://master-bakers-backend-n9iw.onrender.com/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})


export default api
