import { BillingData } from '@/types/order'
import { CreditCardSchema } from './CreditCardSchema'

export function parseCardExpDate(dateString: unknown) {
  if (typeof dateString !== 'string') return 'null'

  const dateRegex = /(\d){2}(\/)(\d){2}|(\d){2}/g
  if (!dateRegex.test(dateString)) return 'null'

  const dateArr = dateString.split('/')
  const dateWithDayString = `${dateArr[0]}/01/${dateArr[1]}`

  return new Date(dateWithDayString)
}

export function isValidDate(date: string) {
  const parsedDate = Date.parse(date)

  return !isNaN(parsedDate)
}

export function validateInputs(paymentData: BillingData) {
  const overallResult = CreditCardSchema.safeParse(paymentData)
  return overallResult
} 