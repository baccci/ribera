import { yellow, red } from 'colorette'
import { dbConnect } from 'lib/mongooseConnection'
import Products from 'models/products'
import { productsObjects } from 'constants/static_products'
import type { Product } from 'pages/productos';

dbConnect();

export default async function getProducts(){
  console.log(yellow('GET /products'));
  try{
    const response = await Products.find();
    const products = response.length > 0 ? response : productsObjects;
    const filteredProducts: Product[] = products.filter(product => product.available);
    return filteredProducts;
  }catch(err){
    console.log(red(`Error on GET /products: ${err}`));
    return productsObjects.filter(product => product.available);
  }
}