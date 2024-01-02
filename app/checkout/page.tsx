'use client'
import React from 'react'
import { useClientCart } from '@/hooks/clientCartStore'
import { Summary } from './_components/Summary'
import { SummaryContext, useSummary } from './_components/hooks'
import useOrder from '@/store/orderStore'
import { useRouter } from 'next/navigation'
import { Cart } from './_components/Cart'
import { inputsValidation } from './_components/inputsValidation'

export default function Page() {
  const { quantifiedItems } = useClientCart()
  const {
    setOrderStatus,
    setOrderType,
    setOrderContent,
    setCoupons,
    setDate,
    setPaymentData,
    setPaymentMethod
  } = useOrder()

  const router = useRouter()
  const summary = useSummary({ mode: 'delivery' })
  const { paymentMethod, billingData: paymentData, coupons, mode, deliveryAddress, setInputErrors } = summary

  function submitOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const validationResult = inputsValidation({ paymentMethod, billingData: paymentData, deliveryAddress, mode })

    if (!validationResult.success) {
      setInputErrors(validationResult.errors)
      return
    }

    processPayment()
  }

  function processPayment() {
    setCoupons(coupons)
    setDate(new Date())
    setOrderContent(quantifiedItems)
    setOrderStatus('success')
    setOrderType(mode)
    setPaymentData(paymentData)
    setPaymentMethod(paymentMethod)

    router.push('/order')
  }

  return (
    <SummaryContext.Provider value={summary}>
      <form
        className={`flex flex-col md:flex-row items-cente md:px-0 md:py-0 md:rounded-none 
        md:items-start md:justify-around mb-[100px] mt-0 md:mt-7 `}
        id='checkout-form'
        onSubmit={submitOrder}
      >
        <Cart />
        <Summary />
      </form>
    </SummaryContext.Provider>
  )
}