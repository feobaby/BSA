import { TransactionServiceModel } from '../utils/types/services/service.type';
import { Transactions } from '../database/Models/transactions.model';
import AccountService from './accounts.service';
import { Accounts } from '../database/Models/accounts.model';

export default class TransactionService {
  public static async createTransactionService(data: TransactionServiceModel) {
    try {
      return await Transactions.create(data);
    } catch (error) {
      return error;
    }
  }
  public static async findTransactionService(userId: string) {
    try {
      return await Transactions.findAndCountAll({
        where: { userId },
        order: [['createdAt', 'DESC']],
      });
    } catch (error) {
      return error;
    }
  }
}
