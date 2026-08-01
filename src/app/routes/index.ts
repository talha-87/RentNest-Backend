import { Router } from "express";
import authRoutes from "../modules/auth/auth.route";
import categoryRoutes from "../modules/category/category.route";
import propertyRoutes from "../modules/property/property.route";
import rentalRoutes from "../modules/rental/rental.route";
import paymentRoutes from "../modules/payment/payment.route";
import reviewRoutes from "../modules/review/review.route";
import adminRoutes from "../modules/admin/admin.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/properties", propertyRoutes);
router.use("/rentals", rentalRoutes);
router.use("/payments", paymentRoutes);
router.use("/reviews", reviewRoutes);
router.use("/admin", adminRoutes);

export default router;