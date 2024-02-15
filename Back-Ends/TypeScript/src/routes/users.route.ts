import express from 'express';
import UserController from '../controllers/users.controller';
import Authenticate from '../middlewares/authenticate';
import UsersValidationController from '../validations/users.validation';

const { verifyUser } = Authenticate;
const router = express.Router();
const { createUser, signInUser, fetchProfile } = UserController;
const { validateUserEmail, verifyEmailAndPassword } = UsersValidationController;

router.post('/signup', validateUserEmail, createUser);
router.post('/signin', verifyEmailAndPassword, signInUser);
router.get('/profile', verifyUser, fetchProfile);

export default router;
