import Router from "express";
import { getProducts, massCreateProducts } from "./product.controller.js";

const router = Router();

router.get("/", getProducts);
router.post("/mass-create", massCreateProducts);

export default router;
