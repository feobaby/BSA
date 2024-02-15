import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import generalMessages from '../utils/messages/general.message';
import Jwt from '../utils/jwt';

const { UNAUTHORIZED, BAD_REQUEST } = StatusCodes;
const { Msg_Access_Denied, Msg_Unauthorized } = generalMessages;

interface ExtendedJwtPayload extends JwtPayload {
  userId: string;
}

export default class Auth {
  static async verifyUser(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        headers: { authorization },
      } = req;
      const token = authorization?.split(' ')[1];
      if (!token) {
        return res
          .status(BAD_REQUEST)
          .json({ status: BAD_REQUEST, error: Msg_Unauthorized });
      }
      const decoded = (await Jwt.verifyToken(token)) as ExtendedJwtPayload;
      if (!decoded || !decoded.userId) {
        return res
          .status(UNAUTHORIZED)
          .json({ status: UNAUTHORIZED, error: Msg_Access_Denied });
      }

      req.user = {
        userId: decoded.userId,
      };
      next();
    } catch (error) {
      return res
        .status(UNAUTHORIZED)
        .json({ status: UNAUTHORIZED, error: Msg_Access_Denied });
    }
  }
}
