import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/users/user.routes.js";
import { authenticate } from "../middleware/auth.middleware.js";
import productRoutes from "../modules/products/product.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", authenticate, userRoutes);
router.use("/products", authenticate, productRoutes);

export default router;
