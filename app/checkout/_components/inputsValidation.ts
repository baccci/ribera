import { ValidationArgs, ValidationError, SummaryValidationResult } from './types'

export const inputsValidation = ({
  mode,
  deliveryAddress,
  paymentMethod,
  billingData: paymentData
}: ValidationArgs): SummaryValidationResult => {
  const errors: ValidationError[] = []
  const paymentDataEmpty = paymentData && Object.values(paymentData).every(value => value === '')

  if (!paymentMethod || (paymentMethod === 'card' && paymentDataEmpty)) {
    errors.push({
      payment: 'No seleccionaste un método de pago'
    })
  }

  if (mode === 'delivery' && !deliveryAddress) {
    errors.push({
      adress: 'No seleccionaste una dirección de entrega'
    })
  }
  const success = errors.length === 0

  return {
    success,
    errors
  }
}