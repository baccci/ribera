import create from 'zustand'
import { persist } from 'zustand/middleware'
import { type QuantifiedProduct } from './cartStore'
import type { OrderStatus, OrderType, BillingData, PaymentMethod, WebCoupon } from '@/types/order'

export interface OrderState {
  orderType: OrderType
  orderStatus: OrderStatus
  orderContent: QuantifiedProduct[]
  orderAddress: string | null
  date: Date | null
  paymentMethod: PaymentMethod
  billingData: BillingData | null
  coupons: WebCoupon[]
  setCoupon: (coupon: WebCoupon) => void
  setCoupons: (coupons: WebCoupon[]) => void
  deleteCoupon: (coupon: WebCoupon) => void
  setOrderType: (orderType: OrderType) => void
  setOrderStatus: (orderStatus: OrderStatus) => void
  setOrderContent: (orderContent: QuantifiedProduct[]) => void
  setOrderAdress: (orderAddress: string) => void
  setDate: (date: Date) => void
  setPaymentMethod: (paymentMethod: PaymentMethod) => void
  setPaymentData: (paymentData: BillingData) => void
  cleanShop: () => void
}

const useOrder = create(persist<OrderState>(
  (set, get) => ({
    orderContent: [],
    orderType: undefined as OrderType,
    orderStatus: null,
    orderAddress: null,
    date: null,
    paymentMethod: null,
    billingData: null,
    coupons: [],
    setCoupon: (coupon: WebCoupon) => {
      const currentCoupon = get().coupons
      currentCoupon.push(coupon)
      set({ coupons: currentCoupon })
    },
    setCoupons: (coupons: WebCoupon[]) => set({ coupons }),
    deleteCoupon: (coupon: WebCoupon) => {
      const currentCoupon = get().coupons
      const newCoupon = currentCoupon.filter(c => c.id !== coupon.id)
      set({ coupons: newCoupon })
    },
    setOrderContent: (orderContent: QuantifiedProduct[]) => set({ orderContent }),
    setOrderType: (orderType: OrderType) => set({ orderType }),
    setOrderStatus: (orderStatus: OrderStatus) => set({ orderStatus }),
    setOrderAdress: (orderAddress: string) => set({ orderAddress }),
    setDate: (date: Date) => set({ date }),
    setPaymentMethod: (paymentMethod: PaymentMethod) => set({ paymentMethod }),
    setPaymentData: (paymentData: BillingData) => set({ billingData: paymentData }),
    cleanShop: () => set({
      orderContent: [],
      orderType: undefined,
      orderStatus: null,
      orderAddress: null,
      date: null,
      paymentMethod: null,
      billingData: null,
      coupons: []
    })
  }), { name: 'shop' }
))

export default useOrder