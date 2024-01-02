import TextInput from '@/components/TextInput/TextInput'
import React from 'react'
import { usePaymentMethodContext } from '../hooks'
import { cardNameSchema } from '../CreditCardSchema'

export const CreditCardNameInput: React.FC = () => {
  const { billingData: paymentData, setBillingData: setPaymentData, inputsErrors, setInputsErrors } = usePaymentMethodContext()
  const error = inputsErrors?.cardName?._errors?.[0]

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setPaymentData({ ...paymentData, cardName: value })
  }

  const handleBlurValidation = (e: React.FocusEvent<HTMLInputElement> | undefined) => {
    const { value } = e?.target || {}
    const cardNameValidation = cardNameSchema.safeParse(value)
    if (cardNameValidation.success) return

    const { _errors } = cardNameValidation.error.format()
    setInputsErrors({ ...inputsErrors, cardName: { _errors } })
  }

  return (
    <TextInput
      label='Nombre del titular'
      id='cardholder-name'
      placeholder='Nombre del titular'
      error={error}
      errorDisplay='bottom'
      required
      value={paymentData.cardName}
      onChange={handleChangeValue}
      onBlur={handleBlurValidation}
    />
  )
}