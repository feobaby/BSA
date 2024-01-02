import express from "express";
import AccountsController from "../Controller/account.controller.js";
import Authenticate from "../../Middlewares/authenticate.js";

const router = express.Router();

const { depositMoneyToWalletBalance } = AccountsController;
const { verifyToken } = Authenticate;

router.put("/deposit-wallet", verifyToken, depositMoneyToWalletBalance);

export default router;
