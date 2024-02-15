import { Model } from 'sequelize-typescript';

export interface UserModel extends Model {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface TransactionModel extends Model {
  userId: string;
  accountId: string;
  amount: string;
  referenceNo: string;
  category: string;
}

export interface AccountModel extends Model {
  userId: string;
  balance: string;
}

export interface GroupModel extends Model {
  userId: string;
  name: string;
  description: string;
  category: string;
  groupBalance: string;
  goalBalance: string;
  currency: string;
  emails: string;
  status: string;
}
