import express from "express";
import TransactionsController from "../Controller/transaction.controller.js";
import Authenticate from "../../Middlewares/authenticate.js";

const router = express.Router();

const { fetchTransactions } = TransactionsController;

const { verifyToken } = Authenticate;

router.get("/", verifyToken, fetchTransactions);

export default router;
