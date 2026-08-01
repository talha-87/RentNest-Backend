import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";

import * as paymentController from "./payment.controller";
import {
  createPaymentSchema,
  confirmPaymentSchema,
} from "./payment.validation";

const router = Router();

router.post(
  "/create",
  auth("TENANT"),
  validateRequest(createPaymentSchema),
  paymentController.createPayment
);

router.post(
  "/confirm",
  auth("TENANT"),
  validateRequest(confirmPaymentSchema),
  paymentController.confirmPayment
);

router.get(
  "/",
  auth("TENANT"),
  paymentController.getMyPayments
);

router.get(
  "/:id",
  auth("TENANT"),
  paymentController.getSinglePayment
);

export default router;