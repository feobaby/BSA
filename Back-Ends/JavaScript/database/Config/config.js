import { config } from "dotenv";

config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USER_TEST,
    password: process.env.DB_PASS_TEST,
    database: process.env.DB_NAME_TEST,
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres",
  },
};
