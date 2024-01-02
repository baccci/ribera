import { DELIVERY_MODES_ARRAY, BillingData, PaymentMethod } from '@/types/order'
import { INPUTS_NAMES } from './constants'

export type Mode = typeof DELIVERY_MODES_ARRAY[number]

export type InputNames = typeof INPUTS_NAMES[keyof typeof INPUTS_NAMES]

export type ValidationArgs = {
  mode: Mode,
  deliveryAddress: string,
  paymentMethod: PaymentMethod,
  billingData: BillingData | null
}

export type ValidationError = Partial<{
  [key in InputNames]: string
}>

export type SummaryValidationResult = {
  success: boolean,
  errors: ValidationError[]
}

export interface SummaryProps {
  mode: Mode
}
