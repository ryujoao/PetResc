import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // A URL do seu backend
});

export default api;