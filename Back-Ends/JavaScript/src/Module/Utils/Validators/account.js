import { check } from "express-validator";

export const userAccount = [
  check("balance")
    .not()
    .isEmpty()
    .withMessage("Please supply a proper value for the balance"),
  check("balance")
    .not()
    .isEmpty()
    .withMessage("Please supply a proper value for the amount"),
];
