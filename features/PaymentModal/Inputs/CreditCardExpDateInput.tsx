import TextInput from '@/components/TextInput/TextInput'
import React from 'react'
import { usePaymentMethodContext } from '../hooks'
import { cardExpirationSchema } from '../CreditCardSchema'

export const CreditCardExpDateInput: React.FC = () => {
  const {
    billingData: paymentData,
    setBillingData: setPaymentData,
    inputsErrors,
    setInputsErrors
  } = usePaymentMethodContext()
  const error = inputsErrors?.cardExpiration?._errors?.[0]

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    // MM/YY or MM/YYYY
    const filteredValue = value.replace(/[^0-9/]/g, '')
      .replace(/[/]/g, '')
      .replace(/^(.{2})/, '$1/')
      .slice(0, 7)

    setPaymentData({ ...paymentData, cardExpiration: filteredValue })
  }

  const handleDeleteSlash = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && e.currentTarget.value.length === 3) {
      e.preventDefault()
      const filteredValue = e.currentTarget.value.replace(/[/]/g, '')
      setPaymentData({ ...paymentData, cardExpiration: filteredValue })
    }
  }

  const handleBlurValidation = (e: React.FocusEvent<HTMLInputElement> | undefined) => {
    const { value } = e?.target || {}
    const cardExpirationValidation = cardExpirationSchema.safeParse(value)
    if (cardExpirationValidation.success) return

    const { _errors } = cardExpirationValidation.error.format()
    setInputsErrors({ ...inputsErrors, cardExpiration: { _errors } })
  }

  return (
    <TextInput
      label='Vencimiento'
      id='card-expiration-date'
      placeholder='MM/YY'
      wrapperClassName='max-w-[45%] my-0'
      error={error}
      errorDisplay='bottom'
      value={paymentData.cardExpiration}
      onChange={handleChangeValue}
      onKeyDown={handleDeleteSlash}
      onBlur={handleBlurValidation}
      required
    />
  )
}
