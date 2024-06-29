import axios from 'axios';

const baseURL = 'http://localhost:5000/api/v1';

const authAxios = axios.create({ baseURL: `${baseURL}/auth` });
const scrappingAxios = axios.create({ baseURL });

scrappingAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export { authAxios, scrappingAxios };
