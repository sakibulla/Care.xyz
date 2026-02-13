"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export const getProducts = async () => {
  const productsCollection = await dbConnect(collections.PRODUCTS);
  const products = await productsCollection.find().toArray();
  return products;
};

export const getSingleProduct = async (id) => {
  if (id.length != 24) {
    return {};
  }
  const query = { _id: new ObjectId(id) };

  const productsCollection = await dbConnect(collections.PRODUCTS);
  const product = await productsCollection.findOne(query);

  return { ...product, _id: product._id.toString() } || {};
};
