import { type Request, type Response } from "express";
import { Cart } from "./cart.model.js";
import { Product } from "../products/product.model.js"; // Assuming this exists
import type { ICartItem } from "./cart.type.js";

export const CartController = {
  /**
   * 1. Get User Cart
   */
  getCart: async (req: Request, res: Response) => {
    try {
      const userId = req.user.id;
      // Populate allows us to turn the product ID into the full IProduct object
      const cart = await Cart.findOne({ userId }).populate("items.product");

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  },

  /**
   * 2. Add or Update Item in Cart
   */
  addItem: async (req: Request, res: Response) => {
    try {
      const userId = req.user.id;
      const { productId, quantity } = req.body;

      // Validate product existence and price
      const product = await Product.findById(productId);
      if (!product || !product.price)
        return res.status(404).json({ message: "Product not found" });

      let cart = await Cart.findOne({ userId });

      // Create cart if it doesn't exist
      if (!cart) {
        cart = new Cart({ userId });
      }

      // Check if product is already in cart
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );
      const existingItem = cart.items[itemIndex];

      if (itemIndex > -1 && existingItem) {
        // Update existing item
        existingItem.quantity += quantity;
        existingItem.price = existingItem.quantity * product.price;
      } else {
        // Add new item
        cart.items.push({
          product: productId,
          quantity,
          price: product.price * quantity,
        } as ICartItem);
      }

      // Recalculate total price for the whole cart
      cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price, 0);

      await cart.save();
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: "Failed to add item" });
    }
  },

  /**
   * 3. Remove Item from Cart
   */
  removeItem: async (req: Request, res: Response) => {
    try {
      const userId = req.user.id;
      const productId = req.body.productId as string;

      const cart = await Cart.findOne({ userId });
      if (!cart) return res.status(404).json({ message: "Cart not found" });

      // Filter out the product
      cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId
      );

      console.log("Cart items after removal:", cart.items);

      // Recalculate total
      cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price, 0);

      await cart.save();
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: "Failed to remove item" });
    }
  },

  /**
   * Increment Item Quantity (+1)
   */
  incrementItem: async (req: Request, res: Response) => {
    try {
      const userId = req.user.id;
      const { productId } = req.body;

      const cart = await Cart.findOne({ userId });
      if (!cart) return res.status(404).json({ message: "Cart not found" });

      const item = cart.items.find((i) => i.product.toString() === productId);
      if (!item) return res.status(404).json({ message: "Item not in cart" });

      // Fetch official price to ensure accuracy
      const product = await Product.findById(productId);
      if (!product)
        return res.status(404).json({ message: "Product not found" });

      // Update quantity and line-item price
      item.quantity += 1;
      item.price = item.quantity * product.price;

      // Recalculate cart total
      cart.totalPrice = cart.items.reduce((acc, i) => acc + i.price, 0);

      await cart.save();
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: "Could not increment quantity" });
    }
  },

  /**
   * Decrement Item Quantity (-1)
   */
  decrementItem: async (req: Request, res: Response) => {
    try {
      const userId = req.user.id;
      const { productId } = req.body;

      const cart = await Cart.findOne({ userId });
      if (!cart) return res.status(404).json({ message: "Cart not found" });

      const itemIndex = cart.items.findIndex(
        (i) => i.product.toString() === productId
      );
      if (itemIndex === -1)
        return res.status(404).json({ message: "Item not in cart" });

      const item = cart.items[itemIndex];
      const product = await Product.findById(productId);
      if (!product)
        return res.status(404).json({ message: "Product not found" });

      if (item && item.quantity > 1) {
        // Reduce quantity
        item.quantity -= 1;
        item.price = item.quantity * product.price;
      } else {
        // If quantity would be 0, remove the item entirely
        cart.items.splice(itemIndex, 1);
      }

      // Recalculate cart total
      cart.totalPrice = cart.items.reduce((acc, i) => acc + i.price, 0);

      await cart.save();
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: "Could not decrement quantity" });
    }
  },
  /**
   * Clear all items from the cart
   */
  clearCart: async (req: Request, res: Response) => {
    try {
      const userId = req.user.id;

      // Find the cart for the user
      const cart = await Cart.findOne({ userId });

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      // Reset items and total price to default values
      cart.items = []; //
      cart.totalPrice = 0; //

      await cart.save();

      res.status(200).json({
        message: "Cart cleared successfully",
        cart,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to clear cart" });
    }
  },
};
