import TextInput from '@/components/TextInput/TextInput'
import React from 'react'
import { CardIcon } from '../CardIcon'
import { usePaymentMethodContext } from '../hooks'
import { useUpdateCardBrand } from './hooks'
import { useCardBrand } from '@/hooks/useCardBrand'
import { cardNumberSchema } from '../CreditCardSchema'

export const CreditCardNumberInput: React.FC = () => {
  const { billingData: paymentData, setBillingData: setPaymentData, setCreditCardBrand, inputsErrors, setInputsErrors } = usePaymentMethodContext()
  const error = inputsErrors?.cardNumber?._errors?.[0]

  const cardBrand = useCardBrand(paymentData?.cardNumber)
  useUpdateCardBrand(cardBrand, setCreditCardBrand)

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const filteredString = value.replaceAll(/[^0-9]/g, '')

    // add spaces every 4 numbers except the last one
    const spacedString = filteredString.replace(/(.{4})/g, '$1 ').trim()
    setPaymentData({ ...paymentData, cardNumber: spacedString })
  }

  const handleBlurValidation = (e: React.FocusEvent<HTMLInputElement> | undefined) => {
    const { value } = e?.target || {}
    const cardNumberValidation = cardNumberSchema.safeParse(value)
    if (cardNumberValidation.success) return

    const { _errors } = cardNumberValidation.error.format()
    setInputsErrors({ ...inputsErrors, cardNumber: { _errors } })
  }

  return (
    <TextInput
      icon={<CardIcon cardBrand={cardBrand} />}
      maxLength={19}
      id='card-number'
      label='Número de la tarjeta'
      placeholder='xxxx xxxx xxxx xxxx'
      className='font-bold pl-10 text-base placeholder:font-normal'
      inputMode='numeric'
      error={error}
      errorDisplay='bottom'
      value={paymentData?.cardNumber}
      onChange={handleCardNumberChange}
      onBlur={handleBlurValidation}
      required
    />
  )
}
