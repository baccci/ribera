import { yellow, red } from "colorette";
import Products from 'models/products';
import { NextApiRequest, NextApiResponse } from "next";
import type { Product } from "pages/productos";
import { dbConnect } from "lib/mongooseConnection";

dbConnect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(yellow('GET /products'));
  try{
    const response = await Products.find();
    const products: Product[] = response.filter(product => product.available);
    res.json(products);
  }catch(err){
    console.log(red(`Error on GET /products: ${err}`));
    res.status(500).json({message: 'Error'});
  }
}