import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction, Express } from "express";
import Jwt from "../../../Utils/jwt.js";

const { INTERNAL_SERVER_ERROR, UNAUTHORIZED } = StatusCodes;

declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
    }
  }
}

export default class Authenticate {
  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers["authorization"];
      if (!token || token === "") {
        return res
          .status(UNAUTHORIZED)
          .json({ status: UNAUTHORIZED, error: "Access Denied." });
      }
      req.user = Jwt.verifyToken(token);
      // req.user = await UserService.findUser({ _id: req.user.id })
      return next();
    } catch (error) {
      console.log(error);
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        error: "Server Error.",
      });
    }
  }
}
