import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Jwt from '../utils/jwt';
import Helper from '../utils/bcrypt';
import userMessages from '../utils/messages/users.message';
import generalMessages from '../utils/messages/general.message';
import UserService from '../services/users.services';
import AccountService from '../services/accounts.service';
import { Account, User } from '../utils/types/controllers/controller.type';

const { createUserService, signInUserService, fetchUserProfileService } =
  UserService;
const { createAccountService } = AccountService;

const { generateToken } = Jwt;
const { CREATED, INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } = StatusCodes;
const { Msg_Successful_Account_Creation, Msg_Fetch_Profile } = userMessages;
const { Msg_Server_Error } = generalMessages;

export default class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      req.body.password = await Helper.hashPassword(req.body.password);
      const createUser: User = (await createUserService(req.body)) as User;
      const createUserAccount: Account = (await createAccountService({
        userId: createUser.id,
      })) as Account;
      let userId = createUser.id;
      const token = await generateToken(userId);
      return res.status(CREATED).json({
        status: CREATED,
        message: Msg_Successful_Account_Creation,
        createUser,
        createUserAccount,
        token,
      });
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        error: Msg_Server_Error,
      });
    }
  }

  static async signInUser(req: Request, res: Response) {
    const { email } = req.body;
    try {
      const user: User = (await signInUserService(email)) as User;
      const userId = user.id;
      const token = await generateToken(userId);
      return res.status(OK).json({
        status: OK,
        token,
      });
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ status: INTERNAL_SERVER_ERROR, error: Msg_Server_Error });
    }
  }

  static async fetchProfile(req: Request, res: Response) {
    try {
      const userId: string = req.user?.userId || '';
      const result = await fetchUserProfileService(userId);
      return res
        .status(OK)
        .json({ status: OK, message: Msg_Fetch_Profile, data: result });
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ status: INTERNAL_SERVER_ERROR, error: Msg_Server_Error });
    }
  }
}
