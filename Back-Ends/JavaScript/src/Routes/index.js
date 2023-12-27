import { Router } from "express";

import userRouter from "../Module/User/Route/user.route.js";
import groupRouter from "../Module/Group/Route/group.route.js";
import accountRouter from "../Module/Account/Route/account.route.js";
import transactionRouter from "../Module/Transaction/Route/transaction.route.js";

const router = new Router();

// Welcome Page
router.get("/hi", (req, res) => {
  res.status(200).json({ message: "Welcome to BSA!" });
});

router.use("/auth", userRouter);
router.use("/group", groupRouter);
router.use("/account", accountRouter);
router.use("/transaction", transactionRouter);

export default router;
