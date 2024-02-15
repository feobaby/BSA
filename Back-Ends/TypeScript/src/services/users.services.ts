import { UserServiceModel } from '../utils/types/services/service.type';
import { Accounts } from '../database/Models/accounts.model';
import { Groups } from '../database/Models/groups.model';
import { Users } from '../database/Models/users.model';

export default class UserService {
  public static async createUserService(data: UserServiceModel) {
    try {
      return await Users.create(data);
    } catch (error) {
      return error;
    }
  }
  public static async signInUserService(email: string) {
    try {
      return await Users.findOne({ where: { email } });
    } catch (error) {
      return error;
    }
  }
  public static async fetchUserProfileService(id: string) {
    try {
      return await Users.findOne({
        where: { id },
        include: [
          {
            model: Groups,
            as: 'GroupsCreatedByUser',
          },
          { model: Accounts, as: 'UserAccount' },
        ],
      });
    } catch (error) {
      return error;
    }
  }
}
