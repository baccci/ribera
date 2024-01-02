export const CREDIT_CARDS_BRANDS = {
  AMERICAN_EXPRESS: 'American Express',
  DINERS_CLUB: 'Diners Club',
  DISCOVER: 'Discover',
  ELO: 'Elo',
  HIPERCARD: 'Hipercard',
  HIPER: 'Hiper',
  JCB: 'JCB',
  MAESTRO: 'Maestro',
  MASTERCARD: 'Mastercard',
  MIR: 'Mir',
  UNIONPAY: 'UnionPay',
  VISA: 'Visa'
} as const

export const CREDIT_CARDS_BRANDS_KEYS = {
  'American Express': 'AMERICAN_EXPRESS',
  'Diners Club': 'DINERS_CLUB',
  Discover: 'DISCOVER',
  Elo: 'ELO',
  Hipercard: 'HIPERCARD',
  Hiper: 'HIPER',
  JCB: 'JCB',
  Maestro: 'MAESTRO',
  Mastercard: 'MASTERCARD',
  Mir: 'MIR',
  UnionPay: 'UNIONPAY',
  Visa: 'VISA'
} as const

const CREDIT_CARDS_BRANDS_VALUES = Object.values(CREDIT_CARDS_BRANDS_KEYS)

export type CreditCardsBrands = typeof CREDIT_CARDS_BRANDS_VALUES[number]

