import { model, Model, Schema } from "mongoose";
import { ORDER_STATUS, type IOrder } from "./order.type.js";

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    totalPrice: { type: Number, default: 0, required: true },
    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PENDING,
    },
    items: {
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: { type: Number, default: 0, required: true },
          price: { type: Number, default: 0, required: true }, // item price * quantity
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);

export const Cart: Model<IOrder> = model<IOrder>("Cart", orderSchema);
