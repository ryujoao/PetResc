import axios from 'axios';

const api = axios.create({
  baseURL: 'https://petresc.onrender.com/api',
});

api.interceptors.request.use((config) => {
   const token = localStorage.getItem('@AuthData:token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api ;