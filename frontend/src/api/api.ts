import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5177/api',
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // si usas JWT
  if (token && config.headers) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export default API;
