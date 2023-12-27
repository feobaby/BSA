import db from "../../../../database/Sequelize/index.js";
import { StatusCodes } from "http-status-codes";
import generalMessages from "../../Utils/general-messages.js";

const { groups, accounts } = db;
const { UNAUTHORIZED, NOT_FOUND, BAD_REQUEST } = StatusCodes;
const {
  Msg_Group_Not_Found,
  Msg_Exceeded_Group_Balance_Funds,
  Msg_Insufficient_Funds,
  Msg_Limited_Amount,
  Msg_Group_Delete_Balance,
} = generalMessages;

/**
 * @class UserValidationController
 * @description Controller for Users Validation
 * @exports GroupsValidationController
 */
export default class GroupsValidationController {
  static async validateUserGroupGoalBalance(req, res, next) {
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

  static async validateIfAGroupByUserExists(req, res, next) {
    try {
      const result = await groups.findByPk(req.params.id);
      if (!result) {
        return res
          .status(NOT_FOUND)
          .json({ status: NOT_FOUND, error: Msg_Group_Not_Found });
      }
      return next();
    } catch (error) {}
  }

  static async validateDeletionOfGroup(req, res, next) {
    try {
      const result = await groups.findByPk(req.params.id);
      if (result.goalBalance > 0.0) {
        return res.status(UNAUTHORIZED).json({
          status: UNAUTHORIZED,
          error: Msg_Group_Delete_Balance,
        });
      }
      return next();
    } catch (error) {}
  }

  static async validateFundsForGroupGoalBalance(req, res, next) {
    try {
      const { goalBalance, groupBalance, amount } = req.body;

      // calculate the group's balance against the group's goal balance
      const checkRemainingGoalBalance = goalBalance - groupBalance;

      // if an amount that is trying to be added exceeds remaining amount that should be added to group's goal balance
      if (amount > checkRemainingGoalBalance) {
        return res.status(BAD_REQUEST).json({
          status: BAD_REQUEST,
          error: Msg_Exceeded_Group_Balance_Funds,
        });
      }
      return next();
    } catch (error) {}
  }

  static async validateUserAccountBalanceForGroupAddition(req, res, next) {
    try {
      const { amount } = req.body;
      const { userId } = req.user;
      const account = await accounts.findOne({ where: { userId } });
      // if the amount you want to deposit exceeds your personal balance
      if (amount > account.balance) {
        return res.status(BAD_REQUEST).json({
          status: BAD_REQUEST,
          error: Msg_Insufficient_Funds,
        });
      }
      return next();
    } catch (error) {}
  }
}
