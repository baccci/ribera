import { Product } from '@/types/types'

/**
 * Filters an array of products by category.
 * @param products - The array of products to filter.
 * @param category - The category to filter by.
 * @returns An array of products filtered by category.
 */
export function filterByCategory(products: Product[], category: string | undefined) {
  if (!category) return products

  const filteredProducts = products.filter(product => {
    return product.category?.toLocaleLowerCase() === category.toLocaleLowerCase()
  })

  return filteredProducts
}