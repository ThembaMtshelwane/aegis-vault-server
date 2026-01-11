import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/users/user.routes.js";
import { authenticate } from "../middleware/auth.middleware.js";
import productRoutes from "../modules/products/product.route.js";
import cartRoutes from "../modules/cart/cart.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", authenticate, userRoutes);
router.use("/products", productRoutes);
router.use("/cart", authenticate, cartRoutes);

export default router;
