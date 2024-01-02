import { BillingData } from '@/types/order'
import { ZodFormattedError } from 'zod'

export type PaymentError = ZodFormattedError<BillingData>