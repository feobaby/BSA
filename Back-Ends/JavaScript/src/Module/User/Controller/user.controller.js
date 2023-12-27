import { StatusCodes } from "http-status-codes";
import Jwt from "../../Utils/jwt.js";
import Helper from "../../Utils/bcrypt.js";
import userMessages from "../Messages/user.messages.js";
import db from "../../../../database/Sequelize/index.js";
import generalMessages from "../../Utils/general-messages.js";

const { users, groups, accounts } = db;
const { generateToken } = Jwt;
const { CREATED, INTERNAL_SERVER_ERROR, OK } = StatusCodes;
const { Msg_Successful_Account_Creation, Msg_Fetch_Profile } = userMessages;
const { Msg_Server_Error } = generalMessages;

/**
 * @class UserController
 * @description Controllers for Users
 * @exports UsersController
 */
export default class UsersController {
  static async createUser(req, res) {
    try {
      req.body.password = await Helper.hashPassword(req.body.password);
      const createUser = await users.create(req.body);
      const createUserAccount = await accounts.create({
        userId: createUser.id,
      });
      const token = await generateToken({ userId: createUser.id });
      return res.status(CREATED).json({
        status: CREATED,
        message: Msg_Successful_Account_Creation,
        createUser,
        createUserAccount,
        token,
      });
    } catch (error) {
      console.log(error);
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        error: Msg_Server_Error,
      });
    }
  }

  static async signInUser(req, res) {
    const { email } = req.body;
    try {
      const user = await users.findOne({ where: { email } });
      const { id: userId } = user;
      const token = await generateToken({ userId });
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

  static async fetchProfile(req, res) {
    try {
      const { userId } = req.user;
      const result = await users.findOne({
        where: { id: userId },
        include: [
          {
            model: groups,
            as: "GroupsCreatedByUser",
          },

          { model: accounts, as: "UserAccount" },
        ],
      });
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
