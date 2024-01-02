import TextInput from '@/components/TextInput/TextInput'
import React from 'react'
import { usePaymentMethodContext } from '../hooks'
import { cardCvcSchema } from '../CreditCardSchema'

export const CreditCardCVCInput: React.FC = () => {
  const {
    billingData: paymentData,
    setBillingData: setPaymentData,
    setCvcInputFocus,
    inputsErrors,
    setInputsErrors
  } = usePaymentMethodContext()
  const error = inputsErrors?.cardCvc?._errors?.[0]

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setPaymentData({ ...paymentData, cardCvc: value })
  }

  const handleCVCInputFocus = () => setCvcInputFocus(true)

  const handleBlurValidation = (e: React.FocusEvent<HTMLInputElement> | undefined) => {
    setCvcInputFocus(false)

    const { value } = e?.target || {}
    const cardCvcValidation = cardCvcSchema.safeParse(value)
    if (cardCvcValidation.success) return

    const { _errors } = cardCvcValidation.error.format()
    setInputsErrors({ ...inputsErrors, cardCvc: { _errors } })
  }

  return (
    <TextInput
      label='CVC'
      id='card-security-code'
      wrapperClassName='max-w-[45%] my-0'
      type='password'
      error={error}
      errorDisplay='bottom'
      value={paymentData?.cardCvc}
      onChange={handleChangeValue}
      onFocus={handleCVCInputFocus}
      onBlur={handleBlurValidation}
      maxLength={4}
      required
    />
  )
}
