import { Alert } from '@/components/Alert/Alert'
import { Tab } from '@/components/Tab/Tab'
import React from 'react'
import { CreditCardNumberInput } from './Inputs/CreditCardNumberInput'
import { IconAlertTriangle, IconCash } from '@tabler/icons-react'
import { CreditCardExpDateInput } from './Inputs/CreditCardExpDateInput'
import { CreditCardCVCInput } from './Inputs/CreditCardCVCInput'
import { CreditCardNameInput } from './Inputs/CreditCardNameInput'
import { usePaymentMethodContext } from './hooks'
import { PAYMENT_METHODS } from '@/constants/constants'
import { CreditCard } from './CreditCard'
import { PaymentMethod } from '@/types/order'

interface CreditCardFormProps {
  currentPaymentMethod?: PaymentMethod
}

export const CreditCardForm: React.FC<CreditCardFormProps> = ({ currentPaymentMethod }) => {

  const {
    setPaymentMethod,
    billingData: paymentData,
    creditCardBrand,
    cvcInputFocus
  } = usePaymentMethodContext()

  const currentTab = currentPaymentMethod || PAYMENT_METHODS.card
  const creditCardSide = cvcInputFocus ? 'back' : 'front'

  const handleSetPaymentMethod = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget

    if (!(value === PAYMENT_METHODS.cash || value === PAYMENT_METHODS.card)) return
    setPaymentMethod(value)
  }

  return (
    <div className='flex flex-col justify-between md:min-w-[420px]'>
      <div>
        <Tab className='mt-6' initialTab={currentTab}>
          <Tab.TabItem value={PAYMENT_METHODS.card} onClick={handleSetPaymentMethod}>
            Tarjeta de crédito
          </Tab.TabItem>
          <Tab.TabItem value={PAYMENT_METHODS.cash} onClick={handleSetPaymentMethod}>
            Efectivo
          </Tab.TabItem>
          <Tab.TabContent value={PAYMENT_METHODS.card}>
            <Alert className='inline-block mt-0 [text-wrap:balance] sm:[text-wrap:unset]'>
              <Alert.XButton />
              <IconAlertTriangle size={18} className='inline relative pr-1' />Esta tienda está hecha a modo de prueba, no es necesario ingresar una tarjeta de crédito real.
            </Alert>
            <div className='py-6 sm:py-8 px-4 bg-yellow-400 rounded-xl justify-center flex top-0 z-10'>
              <CreditCard
                cardNumber={paymentData?.cardNumber}
                cardName={paymentData?.cardName}
                cardExpDate={paymentData?.cardExpiration}
                cardCVC={paymentData?.cardCvc}
                cardSide={creditCardSide}
                cardBrand={creditCardBrand}
              />
            </div>
            <div className='flex flex-col gap-4 mt-4'>
              <CreditCardNumberInput />
              <CreditCardNameInput />
              <div className='flex justify-between'>
                <CreditCardExpDateInput />
                <CreditCardCVCInput />
              </div>
            </div>
          </Tab.TabContent>
          <Tab.TabContent value={PAYMENT_METHODS.cash}>
            <div className='bg-slate-50 rounded-xl p-4 flex items-center gap-3 border border-slate-400'>
              <input type='radio' checked onChange={() => undefined} />
              <div className='flex gap-1 items-center text-base'>
                <IconCash size={20} className='text-green-600' />
                Pagar con efectivo
              </div>
            </div>
          </Tab.TabContent>
        </Tab>
      </div>
    </div>
  )
}
