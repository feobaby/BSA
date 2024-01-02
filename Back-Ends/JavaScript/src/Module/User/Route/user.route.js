import express from "express";
import UsersController from "../Controller/user.controller.js";
import UsersValidationController from "../Validation/user.validation.js";
import Authenticate from "../../Middlewares/authenticate.js";

const router = express.Router();

const { createUser, signInUser, fetchProfile } = UsersController;
const { validateUserEmail, verifyPassword, verifyifEmailExists } =
  UsersValidationController;
const { verifyToken } = Authenticate;

router.post("/signup", validateUserEmail, createUser);
router.post("/signin", verifyifEmailExists, verifyPassword, signInUser);
router.get("/profile", verifyToken, fetchProfile);

export default router;
