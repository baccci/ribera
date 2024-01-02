import { IconChevronRight } from '@tabler/icons-react'
import { useSummaryContext } from '../hooks'
import { CardIcon } from '@/features/PaymentModal/CardIcon'
import { useCardBrand } from '@/hooks/useCardBrand'

export const CreditCardMethod = () => {
  const { billingData: paymentData } = useSummaryContext()
  const cardBrand = useCardBrand(paymentData.cardNumber)
  const creditCardLastDigits = paymentData.cardNumber.slice(-4)

  return (
    <div className='flex items-center'>
      <CardIcon cardBrand={cardBrand} />
      <div className='ml-3 flex gap-1'>
        <span className='relative top-0.5'>****</span>
        {creditCardLastDigits}
      </div>
      <IconChevronRight size={16} className='ml-auto' />
    </div>
  )
}
