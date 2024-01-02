import { CREDIT_CARDS_BRANDS_KEYS } from '@/constants/credit_cards'
import creditCardType from 'credit-card-type'

export const useCardBrand = (cardNumber?: string) => {
  if (!cardNumber) return 'unknown'

  const cardTypes = creditCardType(cardNumber?.replaceAll(' ', ''))
  const cardType = cardTypes.length > 1 ? 'unknown' : cardTypes?.at(0)?.niceType
  const cardBrand = CREDIT_CARDS_BRANDS_KEYS[cardType as keyof typeof CREDIT_CARDS_BRANDS_KEYS] || 'unknown'

  return cardBrand
}