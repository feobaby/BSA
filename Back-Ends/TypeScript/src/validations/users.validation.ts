import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import userMessages from '../utils/messages/users.message';
import Helper from '../utils/bcrypt';
import generalMessages from '../utils/messages/general.message';
import { Users } from '../database/Models/users.model';
const { comparePassword } = Helper;

const { UNAUTHORIZED, INTERNAL_SERVER_ERROR, CONFLICT, NOT_FOUND } =
  StatusCodes;
const { Msg_Conflict_Email, Msg_Email_Not_Found, Msg_Wrong_Password } =
  userMessages;
const { Msg_Server_Error } = generalMessages;

export default class UsersValidationController {
  static async validateUserEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { email } = req.body;
      const findUserEmail = await Users.findOne({ where: { email } });
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

  static async verifyEmailAndPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { email, password } = req.body;
    try {
      const user = await Users.findOne({ where: { email } });
      if (!user) {
        return res
          .status(NOT_FOUND)
          .json({ status: NOT_FOUND, error: Msg_Email_Not_Found });
      }
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
}
