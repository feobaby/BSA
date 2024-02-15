import express from 'express';
import Authenticate from '../middlewares/authenticate';
import TransactionsController from '../controllers/transactions.controller';

const router = express.Router();

const { verifyUser } = Authenticate;
const { fetchTransactions } = TransactionsController;

router.get('/', verifyUser, fetchTransactions);

export default router;
