import { StatusCodes } from "http-status-codes";
import db from "../../../../database/Sequelize/index.js";
import generalMessages from "../../Utils/general-messages.js";
import { v4 as uuidv4 } from "uuid";
import currency from 'currency.js';

let myuuid = uuidv4();
const { accounts, transactions } = db;
const { INTERNAL_SERVER_ERROR, OK, BAD_REQUEST } = StatusCodes;
const { Msg_Server_Error, Msg_Update_Success, Msg_No_Amount_Supplied } = generalMessages;

/**
 * @class AccountsController
 * @description Controllers for Accounts
 * @exports AccountsController
 */
export default class AccountsController {
  static async depositMoneyToWalletBalance(req, res) {
    try {
      let referenceNo = myuuid;
      const { userId } = req.user;

      const { amount } = req.body;
      if (!amount) {
        return res.status(400).json({
          status: BAD_REQUEST,
          message: Msg_No_Amount_Supplied,
        });
      }
      const account = await accounts.findOne({ where: { userId } });
      let formatBalance = currency(account.balance)
      let formatAmount = currency(amount)
      const addToBalance = formatBalance.add(formatAmount)
      const updateWalletBalance = await accounts.update(
        { balance: addToBalance.value },
        { where: { userId } },
      );
      const createTransaction = await transactions.create({
        userId,
        accountId: account.id,
        amount,
        referenceNo,
        category: "wallet-deposit",
      });
      return res.status(200).json({
        status: OK,
        message: Msg_Update_Success,
        updateWalletBalance,
        createTransaction,
      });
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ status: INTERNAL_SERVER_ERROR, error: Msg_Server_Error });
    }
  }
}
