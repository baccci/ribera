import { BillingData, OrderType, PaymentMethod } from '@/types/order'
import React from 'react'
import { Card } from './Card'
import { numberToPrice } from '@/lib/numberToPrice'
import { CardIcon } from '@/features/PaymentModal/CardIcon'
import { useCardBrand } from '@/hooks/useCardBrand'

interface InformativeCardsProps {
  discount: number
  orderType: OrderType
  deliveryPrice: number
  paymentMethod: PaymentMethod,
  billingData: BillingData | null
}

export const InformativeCards: React.FC<InformativeCardsProps> = ({
  discount,
  orderType,
  deliveryPrice,
  paymentMethod,
  billingData
}) => {

  const payment = paymentMethod || 'cash'
  const BillingCardBody = {
    card: <CreditCardMethod billingData={billingData} />,
    cash: <span>Efectivo</span>
  }[payment]

  return (
    <div className='flex flex-wrap gap-4 mb-4'>
      <Card show={!!discount} className='w-fit'>
        <Card.Title>
          Total descuentos
        </Card.Title>
        <Card.Value className='text-green-500 font-medium'>
          - {numberToPrice(discount)}
        </Card.Value>
      </Card>
      <Card show={orderType === 'delivery'} className='w-fit'>
        <Card.Title>
          Delivery
        </Card.Title>
        <Card.Value className='font-medium'>
          {numberToPrice(deliveryPrice)}
        </Card.Value>
      </Card>
      <Card>
        <Card.Title>
          Pago
        </Card.Title>
        <Card.Value>
          {BillingCardBody}
        </Card.Value>
      </Card>
    </div>
  )
}

interface CreditCardMethodProps {
  billingData: BillingData | null
}

const CreditCardMethod: React.FC<CreditCardMethodProps> = ({ billingData }) => {
  const cardBrand = useCardBrand(billingData?.cardNumber)
  const cardLastDigits = '**** ' + billingData?.cardNumber.slice(-4)
  return (
    <div className='flex items-center gap-2'>
      <CardIcon cardBrand={cardBrand} size={20} />
      <span className='text-sm font-medium'>{cardLastDigits}</span>
    </div>
  )
}