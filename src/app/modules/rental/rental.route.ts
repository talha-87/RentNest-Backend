import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";

import * as rentalController from "./rental.controller";
import { createRentalSchema } from "./rental.validation";
import { updateRentalStatusSchema } from "./rental.validation";


const router = Router();

router.post(
  "/",
  auth("TENANT"),
  validateRequest(createRentalSchema),
  rentalController.createRental
);

router.get(
  "/",
  auth("TENANT"),
  rentalController.getMyRentals
);

router.get(
  "/:id",
  auth("TENANT"),
  rentalController.getSingleRental
);

router.get(
  "/landlord/requests",
  auth("LANDLORD"),
  rentalController.getLandlordRentals
);

router.patch(
  "/landlord/requests/:id",
  auth("LANDLORD"),
  validateRequest(updateRentalStatusSchema),
  rentalController.updateRentalStatus
);

export default router;