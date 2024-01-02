import { useClientCart } from '@/hooks/clientCartStore'
import useCart from '@/store/cartStore'
import { Discount, WebCoupon } from '@/types/order'
import { useEffect } from 'react'

export const useClearCart = () => {
  const { clearCart } = useCart()
  const { items } = useClientCart()

  useEffect(() => {
    const itemsLength = Object.keys(items).length
    if (itemsLength > 0) clearCart()
  })
}

export const useDiscounts = (coupons: WebCoupon[], totalPrice: number) => {

  const discounts: Discount[] = coupons.map(coupons => {
    const discountFinalValue = coupons.type === 'percentage'
      ? totalPrice * (coupons.value / 100)
      : coupons.value

    return {
      type: 'coupon',
      discountType: coupons.type,
      value: coupons.value,
      name: coupons.name,
      finalValue: discountFinalValue
    }
  })

  return discounts
}