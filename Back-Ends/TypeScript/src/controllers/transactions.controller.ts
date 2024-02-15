import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import generalMessages from '../utils/messages/general.message';

import TransactionService from '../services/transactions.service';
import transactionMessages from '../utils/messages/transaction.message';

const { INTERNAL_SERVER_ERROR, OK } = StatusCodes;
const { Msg_Server_Error } = generalMessages;
const { findTransactionService } = TransactionService;
const { Msg_Fetch_Transactions } = transactionMessages;

export default class TransactionsController {
  static async fetchTransactions(req: Request, res: Response) {
    try {
      const userId: string = req.user?.userId || '';
      const data = await findTransactionService(userId);
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
