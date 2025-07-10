import express from "express";
import {
  register,
  login,
  logout,
  check,
} from "../controllers/auth.controllers.js";

const authRoutes = express.Router();

authRoutes.post("/registerr", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.post("/check", check);

export default authRoutes;
