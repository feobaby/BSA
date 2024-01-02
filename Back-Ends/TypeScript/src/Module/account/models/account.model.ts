import Sequelize from "sequelize";
import { Model } from "sequelize-typescript";
import { sequelize } from "../../../../Database/Sequelize";

export interface AccountModel extends Model {
  userId: string;
  balance: string;
  createdAt: Date;
  updatedAt: Date;
}

export const Account = sequelize.define<AccountModel>("accounts", {
  userId: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false,
    references: {
      model: "User",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  balance: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
