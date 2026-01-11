import Router from "express";
import {
  getProduct,
  getProducts,
  massCreateProducts,
} from "./product.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", getProducts);
router.post("/mass-create", authenticate, massCreateProducts);
router.get("/:slug", getProduct);

export default router;
