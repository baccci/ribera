import { QuantifiedProduct } from '@/store/cartStore'
import useOrder from '@/store/orderStore'
import { OrderType, WebCoupon } from '@/types/order'
import { useEffect, useState } from 'react'

export const useClientShopStore = () => {
  const { orderContent, orderStatus, orderType, coupons, date, billingData, paymentMethod } = useOrder()

  const [_orderContent, setOrderContent] = useState<QuantifiedProduct[]>([])
  const [_orderStatus, setOrderStatus] = useState<'success' | null | undefined>(null)
  const [_orderType, setOrderType] = useState<OrderType>(undefined)
  const [_coupons, setCoupons] = useState<WebCoupon[]>([])
  const [_date, setDate] = useState<Date | null>(null)
  const [_billingData, setBillingData] = useState(billingData)
  const [_paymentMethod, setPaymentMethod] = useState(paymentMethod)

  useEffect(() => {
    setOrderContent(orderContent)
    setOrderStatus(orderStatus)
    setOrderType(orderType)
    setCoupons(coupons)
    setDate(date)
    setBillingData(billingData)
    setPaymentMethod(paymentMethod)
  }, [orderContent, orderStatus, orderType, coupons, date, billingData, paymentMethod])

  return {
    orderContent: _orderContent,
    orderStatus: _orderStatus,
    orderType: _orderType,
    coupons: _coupons,
    date: _date,
    billingData: _billingData,
    paymentMethod: _paymentMethod
  }
}