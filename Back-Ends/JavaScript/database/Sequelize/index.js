import Sequelize from "sequelize";
import { config } from "dotenv";
import users from "../../src/Module/User/Model/users.model.js";
import groups from "../../src/Module/Group/Model/group.model.js";
import accounts from "../../src/Module/Account/Model/accounts.model.js";
import transactions from "../../src/Module/Transaction/Model/transaction.model.js";

config();

const sequelize = new Sequelize(
  process.env.DEV_DATABASE_URL || process.env.TEST_DATABASE_URL,
);
const db = {};

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

const modelExports = [users, groups, accounts, transactions];

modelExports.forEach((exportedModel) => {
  const model = exportedModel(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
