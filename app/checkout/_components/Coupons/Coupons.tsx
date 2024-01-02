import { Button } from '@/components/Button'
import TextInput from '@/components/TextInput/TextInput'
import { Coupon } from './Coupon'
import { useSummaryContext } from '../hooks'

export const Coupons = () => {
  const { coupons } = useSummaryContext()

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex justify-between items-end'>
        <TextInput
          id='coupon'
          label='Cupón'
          wrapperClassName='w-full mr-2'
          placeholder='Ingresá tu cupón'
          className='border-none'
        />
        <Button variant={'outline'}>
          Aplicar
        </Button>
      </div>
      <div>
        {coupons.map((coupon) => {
          const { name, type, value, id } = coupon
          return <Coupon key={id} {...{ name, type, value }}/>
        })
        }
      </div>
    </div>
  )
}
