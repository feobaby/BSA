import { StatusCodes } from "http-status-codes";
import db from "../../../../database/Sequelize/index.js";
import generalMessages from "../../Utils/general-messages.js";
import pkg from "sequelize";
import { v4 as uuidv4 } from "uuid";

let myuuid = uuidv4();

const { Op } = pkg;

const { Msg_Server_Error } = generalMessages;
const { groups, accounts, transactions } = db;
const {
  CREATED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
  UNAUTHORIZED,
  NO_CONTENT,
  BAD_REQUEST,
} = StatusCodes;
const {
  Msg_Success,
  Msg_No_Groups,
  Msg_Group_Not_Found,
  Msg_Access_Denied,
  Msg_Update_Success,
} = generalMessages;

/**
 * @class GroupsController
 * @description Controllers for Groups
 * @exports GroupsController
 */
export default class GroupsController {
  static async createGroup(req, res) {
    try {
      const { name, category, emails, description, goalBalance } = req.body;
      const { userId } = req.user;
      const result = await groups.create({
        userId,
        name,
        description,
        category,
        goalBalance,
        emails,
        status: "In Progress",
      });
      return res.status(CREATED).json({
        status: CREATED,
        message: Msg_Success,
        data: result,
      });
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ status: INTERNAL_SERVER_ERROR, error: Msg_Server_Error });
    }
  }

  static async fetchAllGroupsByUser(req, res) {
    try {
      const data = await groups.findAndCountAll({
        where: { userId: req.user.userId },
        order: [["createdAt", "DESC"]],
      });
      if (data.length === 0) {
        return res.status(NOT_FOUND).json({
          status: NOT_FOUND,
          error: Msg_No_Groups,
        });
      }
      return res.status(OK).json({ status: OK, data });
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ status: INTERNAL_SERVER_ERROR, error: Msg_Server_Error });
    }
  }

  static async fetchAGroupByUser(req, res) {
    const { id } = req.params;
    try {
      const result = await groups.findByPk(id);
      return res.status(OK).json({ status: OK, data: result });
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ status: INTERNAL_SERVER_ERROR, error: Msg_Server_Error });
    }
  }

  static async fetchPartOfGroups(req, res) {
    const { email } = req.query;
    try {
      const result = await groups.findAndCountAll({
        where: {
          emails: { [Op.contains]: [email] },
        },
        order: [["createdAt", "DESC"]],
      });
      return res.status(OK).json({ status: OK, data: result });
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ status: INTERNAL_SERVER_ERROR, error: Msg_Server_Error });
    }
  }

  static async updateAGroup(req, res) {
    const { id } = req.params;
    const { userId } = req.user;
    const { name, description, category, emails, goalBalance } = req.body;
    try {
      const result = await groups.findByPk(id);
      if (!result) {
        return res
          .status(NOT_FOUND)
          .json({ status: NOT, error: Msg_Group_Not_Found });
      }
      if (result.userId !== userId) {
        return res
          .status(UNAUTHORIZED)
          .json({ status: UNAUTHORIZED, error: Msg_Access_Denied });
      }
      await groups.update(
        {
          name,
          description,
          category,
          emails,
          goalBalance,
          updatedAt: Date.now(),
        },
        { where: { id } },
      );
      return res.status(OK).json({
        status: OK,
        message: Msg_Update_Success,
        data: {
          name,
          description,
          category,
          emails,
          goalBalance,
        },
      });
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ status: INTERNAL_SERVER_ERROR, error: Msg_Server_Error });
    }
  }

  static async depositMoneyToGroup(req, res) {
    try {
      const { groupBalance, amount } = req.body;
      const { id } = req.params;
      const { userId } = req.user;

      //create transaction logs
      let referenceNo = myuuid;
      const account = await accounts.findOne({ where: { userId } });
      const createTransaction = await transactions.create({
        userId,
        accountId: account.id,
        amount,
        referenceNo,
        category: "group-deposit",
      });

      const addToGroupBalance = parseFloat(groupBalance + amount).toFixed(2);
      const updateGroupBalance = await groups.update(
        { groupBalance: addToGroupBalance },
        { where: { id } },
      );
      const accountBalance = await accounts.findOne({ where: { userId } });
      const newAccountBalance = accountBalance.balance - amount;
      const updateUserAccountBalance = await accounts.update(
        { balance: newAccountBalance },
        { where: { id: userId } },
      );
      return res.status(OK).json({
        status: OK,
        message: Msg_Success,
        updateGroupBalance,
        createTransaction,
        updateUserAccountBalance,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ status: INTERNAL_SERVER_ERROR, error: Msg_Server_Error });
    }
  }
}
