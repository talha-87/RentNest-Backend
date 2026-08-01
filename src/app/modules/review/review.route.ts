import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";

import * as reviewController from "./review.controller";
import { createReviewSchema } from "./review.validation";

const router = Router();

router.post(
  "/",
  auth("TENANT"),
  validateRequest(createReviewSchema),
  reviewController.createReview
);

export default router;