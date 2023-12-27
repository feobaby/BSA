import express from "express";
import AccountsController from "../Controller/account.controller.js";
import Authenticate from "../../Middlewares/authenticate.js";
import validate from "../../Middlewares/validator.js";

const router = express.Router();

const { depositMoneyToWalletBalance } = AccountsController;
const { verifyToken } = Authenticate;

router.patch(
  "/deposit-wallet",
  verifyToken,
  validate("userAccount"),
  depositMoneyToWalletBalance,
);

export default router;
