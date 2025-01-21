import { Router } from "express";
import {
  signup,
  login,
  profile,
  logout,
} from "../controllers/user.controller.js";
const route = Router();
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest.js";
import { authUser } from "../middlewares/auth.middleware.js";

route.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("Fullname must be at least 3 characters long"),
  ],
  signup
);

route.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  validateRequest,
  login
);

route.get("/profile", authUser, profile);
route.get("/logout", authUser, logout);

export default route;
