import axios from 'axios';

const api = axios.create({
  baseURL: "http://18.212.69.28:8080/"
  // baseURL: "http://localhost:8080/"
});

export default api;