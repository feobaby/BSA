import { Account } from "../models/account.model";
import { AccountAddModel } from "../interfaces/account.interface";

class AccountService {
  public static async createAccount(data: AccountAddModel) {
    try {
      return await Account.create(data);
    } catch (e) {
      return e;
    }
  }
}
export default AccountService;
