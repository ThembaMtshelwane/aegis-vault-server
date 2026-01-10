import { model, Model, Schema } from "mongoose";
import {
  ITEM_TYPE_VALUES,
  RARITY_VALUES,
  type IProduct,
} from "./product.type.js";

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ITEM_TYPE_VALUES,
      required: true,
      default: ITEM_TYPE_VALUES[0],
    },
    image: { type: String, required: true },
    description: { type: String, required: true },
    rarity: {
      type: String,
      enum: RARITY_VALUES,
      required: true,
      default: RARITY_VALUES[0],
    },
    requiresAttunement: { type: Boolean, required: true },
    stats: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Product: Model<IProduct> = model<IProduct>(
  "Product",
  productSchema
);
