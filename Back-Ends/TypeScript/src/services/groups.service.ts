import { GroupServiceModel } from '../utils/types/services/service.type';
import { Groups } from '../database/Models/groups.model';
import pkg from 'sequelize';
import currency from 'currency.js';
const { Op } = pkg;

export default class GroupService {
  public static async createGroupService(data: GroupServiceModel) {
    const {
      userId,
      name,
      description,
      category,
      goalBalance,
      emails,
      status = 'In Progress',
    } = data;
    try {
      return await Groups.create({
        userId,
        name,
        description,
        category,
        goalBalance,
        emails,
        status,
      });
    } catch (error) {
      return error;
    }
  }
  public static async fetchAllUserGroupsService(userId: string) {
    try {
      return await Groups.findAndCountAll({
        where: { userId },
        order: [['createdAt', 'DESC']],
      });
    } catch (error) {
      return error;
    }
  }

  public static async fetchAUserGroupService(id: string) {
    try {
      return await Groups.findByPk(id);
    } catch (error) {
      return error;
    }
  }
  public static async fetchPartOfGroupService(email: string) {
    try {
      return await Groups.findAndCountAll({
        where: {
          emails: { [Op.contains]: [email] },
        },
        order: [['createdAt', 'DESC']],
      });
    } catch (error) {
      return error;
    }
  }

  public static async updateUserGroupService(
    data: GroupServiceModel,
    id?: string,
  ) {
    const { name, description, category, emails, goalBalance } = data;
    try {
      return await Groups.update(
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
    } catch (error) {
      return error;
    }
  }
  public static async updateGroupTransactionService(
    groupBalance: string,
    id: string,
    amount: string,
  ) {
    try {
      let a = currency(groupBalance);
      let b = currency(amount);
      const addToGroupBalance = a.add(b);
      return await Groups.update(
        { groupBalance: addToGroupBalance.value },
        { where: { id } },
      );
    } catch (error) {
      return error;
    }
  }
}
