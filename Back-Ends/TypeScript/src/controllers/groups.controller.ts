import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import generalMessages from '../utils/messages/general.message';
import groupMessages from '../utils/messages/group.message';
import { v4 as uuidv4 } from 'uuid';
import { Groups } from '../database/Models/groups.model';
import pkg from 'sequelize';
import { Group } from '../utils/types/controllers/controller.type';
import GroupService from '../services/groups.service';
import TransactionService from '../services/transactions.service';
import AccountService from '../services/accounts.service';

const {
  createGroupService,
  fetchAllUserGroupsService,
  fetchAUserGroupService,
  fetchPartOfGroupService,
  updateUserGroupService,
  updateGroupTransactionService,
} = GroupService;
const { createTransactionService } = TransactionService;
const { findAccountIdService, updateAccountTransactionService } =
  AccountService;

let myuuid = uuidv4();
const { Op } = pkg;

const {} = generalMessages;
const { CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, OK, UNAUTHORIZED } =
  StatusCodes;
const { Msg_Access_Denied, Msg_Server_Error } = generalMessages;

const { Msg_Success, Msg_No_Groups, Msg_Group_Not_Found, Msg_Update_Success } =
  groupMessages;

export default class GroupController {
  static async createGroup(req: Request, res: Response) {
    try {
      const { name, category, emails, description, goalBalance } = req.body;
      const userId: string = req.user?.userId || '';
      const result = await createGroupService({
        userId,
        name,
        description,
        category,
        goalBalance,
        emails,
        status: 'In Progress',
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

  static async fetchAllGroupsByUser(req: Request, res: Response) {
    try {
      const userId: string = req.user?.userId || '';
      const data: Group = (await fetchAllUserGroupsService(userId)) as Group;
      if (Array.isArray(data) && data.length === 0) {
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

  static async fetchAGroupByUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await fetchAUserGroupService(id);
      return res.status(OK).json({ status: OK, data: result });
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ status: INTERNAL_SERVER_ERROR, error: Msg_Server_Error });
    }
  }

  static async fetchPartOfGroups(req: Request, res: Response) {
    const { email } = req.query;
    try {
      if (typeof email === 'string') {
        const result = await fetchPartOfGroupService(email);
        return res.status(OK).json({ status: OK, data: result });
      }
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ status: INTERNAL_SERVER_ERROR, error: Msg_Server_Error });
    }
  }

  static async updateAGroup(req: Request, res: Response) {
    const { id } = req.params;
    const userId: string = req.user?.userId || '';
    const { name, description, category, emails, goalBalance } = req.body;
    try {
      const result = await Groups.findByPk(id);
      if (!result) {
        return res
          .status(NOT_FOUND)
          .json({ status: NOT_FOUND, error: Msg_Group_Not_Found });
      }
      if (result.userId !== userId) {
        return res
          .status(UNAUTHORIZED)
          .json({ status: UNAUTHORIZED, error: Msg_Access_Denied });
      }
      updateUserGroupService(req.body);
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

  static async depositMoneyToGroup(req: Request, res: Response) {
    try {
      const { amount } = req.body;
      const { id } = req.params;
      const userId: string = req.user?.userId || '';
      let referenceNo = myuuid;
      const findGroupBalance: any = await Groups.findOne({
        where: { id },
      });

      // create transaction details
      const account: any = await findAccountIdService(userId);
      const createTransaction = await createTransactionService({
        userId,
        accountId: account.id,
        amount,
        referenceNo,
        category: 'group-deposit',
      });

      // add money to the the group's balance
      const updateGroupBalance = await updateGroupTransactionService(
        findGroupBalance?.groupBalance,
        id,
        amount,
      );
      // update user account baalnce
      const updateUserAccountBalance = await updateAccountTransactionService(
        userId,
        amount,
      );
      return res.status(OK).json({
        status: OK,
        message: Msg_Success,
        createTransaction,
        updateGroupBalance,
        updateUserAccountBalance,
      });
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ status: INTERNAL_SERVER_ERROR, error: Msg_Server_Error });
    }
  }
}
