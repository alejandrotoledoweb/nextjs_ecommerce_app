import db from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import ProductModel from "@/models/Products";
import data from "@/utils/data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  await db.dbConnect();
  await ProductModel.deleteMany();
  await ProductModel.insertMany(data.products);
  await db.dbDisconnect();
  res.send({ message: "seeded successfully" });
}
