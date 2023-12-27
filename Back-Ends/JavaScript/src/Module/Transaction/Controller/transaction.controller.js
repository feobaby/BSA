import { StatusCodes } from "http-status-codes";
import db from "../../../../database/Sequelize/index.js";
import generalMessages from "../../Utils/general-messages.js";

const { transactions } = db;
const { INTERNAL_SERVER_ERROR, OK } = StatusCodes;
const { Msg_Server_Error, Msg_Fetch_Transactions } = generalMessages;

/**
 * @class TransactionsController
 * @description Controllers for Transactions
 * @exports TransactionsController
 */
export default class TransactionsController {
  static async fetchTransactions(req, res) {
    try {
      const data = await transactions.findAndCountAll({
        where: { userId: req.user.userId },
        order: [["createdAt", "DESC"]],
      });
      return res
        .status(OK)
        .json({ status: OK, message: Msg_Fetch_Transactions, data });
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ status: INTERNAL_SERVER_ERROR, error: Msg_Server_Error });
    }
  }
}
