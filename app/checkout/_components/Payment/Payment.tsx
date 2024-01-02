import React from 'react'
import { useSummaryContext } from '../hooks'
import { NoPaymentMethod } from './NoPaymentMethod'
import { CashMethod } from './CashMethod'
import { CreditCardMethod } from './CreditCardMethod'
import { PaymentModal } from '@/features/PaymentModal/PaymentModal'
import { BillingData, PaymentMethod as PaymentMethodType } from '@/types/order'
import { IconX } from '@tabler/icons-react'

export const Payment: React.FC = () => {
  const {
    paymentMethod,
    setBillingData: setPaymentData,
    setPaymentMethod: setSummaryPaymentMethod,
    inputErrors
  } = useSummaryContext()

  const error = inputErrors.find(error => error.payment)?.payment
  const paymentMethodString = paymentMethod || 'null'

  const PaymentMethodSelected = {
    null: <NoPaymentMethod />,
    card: <CreditCardMethod />,
    cash: <CashMethod />
  }[paymentMethodString]

  const handleSavePaymentData = (paymentData: BillingData, paymentMethod: PaymentMethodType) => {
    setPaymentData(paymentData)
    setSummaryPaymentMethod(paymentMethod)
  }

  return (
    <PaymentModal func={handleSavePaymentData} currentPaymentMethod={paymentMethod}>
      <div className='flex flex-col gap-2'>
        Método de pago:
        <div className='rounded-xl bg-white cursor-pointer w-full py-2.5 px-3 hover:shadow-md transition-shadow'>
          {PaymentMethodSelected}
        </div>
        <ErrorDisplay error={error} />
      </div>
    </PaymentModal>
  )
}

const ErrorDisplay = ({ error }: { error?: string }) => {
  if (!error) return null

  return (
    <div className='text-red-500 flex gap-1 items-center'><IconX size={16} stroke={3} /> {error}</div>
  )
}