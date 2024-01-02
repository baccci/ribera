import { AmexCardIcon, DinersClubCardIcon, DiscoverCardIcon, JCBCardIcon, MaestroCardIcon, MasterCardIcon, UnionPayrCardIcon, VisaCardIcon } from '@/components/Icons'
import { CreditCardsBrands } from '@/constants/credit_cards'
import { IconCreditCard } from '@tabler/icons-react'
import React from 'react'

interface CardIconProps {
  cardBrand: CreditCardsBrands | 'unknown'
  size?: number
}

export const CardIcon: React.FC<CardIconProps> = ({ cardBrand, size = 24 }) => {

  const CreditCardIcon = {
    AMERICAN_EXPRESS: <AmexCardIcon size={size} />,
    DINERS_CLUB: <DinersClubCardIcon size={size} />,
    DISCOVER: <DiscoverCardIcon size={size} />,
    ELO: <IconCreditCard size={size} />,
    HIPERCARD: <IconCreditCard size={size} />,
    HIPER: <IconCreditCard size={size} />,
    JCB: <JCBCardIcon size={size} />,
    MAESTRO: <MaestroCardIcon size={size} />,
    MASTERCARD: <MasterCardIcon size={size} />,
    MIR: <IconCreditCard size={size} />,
    UNIONPAY: <UnionPayrCardIcon size={size} />,
    VISA: <VisaCardIcon size={size} />,
    unknown: <IconCreditCard size={size - 4} className='ml-1' />
  }[cardBrand]

  return (
    <>
      {CreditCardIcon}
    </>
  )
}
