import useCart, { type CartDetail } from '@/store/cartStore'
import { quantifyProducts } from '@/store/utils/quantifyProducts'
import { useEffect, useState } from 'react'

// In order to avoid hydration mismatch
// when listening to the store in a component,
// is needed to use a separate state
// and listen for updates from the store

export const useClientCart = () => {
  const { cartContent, getTotalPrice, getQuantity, getItems } = useCart()
  const [totalPrice, setTotalPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [items, setitems] = useState<CartDetail>({})

  const _totalPrice = getTotalPrice()
  const _quantity = getQuantity()
  const _items = getItems()
  const quantifiedItems = quantifyProducts(items)

  useEffect(() => {
    setTotalPrice(_totalPrice)
    setQuantity(_quantity)
    setitems(_items)
  }, [cartContent, _totalPrice, _quantity, _items])

  return { totalPrice, quantity, quantifiedItems, items }
}