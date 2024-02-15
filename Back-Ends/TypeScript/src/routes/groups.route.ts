import express from 'express';
import GroupController from '../controllers/groups.controller';
import Authenticate from '../middlewares/authenticate';
import GroupsValidationController from '../validations/group.validation';

const router = express.Router();
const { verifyUser } = Authenticate;
const {
  createGroup,
  fetchAllGroupsByUser,
  fetchAGroupByUser,
  fetchPartOfGroups,
  updateAGroup,
  depositMoneyToGroup,
} = GroupController;
const {
  validateUserGroupGoalBalance,
  validateIfAGroupByUserExists,
  // validateUserAccountBalanceForGroupAddition,
  validateTotalFundsForGroupGoalBalance,
} = GroupsValidationController;

router.post('/create', verifyUser, validateUserGroupGoalBalance, createGroup);
router.get('/user', verifyUser, fetchAllGroupsByUser);
router.get('/:id', verifyUser, validateIfAGroupByUserExists, fetchAGroupByUser);
router.get('/', verifyUser, fetchPartOfGroups);
router.patch('/update/:id', verifyUser, updateAGroup);

router.put(
  '/deposit-group/:id',
  verifyUser,
  validateIfAGroupByUserExists,
  // validateUserAccountBalanceForGroupAddition,
  validateTotalFundsForGroupGoalBalance,
  depositMoneyToGroup,
);

export default router;
