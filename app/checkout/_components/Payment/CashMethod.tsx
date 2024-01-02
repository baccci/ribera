import { IconCash, IconChevronRight } from '@tabler/icons-react'

export const CashMethod = () => {
  return (
    <div className='flex items-center'>
      <IconCash size={24} className='text-green-600'/>
      <div className='ml-3 flex gap-1'>
        Efectivo
      </div>
      <IconChevronRight size={16} className='ml-auto'/>
    </div>
  )
}
