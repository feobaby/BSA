import { AccountServiceModel } from '../utils/types/services/service.type';
import { Accounts } from '../database/Models/accounts.model';
import currency from 'currency.js';

export default class AccountService {
  public static async createAccountService(data: AccountServiceModel) {
    try {
      return await Accounts.create(data);
    } catch (error) {
      return error;
    }
  }
  public static async findAccountIdService(userId: string) {
    try {
      return await Accounts.findOne({ where: { userId } });
    } catch (error) {
      return error;
    }
  }
  public static async updateAccountTransactionService(
    userId: string,
    amount: string,
  ) {
    try {
      const accountBalance: any =
        await AccountService.findAccountIdService(userId);
      if (!accountBalance) {
        return 'Account balance not found for the user.';
      }

      const newAccountBalance = currency(accountBalance.balance).subtract(
        amount,
      );
      return await Accounts.update(
        { balance: newAccountBalance.value },
        { where: { id: userId } },
      );
    } catch (error) {
      return error;
    }
  }
  public static async updateAccountBalanceService(
    userId: string,
    amount: string,
  ) {
    try {
      const accountBalance: any =
        await AccountService.findAccountIdService(userId);
      if (!accountBalance) {
        return 'Account balance not found for the user.';
      }
      const newAccountBalance = currency(accountBalance.balance).add(amount);
      return await Accounts.update(
        { balance: newAccountBalance.value },
        { where: { id: userId } },
      );
    } catch (error) {
      return error;
    }
  }
}
