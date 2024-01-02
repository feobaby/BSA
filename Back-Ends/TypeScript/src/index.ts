import express, { Application } from "express";
import dotenv from "dotenv";
import UserRoute from "./Module/users/routes/user.routes";

dotenv.config();

class App {
  public app: Application = express();
  public userRoute: UserRoute = new UserRoute();

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.config();
    this.userRoute.routes(this.app);
    this.app.get("/hi", (req, res) =>
      res.status(200).send({ message: "Welcome to BSA!" }),
    );
  }

  private config = (): void => {
    const port = process.env.PORT;
    this.app.use(express.json());
    this.app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  };
}

export default new App().app;
