import db from "../../../../database/Sequelize/index.js";
import { StatusCodes } from "http-status-codes";
import userMessages from "../Messages/user.messages.js";
import Helper from "../../Utils/bcrypt.js";
import generalMessages from "../../Utils/general-messages.js";
const { comparePassword } = Helper;

const { users } = db;
const { UNAUTHORIZED, INTERNAL_SERVER_ERROR, CONFLICT, NOT_FOUND } =
  StatusCodes;
const { Msg_Conflict_Email, Msg_Wrong_Password } = userMessages;
const { Msg_Server_Error, Msg_Email_Not_Found } = generalMessages;

/**
 * @class UserValidationController
 * @description Controller for Users Validation
 * @exports UsersValidationController
 */
export default class UsersValidationController {
  static async validateUserEmail(req, res, next) {
    try {
      const { email } = req.body;
      const findUserEmail = await users.findOne({ where: { email } });
      if (findUserEmail) {
        return res
          .status(CONFLICT)
          .json({ status: CONFLICT, error: Msg_Conflict_Email });
      }
      return next();
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ status: INTERNAL_SERVER_ERROR, error: Msg_Server_Error });
    }
  }

  static async verifyPassword(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await users.findOne({ where: { email } });
      const isPasswordValid = await comparePassword(user.password, password);
      if (!isPasswordValid) {
        return res
          .status(UNAUTHORIZED)
          .json({ status: UNAUTHORIZED, error: Msg_Wrong_Password });
      }
      return next();
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ status: INTERNAL_SERVER_ERROR, error: Msg_Server_Error });
    }
  }

  static async verifyifEmailExists(req, res, next) {
    try {
      const { email } = req.body;
      const findUserEmail = await users.findOne({ where: { email } });
      if (!findUserEmail) {
        return res
          .status(NOT_FOUND)
          .json({ status: NOT_FOUND, error: Msg_Email_Not_Found });
      } else {
        return next();
      }
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ status: INTERNAL_SERVER_ERROR, error: Msg_Server_Error });
    }
  }
}
