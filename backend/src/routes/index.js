import express from 'express';
import UsersController from '../controllers/user';
import GroupsController from '../controllers/group';
import middlewares from '../middlewares';

const { Authenticate } = middlewares;
const { verifyToken } = Authenticate;
const {
  createUser, signInUser, getAnAccount, updateAnAccount, addMoney,
} = UsersController;
const {
  createGroup, getAllGroups, getAGroup, deleteAGroup, updateAGroup,
  depositMoneyToGroup, getAGroupYouArePartOf,
} = GroupsController;

const router = express.Router();

// Welcome Page
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Bill Sharing App.' });
});

// Authentication
router.post('/api/v1/auth/user', createUser);
router.post('/api/v1/auth/signin', signInUser);

// Accounts
router.get('/api/v1/account', verifyToken, getAnAccount);
router.patch('/api/v1/account', verifyToken, updateAnAccount);
router.patch('/api/v1/group/add-money/:id', verifyToken, depositMoneyToGroup);

// Money
router.patch('/api/v1/add-money', verifyToken, addMoney);

// Groups
router.post('/api/v1/create-group', verifyToken, createGroup);
router.get('/api/v1/groups', verifyToken, getAllGroups);
router.get('/api/v1/group/:id', verifyToken, getAGroup);
router.delete('/api/v1/group/:id', verifyToken, deleteAGroup);
router.patch('/api/v1/group/:id', verifyToken, updateAGroup);
router.get('/api/v1/group', verifyToken, getAGroupYouArePartOf);

export default router;
