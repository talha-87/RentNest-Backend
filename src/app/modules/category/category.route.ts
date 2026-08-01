import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";

import * as categoryController from "./category.controller";
import { createCategorySchema } from "./category.validation";

const router = Router();

router.post(
  "/",
  auth("ADMIN"),
  validateRequest(createCategorySchema),
  categoryController.createCategory
);

router.get(
  "/",
  categoryController.getAllCategories
);

export default router;