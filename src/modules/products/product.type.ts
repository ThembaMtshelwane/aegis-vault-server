import type { Schema } from "mongoose";

export const RARITY_VALUES = [
  "Common",
  "Rare",
  "Very Rare",
  "Legendary",
] as const;
export const ITEM_TYPE_VALUES = [
  "Weapon",
  "Armor",
  "Item",
  "Spell Component",
  "Tome",
] as const;

export type Rarity = (typeof RARITY_VALUES)[number];
export type ItemType = (typeof ITEM_TYPE_VALUES)[number];

export interface IProduct {
  _id: Schema.Types.ObjectId;
  name: string;
  slug: string;
  price: number;
  category: ItemType;
  image: string;
  description: string;
  rarity: Rarity;
  requiresAttunement: boolean;
  stats?: string[];
}
