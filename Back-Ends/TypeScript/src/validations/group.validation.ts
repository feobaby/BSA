import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import groupMessage from '../utils/messages/group.message';
import { Groups } from '../database/Models/groups.model';
import { Accounts } from '../database/Models/accounts.model';

const { UNAUTHORIZED, NOT_FOUND, BAD_REQUEST } = StatusCodes;
const {
  Msg_Group_Not_Found,
  Msg_Exceeded_Group_Balance_Funds,
  Msg_Insufficient_Funds,
  Msg_Limited_Amount,
  Msg_Group_Delete_Balance,
} = groupMessage;

export default class GroupsValidationController {
  static async validateUserGroupGoalBalance(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (req.body.goalBalance > 10000) {
        return res.status(UNAUTHORIZED).json({
          status: UNAUTHORIZED,
          error: Msg_Limited_Amount,
        });
      }
      return next();
    } catch (error) {}
  }

  static async validateIfAGroupByUserExists(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await Groups.findByPk(req.params.id);
      if (!result) {
        return res
          .status(NOT_FOUND)
          .json({ status: NOT_FOUND, error: Msg_Group_Not_Found });
      }
      return next();
    } catch (error) {}
  }

  static async validateDeletionOfGroup(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result: any = await Groups.findByPk(req.params.id);
      if (result.goalBalance > 0.0) {
        return res.status(UNAUTHORIZED).json({
          status: UNAUTHORIZED,
          error: Msg_Group_Delete_Balance,
        });
      }
      return next();
    } catch (error) {}
  }

  static async validateTotalFundsForGroupGoalBalance(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const findGroupBalance = await Groups.findOne({
        where: { id },
      });
      if (findGroupBalance?.groupBalance === findGroupBalance?.goalBalance) {
        return res.status(BAD_REQUEST).json({
          status: BAD_REQUEST,
          error: Msg_Exceeded_Group_Balance_Funds,
        });
      }
      return next();
    } catch (error) {}
  }

  // static async validateUserAccountBalanceForGroupAddition(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction,
  // ) {
  //   try {
  //     const userId: string = req.user?.userId || '';
  //     const { amount } = req.body;
  //     const account: any = await Accounts.findOne({ where: { userId } });
  //     // if the amount you want to deposit exceeds your personal balance
  //     if (amount > account.balance) {
  //       return res.status(BAD_REQUEST).json({
  //         status: BAD_REQUEST,
  //         error: Msg_Insufficient_Funds,
  //       });
  //     }
  //     return next();
  //   } catch (error) {}
  // }
}
