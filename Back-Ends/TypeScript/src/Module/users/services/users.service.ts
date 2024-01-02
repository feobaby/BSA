import { User } from "../models/users.model";
import { UserAddModel } from "../interfaces/users.interface";

class UserService {
  public static async createUser(data: UserAddModel) {
    try {
      return await User.create(data);
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
export default UserService;
