import type { Document, Schema } from "mongoose";
import type { ICartItem } from "../cart/cart.type.js";

export const ORDER_STATUS = {
  PENDING: "pending",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export interface IOrder extends Document {
  userId: Schema.Types.ObjectId;
  totalPrice: number;
  status: OrderStatus;
  items: ICartItem[];
}
