import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';
import generalMessages from '../utils/messages/general.message';
import accountMessages from '../utils/messages/account.message';
import TransactionService from '../services/transactions.service';
import AccountService from '../services/accounts.service';

let myuuid = uuidv4();
const { INTERNAL_SERVER_ERROR, OK, BAD_REQUEST } = StatusCodes;
const { Msg_Server_Error } = generalMessages;
const { Msg_No_Amount_Supplied, Msg_Update_Success } = accountMessages;
const { createTransactionService } = TransactionService;
const { findAccountIdService, updateAccountBalanceService } = AccountService;

export default class AccountsController {
  static async depositMoneyToWalletBalance(req: Request, res: Response) {
    try {
      let referenceNo = myuuid;
      const userId: string = req.user?.userId || '';

      const { amount } = req.body;
      if (!amount) {
        return res.status(400).json({
          status: BAD_REQUEST,
          message: Msg_No_Amount_Supplied,
        });
      }
      // create transaction record
      const account: any = await findAccountIdService(userId);
      const createTransaction = await createTransactionService({
        userId,
        accountId: account.id,
        amount,
        referenceNo,
        category: 'wallet-deposit',
      });
      // update user wallet
      const updateUserAccountBalance = await updateAccountBalanceService(
        userId,
        amount,
      );
      return res.status(200).json({
        status: OK,
        message: Msg_Update_Success,
        createTransaction,
        updateUserAccountBalance,
      });
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ status: INTERNAL_SERVER_ERROR, error: Msg_Server_Error });
    }
  }
}
