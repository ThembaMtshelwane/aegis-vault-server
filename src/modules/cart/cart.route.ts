import { Router } from "express";
import { CartController } from "./cart.controller.js";

const router = Router();

router.get("/", CartController.getCart);
router.post("/add", CartController.addItem);
router.post("/remove", CartController.removeItem);
router.post("/increment", CartController.incrementItem);
router.post("/decrement", CartController.decrementItem);
router.post("/clear", CartController.clearCart);
export default router;
