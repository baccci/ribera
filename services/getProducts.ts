import { yellow, red } from 'colorette'
import { dbConnect } from 'lib/mongooseConnection'
import Products from 'models/products'
import { productsObjects } from 'constants/static_products'
import { MongoProduct, Product } from '@/types/types'
import { cache } from 'react'

dbConnect()

export const getProducts = cache(async () => {
  console.log(yellow('GET /products'))
  try {
    const response = await Products.find().lean<MongoProduct[]>()
    const mongoProducts = response.map(({ _id, ...product }) => product)
    const products = mongoProducts.length > 0 ? mongoProducts : productsObjects
    const filteredProducts: Product[] = products.filter(product => product.available)

    return filteredProducts
  } catch (err) {
    console.log(red(`Error on GET /products: ${err}`))
    return productsObjects.filter(product => product.available)
  }
})