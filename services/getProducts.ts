import { yellow, red } from 'colorette'
import { dbConnect } from 'lib/mongooseConnection'
import Products from 'models/products'
import { MongoProduct, Product } from '@/types/types'
import { cache } from 'react'

dbConnect()

const getProducts = cache(async () => {
  console.log(yellow('GET /products'))
  try {
    const response = await Products.find({ available: true }).lean<MongoProduct[]>()
    const products: Product[] = response.map(({ _id, ...product }) => product)

    return products
  } catch (err) {
    console.log(red(`Error on GET /products: ${err}`))
    return []
  }
})

export default getProducts