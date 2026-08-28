import express from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { adminController } from "./admin.controller";
import { updateUserStatusSchema } from "./admin.validation";

const router = express.Router();

router.get(
  "/users",
  auth("ADMIN"),
  adminController.getAllUsers
);

router.patch(
  "/users/:id",
  auth("ADMIN"),
  validateRequest(updateUserStatusSchema),
  adminController.updateUserStatus
);

router.get(
  "/properties",
  auth("ADMIN"),
  adminController.getAllProperties
);

router.get(
  "/rentals",
  auth("ADMIN"),
  adminController.getAllRentals
);

export default router;