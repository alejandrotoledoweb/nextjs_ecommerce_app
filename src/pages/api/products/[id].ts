import Product from "@/models/Products";
import db from "@/utils/db";
import nextConnect from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { ProductInterface } from "@/utils/interfaces";
import ProductModel from "@/models/Products";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductInterface[]>
) {
  await db.dbConnect();
  const products = await ProductModel.findById(req.query.id);
  await db.dbDisconnect();
  res.json(products);
}
