import { yellow, red } from "colorette";
import Products from 'models/products';
import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "lib/mongooseConnection";
import { productsObjects } from 'constants/static_products';
import type { Product } from "pages/productos";

dbConnect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(yellow('GET /products'));
  try{
    const response = await Products.find();
    const products = response.length > 0 ? response : productsObjects;
    const filteredProducts: Product[] = products.filter(product => product.available);
    res.json(filteredProducts);
  }catch(err){
    console.log(red(`Error on GET /products: ${err}`));
    res.status(500).json({message: 'Error'});
  }
}