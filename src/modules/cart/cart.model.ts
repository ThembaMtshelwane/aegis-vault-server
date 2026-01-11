import { model, Model, Schema } from "mongoose";
import type { ICart } from "./cart.type.js";

const cartSchema = new Schema<ICart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
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
    totalPrice: { type: Number, default: 0, required: true }, // sum of all item prices in the items array
  },
  { timestamps: true }
);
export const Cart: Model<ICart> = model<ICart>("Cart", cartSchema);
