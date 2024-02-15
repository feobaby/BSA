import { Router, Request, Response } from 'express';
import userRouter from '../routes/users.route';
import groupRouter from '../routes/groups.route';
import accountRouter from '../routes/accounts.route';
import transactionRouter from '../routes/transactions.route';

const router: Router = Router();

router.get('/hi', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to BSA!' });
});

router.use('/auth', userRouter);
router.use('/group', groupRouter);
router.use('/account', accountRouter);
router.use('/transaction', transactionRouter);

export default router;
