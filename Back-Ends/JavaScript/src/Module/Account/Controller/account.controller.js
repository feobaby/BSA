import { StatusCodes } from "http-status-codes";
import db from "../../../../database/Sequelize/index.js";
import generalMessages from "../../Utils/general-messages.js";
import { v4 as uuidv4 } from "uuid";

let myuuid = uuidv4();
const { accounts, transactions } = db;
const { INTERNAL_SERVER_ERROR, OK } = StatusCodes;
const { Msg_Server_Error, Msg_Update_Success } = generalMessages;

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

      const { balance, amount } = req.body;
      const addToBalance = balance + amount;
      await accounts.update({ balance: addToBalance }, { where: { userId } });
      const account = await accounts.findOne({ where: { userId } });

      await transactions.create({
        userId,
        accountId: account.id,
        amount,
        referenceNo,
        category: "wallet-deposit",
      });
      return res.status(200).json({
        status: OK,
        message: Msg_Update_Success,
      });
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ status: INTERNAL_SERVER_ERROR, error: Msg_Server_Error });
    }
  }
}
