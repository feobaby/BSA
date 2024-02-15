import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/Sequelize/index';
import { AccountModel } from '../../utils/types/database/database.type';

export const Accounts = sequelize.define<AccountModel>('accounts', {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
    unique: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  balance: {
    type: DataTypes.STRING,
    defaultValue: '0.00',
    allowNull: false,
  },
});
