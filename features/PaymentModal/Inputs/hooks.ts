import { CreditCardsBrands } from '@/constants/credit_cards'
import React from 'react'

export const useUpdateCardBrand = (cardBrand: CreditCardsBrands | 'unknown', setCreditCardBrand: React.Dispatch<React.SetStateAction<CreditCardsBrands | 'unknown'>>) => {
  React.useEffect(() => {
    setCreditCardBrand(cardBrand)
  }, [cardBrand, setCreditCardBrand])
}
