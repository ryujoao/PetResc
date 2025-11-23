import axios from 'axios';

const api = axios.create({
  baseURL: 'https://petresc.onrender.com'
});

export default api;

