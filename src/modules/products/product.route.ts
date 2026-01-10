import Router from "express";
import {
  getProduct,
  getProducts,
  massCreateProducts,
} from "./product.controller.js";

const router = Router();

router.get("/", getProducts);
router.post("/mass-create", massCreateProducts);
router.get("/:slug", getProduct);

export default router;
