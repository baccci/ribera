import { Product } from '@/types/types'

/**
 * Filters an array of products by a url search query string.
 * @param products - The array of products to filter.
 * @param searchString - The search string to filter by.
 * @returns An array of products that match the search string.
 */
export function filterBySearchString(products: Product[], searchString: string | undefined) {
  if (!searchString) return products

  const filteredProducts = products.filter(product => {
    return product.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())
  })

  return filteredProducts
}