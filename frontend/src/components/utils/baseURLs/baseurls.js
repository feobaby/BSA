import { config } from 'dotenv';

config();

const environment = process.env.NODE_ENV;

const productionEnvironment = environment === 'production';

let baseUrl;
let logOutbaseUrl;

if (productionEnvironment) baseUrl = 'https://bsa-backend.herokuapp.com/api/v1';
else baseUrl = 'http://localhost:3000/api/v1';

if (productionEnvironment) logOutbaseUrl = 'https://bsa-fibre.netlify.app/';
else logOutbaseUrl = 'http://localhost:8080/';

export { baseUrl, logOutbaseUrl };
