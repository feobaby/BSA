import express from "express";
import GroupsController from "../Controller/group.controller.js";
import Authenticate from "../../Middlewares/authenticate.js";
import GroupsValidationController from "../Validation/group.validation.js";

const router = express.Router();

const {
  createGroup,
  fetchAllGroupsByUser,
  fetchAGroupByUser,
  fetchPartOfGroups,
  updateAGroup,
  depositMoneyToGroup,
} = GroupsController;
const { verifyToken } = Authenticate;
const {
  validateUserGroupGoalBalance,
  validateIfAGroupByUserExists,
  validateFundsForGroupGoalBalance,
  validateUserAccountBalanceForGroupAddition,
} = GroupsValidationController;

router.post("/create", verifyToken, validateUserGroupGoalBalance, createGroup);
router.get("/user", verifyToken, fetchAllGroupsByUser);
router.get(
  "/:id",
  verifyToken,
  validateIfAGroupByUserExists,
  fetchAGroupByUser,
);
router.get("/", verifyToken, fetchPartOfGroups);
router.patch("/update/:id", verifyToken, updateAGroup);
router.put(
  "/deposit-group/:id",
  verifyToken,
  validateIfAGroupByUserExists,
  validateUserAccountBalanceForGroupAddition,
  validateFundsForGroupGoalBalance,
  depositMoneyToGroup,
);
export default router;
