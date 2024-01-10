import axios from 'axios';
import { getToken } from '../Storage/local.storage';

const baseURL = 'http://localhost:3000';

const token = getToken();

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: '*/*',
    Authorization: `${token}`,
    'Access-Control-Allow-Origin': true,
  },
});

instance.interceptors.request.use((config) => {
  const configInstance = { ...config };
  config.headers.Authorization = `${token}`;
  return configInstance;
});

export default instance;
