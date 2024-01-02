import { CartDetail, QuantifiedProduct } from '../cartStore'

/**
 * Takes an array of each product sorted in an object by product code and 
 * returns an array of each unique product with a quantity property.
 * @param cartContent: CartDetail
 * @returns An array of each unique product with a quantity property.
 */
export function quantifyProducts(cartContent: CartDetail) {
  const cartCodes = Object.keys(cartContent)

  return cartCodes.reduce((acc, code) => {
    const product = cartContent[code][0]
    if (!product) return acc

    const quantity = cartContent[code].length
    const quantifiedProduct = { ...product, quantity } as QuantifiedProduct

    return [...acc, quantifiedProduct]
  }, [] as QuantifiedProduct[])
}