import { Router } from "express";
import {
  registerUser,
  verifyUserEmail,
  resendVerificationEmail,
  loginUser,
} from "../controllers/auth.controller.js";
import {
  userRegisterationValidator,
  userLoginValidator,
} from "../validators/validator.js";
import { validate } from "../middlewares/validator.middleware.js";

const authRoutes = Router();

authRoutes
  .route("/register")
  .post(
    userRegisterationValidator() /**factory pattern */,
    validate,
    registerUser
  );
authRoutes.route("/verify/:token").get(verifyUserEmail);
authRoutes.route("/resend").post(resendVerificationEmail);
authRoutes.route("/login").post(userLoginValidator(), validate, loginUser);

export default authRoutes;
