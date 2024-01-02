import { DELIVERY_PRICE, DELIVERY_MODES } from '@/constants/constants'
import { useClientCart } from '@/hooks/clientCartStore'
import { Discount, BillingData, PaymentMethod, WebCoupon } from '@/types/order'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import type { SummaryProps, Mode, ValidationError } from './types'

const defaultBillingData = {
  cardNumber: '',
  cardName: '',
  cardExpiration: '',
  cardCvc: ''
}

export const useSummary = ({ mode: initialMode }: SummaryProps) => {
  const [mode, setMode] = React.useState<Mode>(initialMode)
  const [deliveryAddress, setDeliveryAddress] = React.useState<string>('')
  const [deliveryPrice, setDeliveryPrice] = React.useState<number>(DELIVERY_PRICE)
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>(null)
  const [billingData, setBillingData] = React.useState<BillingData>(defaultBillingData)
  const [inputErrors, setInputErrors] = React.useState<ValidationError[]>([])
  const [coupons, setCoupons] = React.useState<WebCoupon[]>([
    {
      id: '1',
      name: 'Cupón de prueba',
      type: 'percentage',
      value: 10
    }
  ])

  return {
    mode,
    setMode,
    deliveryAddress,
    setDeliveryAddress,
    deliveryPrice,
    setDeliveryPrice,
    paymentMethod,
    setPaymentMethod,
    billingData,
    setBillingData,
    coupons,
    setCoupons,
    inputErrors,
    setInputErrors
  }
}

type SummaryContextType = ReturnType<typeof useSummary> | null

export const SummaryContext = React.createContext<SummaryContextType>(null)

export const useSummaryContext = () => {
  const context = React.useContext(SummaryContext)
  if (!context) {
    throw new Error('useSummaryContext must be used within a SummaryProvider')
  }
  return context
}

interface TotalPriceProps {
  mode: Mode,
  deliveryPrice: number
}

export const useTotalPrice = ({ mode, deliveryPrice }: TotalPriceProps) => {
  const { totalPrice: totalCart } = useClientCart()
  const discounts = useDiscounts()
  const discount = discounts.reduce((acc, discount) => acc + discount.finalValue, 0)
  const deliveryFinalPrice = mode === DELIVERY_MODES.delivery ? deliveryPrice : 0
  const total = totalCart + deliveryFinalPrice - discount

  return total
}

export const useDiscounts = () => {
  const { coupons } = useSummaryContext()
  const { totalPrice } = useClientCart()

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

export const useMobileSearchParams = () => {
  const searchParams = useSearchParams()
  const mobileSearchParams = searchParams?.get('mobile') || ''

  return mobileSearchParams
}
