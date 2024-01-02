import Sequelize from "sequelize";
import { Model } from "sequelize-typescript";
import { sequelize } from "../../../../Database/Sequelize";
import { Account } from "../../account/models/account.model";

export interface UserModel extends Model {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export const User = sequelize.define<UserModel>("users", {
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  role: Sequelize.ENUM("user", "admin"),
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
User.hasOne(Account);
