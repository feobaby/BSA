import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/Sequelize/index';
import { UserModel } from '../../utils/types/database/database.type';
import { Accounts } from './accounts.model';
import { Groups } from './groups.model';
import { Transactions } from './transactions.model';

export const Users = sequelize.define<UserModel>('users', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'Admin'),
    defaultValue: 'user',
    allowNull: false,
  },
});
Users.hasOne(Accounts, { as: 'UserAccount', foreignKey: 'userId' });
Users.hasMany(Groups, { as: 'GroupsCreatedByUser', foreignKey: 'userId' });
Users.hasMany(Transactions, { as: 'UserTransactions', foreignKey: 'userId' });
