import { Application } from "express";
import UserController from "../controllers/users.controller";

class UserRoute {
  public userController: UserController = new UserController();

  public routes = (app: Application): void => {
    app.post("/api/v1/auth/signup", this.userController.createUser);
  };
}
export default UserRoute;
