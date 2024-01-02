import { useEffect, useState } from 'react'
import useCart from '@/store/cartStore'
import type { Product } from '@/types/types'

export const useProductQuantity = (product: Product) => {
  const [quantity, setQuantity] = useState(0)

  const { getProductQuantity } = useCart()
  const productQuantity = getProductQuantity(product)

  useEffect(() => {
    setQuantity(productQuantity)
  }, [productQuantity])

  return { quantity, setQuantity }
}