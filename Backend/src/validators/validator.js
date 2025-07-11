import { body } from "express-validator";

const userRegisterationValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long")
      .isLength({ max: 13 })
      .withMessage("Username must be at most 20 characters long"),
  ];
};

const userLoginValidator = () => {
  return [
    body("email")
      .optional() // Make email optional
      .isEmail()
      .withMessage("Email is invalid"),

    body("username")
      .optional() // Make username optional
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters"),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ];
};

export { userRegisterationValidator, userLoginValidator };
