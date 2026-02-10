import type { Schema } from "mongoose";
import type { IProduct } from "../products/product.type.js";

export interface ICartItem {
  userId: Schema.Types.ObjectId;
  product: IProduct;
  quantity: number;
  price: number; // item price * quantity
}

export interface ICart {
  userId: Schema.Types.ObjectId;
  items: ICartItem[];
  totalPrice: number; // sum of all item prices in the items array
}
