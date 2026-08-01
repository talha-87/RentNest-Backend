import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";

import * as propertyController from "./property.controller";
import {
  createPropertySchema,
  updatePropertySchema,
} from "./property.validation";


const router = Router();

router.post(
  "/",
  auth("LANDLORD"),
  validateRequest(createPropertySchema),
  propertyController.createProperty
);

router.get(
  "/",
  propertyController.getAllProperties
);

router.get(
  "/:id",
  propertyController.getSingleProperty
);

router.patch(
  "/:id",
  auth("LANDLORD"),
  validateRequest(updatePropertySchema),
  propertyController.updateProperty
);

router.delete(
  "/:id",
  auth("LANDLORD"),
  propertyController.deleteProperty
);

export default router;