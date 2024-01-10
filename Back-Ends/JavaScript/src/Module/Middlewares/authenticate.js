import { verifyToken } from "../Utils/index.js";
import { StatusCodes } from "http-status-codes";
import generalMessages from "../Utils/general-messages.js";

const { INTERNAL_SERVER_ERROR, UNAUTHORIZED } = StatusCodes;
const { Msg_Access_Denied, Msg_Server_Error } = generalMessages;

/**
 * @class Authenticate
 * @description authenticate tokens and roles
 * @exports Authenticate
 */
export default class Authenticate {
  static async verifyToken(req, res, next) {
    try {
      const {
        headers: { authorization },
      } = req;
      const token = authorization.split(" ")[1];
      if (!token || token === "") {
        return res
          .status(UNAUTHORIZED)
          .json({ status: UNAUTHORIZED, error: Msg_Access_Denied });
      }
      const decoded = await verifyToken(token);
      if (!(decoded && decoded.userId)) {
        return res.status(UNAUTHORIZED).json({
          status: UNAUTHORIZED,
          error: Msg_Access_Denied,
        });
      }
      req.user = decoded;
      return next();
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        error: Msg_Server_Error,
      });
    }
  }
}
