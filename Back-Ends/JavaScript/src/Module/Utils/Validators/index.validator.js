import { userAccount } from "./account.js";
import { userRegister, userLogin } from "./user.js";

const getValidator = (validationName) => {
  const rules = {
    userRegister,
    userLogin,
    userAccount,
  };

  return rules[validationName];
};

export default getValidator;
