import { check } from "express-validator";

export const userRegister = [
  check("firstName")
    .not()
    .isEmpty()
    .withMessage("Please supply a proper value for the first name"),
  check("lastName")
    .not()
    .isEmpty()
    .withMessage("Please supply a proper value for the last name"),
  check("email")
    .not()
    .isEmpty()
    .withMessage("Please supply a proper value for the email"),
  check("password")
    .isLength({ min: 6 })
    .not()
    .isEmpty()
    .withMessage("Please supply a proper value for the password"),
];

export const userLogin = [
  check("email", "Please provide a valid email").isEmail().not().isEmpty(),
  check("password", "Password should be at least 6 characters").not().isEmpty(),
];
