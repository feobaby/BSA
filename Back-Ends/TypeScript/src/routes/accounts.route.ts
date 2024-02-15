import express from 'express';
import AccountsController from '../controllers/accounts.controller';
import Authenticate from '../middlewares/authenticate';

const router = express.Router();

const { verifyUser } = Authenticate;
const { depositMoneyToWalletBalance } = AccountsController;

router.put('/deposit-wallet', verifyUser, depositMoneyToWalletBalance);

export default router;
