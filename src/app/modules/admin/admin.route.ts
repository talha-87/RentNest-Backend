import express from "express";
import auth from "../../middleware/auth";
import { adminController } from "./admin.controller";

const router = express.Router();

router.get(
  "/users",
  auth("ADMIN"),
  adminController.getAllUsers
);

router.patch(
  "/users/:id",
  auth("ADMIN"),
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