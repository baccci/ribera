import { DELIVERY_MODES, PAYMENT_METHODS } from '@/constants/constants'

const DELIVERY_MODES_ARRAY = Object.values(DELIVERY_MODES)
const PAYMENT_METHODS_ARRAY = Object.values(PAYMENT_METHODS)

export type OrderType = typeof DELIVERY_MODES_ARRAY[number] | undefined

export type OrderStatus = 'success' | null | undefined

export type PaymentMethod = typeof PAYMENT_METHODS_ARRAY[number] | null

export type BillingData = {
  cardNumber: string
  cardName: string
  cardExpiration: string
  cardCvc: string
}

type DiscountType = 'percentage' | 'amount'

/**
 * Types of discounts available, coupons and individual product discounts.
 * Percentage discounts are integers from 0 to 100.
 */

export type Discount = {
  type: 'coupon' | 'discount'
  discountType: DiscountType
  value: number
  name: string
  finalValue: number
}

export type CouponType = DiscountType

export type Coupon = {
  id: string
  name: string
  type: CouponType
  value: number
  active: boolean
}

export type WebCoupon = Omit<Coupon, 'active'>
