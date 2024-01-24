import axios from 'axios';
import { getToken } from '../Storage/local.storage';

const baseURL = 'http://localhost:3000';

const token = getToken();

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: '*/*',
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
