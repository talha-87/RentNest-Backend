import { Router } from "express";
import { register, login, getMyProfile } from "./auth.controller";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import {
  registerSchema,
  loginValidationSchema,
} from "./auth.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(registerSchema),
  register
);

router.post(
  "/login",
  validateRequest(loginValidationSchema),
  login
);

router.get("/me", auth(), getMyProfile);

export default router;


