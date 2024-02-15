import { DataTypes } from 'sequelize';
import { sequelize } from '../Sequelize/index';
import { TransactionModel } from '../../utils/types/database/database.type';

export const Transactions = sequelize.define<TransactionModel>('transactions', {
  userId: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  accountId: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: 'Accounts',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  referenceNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM('wallet-deposit', 'group-deposit'),
    allowNull: false,
  },
});
