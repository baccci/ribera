import { IconCreditCard } from '@tabler/icons-react'

export const NoPaymentMethod = () => {
  return (
    <div className='flex gap-2'>
      <IconCreditCard className='text-slate-500' />
      <div className='whitespace-nowrap truncate text-ellipsis'>
        Selecciona un método de pago
      </div>
    </div>
  )
}
