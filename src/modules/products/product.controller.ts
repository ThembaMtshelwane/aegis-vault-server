import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import { paginate } from "../../shared/services/paginate.js";
import { Product } from "./product.model.js";
import { sendResponse } from "../../utils/http.success.js";
import { HTTP_CODES } from "../../consts/http.consts.js";
import { HttpError } from "../../middleware/error.middleware.js";

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await paginate(Product, req.query, {
    searchFields: ["name", "description", "category"],
    filterableFields: ["price", "inStock", "brand"],
    selectFields: "-supplierDetails",
  });
  sendResponse(res, HTTP_CODES.OK, "Successfully fetched products", products);
});

export const massCreateProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const productsData = req.body.products;
    if (!Array.isArray(productsData) || productsData.length === 0) {
      throw new HttpError(HTTP_CODES.BAD_REQUEST, "Invalid products data");
    }
    const createdProducts = await Product.insertMany(productsData);
    if (!createdProducts || createdProducts.length === 0) {
      throw new HttpError(
        HTTP_CODES.INTERNAL_SERVER_ERROR,
        "Failed to create products"
      );
    }
    sendResponse(
      res,
      HTTP_CODES.CREATED,
      "Successfully created products",
      createdProducts
    );
  }
);
