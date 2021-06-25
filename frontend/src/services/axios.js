import axios from 'axios';
import { baseUrl } from '../components/utils/baseURLs/baseurls';
const token = localStorage.getItem('token');

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'Access-Control-Allow-Origin': true,
  },
});

instance.interceptors.request.use((config) => {
  const configInstance = { ...config };
  config.headers.Authorization = `Bearer ${token}`;
  return configInstance;
});

export default instance;
