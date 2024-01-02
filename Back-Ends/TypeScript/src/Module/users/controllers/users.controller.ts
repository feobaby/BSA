import { Request, Response } from "express";
import UserService from "../services/users.service";
import { StatusCodes } from "http-status-codes";
import AccountService from "../../account/services/account.service";
import Helper from "../../../../Utils/bcrypt";
import Jwt from "../../../../Utils/jwt";

export default class UserController {
  public createUser = async (req: Request, res: Response) => {
    try {
      req.body.password = await Helper.hashPassword(req.body.password);
      const { email, password, firstName, lastName, role } = req.body;
      const createUser: any = await UserService.createUser({
        email,
        password,
        firstName,
        lastName,
        role,
      });

      let userId = createUser.id;
      let balance = "0.0";

      const createUserAccount = await AccountService.createAccount({
        userId,
        balance,
      });
      console.log(createUserAccount);
      const token = await Jwt.generateToken({ userId: createUser.id });
      return res.status(StatusCodes.CREATED).json({
        message: "Successful Creation",
        createUser,
        createUserAccount,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  };
}
