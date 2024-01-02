import { CreditCardsBrands } from '@/constants/credit_cards'
import { BillingData, PaymentMethod } from '@/types/order'
import React, { useEffect } from 'react'
import { PaymentError } from './types'

const defaultBillingData: BillingData = {
  cardNumber: '',
  cardName: '',
  cardExpiration: '',
  cardCvc: ''
}

const defaultInputsErrors: PaymentError = { _errors: [] }

export const usePaymentMethod = () => {
  const [billingData, setBillingData] = React.useState<BillingData>(defaultBillingData)
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod | null>('card')
  const [showModal, setShowModal] = React.useState<boolean>(false)
  const [creditCardBrand, setCreditCardBrand] = React.useState<CreditCardsBrands | 'unknown'>('unknown')
  const [cvcInputFocus, setCvcInputFocus] = React.useState<boolean | null>(null)
  const [inputsErrors, setInputsErrors] = React.useState<PaymentError>(defaultInputsErrors)

  const handleOpenModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  useEffect(() => {
    if (!showModal) {
      setInputsErrors(defaultInputsErrors)
    }
  }, [showModal])

  return {
    billingData,
    setBillingData,
    paymentMethod,
    setPaymentMethod,
    showModal,
    setShowModal,
    handleOpenModal,
    handleCloseModal,
    creditCardBrand,
    setCreditCardBrand,
    cvcInputFocus,
    setCvcInputFocus,
    inputsErrors,
    setInputsErrors
  }
}

type PaymentMethodContextType = ReturnType<typeof usePaymentMethod> | null

export const PaymentMethodContext = React.createContext<PaymentMethodContextType>(null)

export const usePaymentMethodContext = () => {
  const context = React.useContext(PaymentMethodContext)
  if (!context) {
    throw new Error('usePaymentMethodContext must be used within a PaymentMethodProvider')
  }
  return context
}