import { CreditCardChipIcon, LongYellowLine } from '@/components/Icons'
import { CreditCardsBrands } from '@/constants/credit_cards'
import React from 'react'
import { CardIcon } from './CardIcon'
import { cn } from '@/lib/tailwindClassMerge'
import Atropos from 'atropos/react'
import 'atropos/css'

interface CreditCardProps {
  cardNumber?: string
  cardName?: string
  cardExpDate?: string
  cardCVC?: string
  cardSide: 'front' | 'back'
  cardBrand: CreditCardsBrands | 'unknown'
}

export const CreditCard: React.FC<CreditCardProps> = ({
  cardNumber,
  cardName,
  cardExpDate,
  cardCVC,
  cardSide,
  cardBrand
}) => {
  const cardNumberDisplay = cardNumber || '5200 1234 5678 9101'
  const cardNameDisplay = cardName?.slice(0, 20).toLocaleUpperCase() || 'COSME FULANITO'
  const nextYear = new Date().getFullYear() + 1
  const cardExpDateDisplay = cardExpDate?.slice(0, 5) || '12/' + nextYear.toString().slice(2)
  const cardBrandDisplay: CreditCardsBrands = cardBrand === 'unknown' ? 'MASTERCARD' : cardBrand
  const cardCvcDisplay = cardCVC || '123'
  const isBackFace = cardSide === 'back'

  return (
    <Atropos className={cn('w-[224px] h-[140px] sm:w-[280px] sm:h-[175px] aspect-video rounded-lg relative hover:shadow-xl')} shadow={false}>
      <div className='[perspective:150rem] relative w-[224px] h-[140px] sm:w-[280px] sm:h-[175px] bg-none group'>

        <div className={cn(`w-[224px] h-[140px] sm:w-[280px] sm:h-[175px] rounded-lg px-5 py-4 bg-white flex flex-col 
          absolute [backface-visibility:hidden] transition-transform duration-700 top-0 left-0 overflow-hidden
          `,
          { '[transform:rotateY(180deg)]': isBackFace }
        )}
        >
          <div className='absolute w-[18rem] sm:w-[22rem] [transform:rotate(45deg)] right-[-140px] sm:right-[-160px]'>
            <LongYellowLine />
          </div>
          <div className='absolute w-[18rem] sm:w-[22rem] [transform:rotate(45deg)] right-[-110px] sm:right-[-130px]'>
            <LongYellowLine />
          </div>
          <div className='absolute w-[18rem] sm:w-[22rem] [transform:rotate(45deg)] right-[-80px] sm:right-[-100px]'>
            <LongYellowLine />
          </div>
          <div className='mt-5 sm:mt-6'>
            <CreditCardChipIcon className='w-[32px] sm:w-[40px]' />
          </div>
          <div className='mt-1 sm:mt-2 text-lg sm:text-[22px] text-gray tracking-wider font-light'>
            {cardNumberDisplay}
          </div>
          <div className='mt-auto text-gray flex justify-between items-end text-[11px] sm:text-sm'>
            <div>
              {cardNameDisplay}
            </div>
            <div className='absolute top-[63%] sm:top-[65%] left-[35%] flex'>
              <span className='text-[8px] sm:text-[10px] leading-[8px] mr-1'>Exp. <br /> Date </span> {cardExpDateDisplay}
            </div>
            <div>
              <CardIcon cardBrand={cardBrandDisplay} size={40} />
            </div>
          </div>
        </div>

        <div className={cn(`w-[224px] h-[140px] sm:w-[280px] sm:h-[175px] rounded-lg px-5 py-4 bg-white flex flex-col absolute 
          [backface-visibility:hidden] transition-transform duration-700 top-0 left-0
          [transform:rotateY(-180deg)] overflow-clip`,
          { '[transform:rotateY(0deg)]': isBackFace })}
        >
          <div className='absolute top-5 left-0 w-full h-10 bg-gray' />
          <div className='mt-14 flex items-center'>
            <div className='h-7 w-44 bg-[repeating-linear-gradient(#ffebc5,#ffebc5_3px,#f0d39c_6px)] p-2 flex items-center text-[#333331] font-medium'>
              {cardNameDisplay}
            </div>
            <div className='h-6 bg-[#ffebc5] w-8 flex justify-center items-center font-semibold'>
              {cardCvcDisplay}
            </div>
          </div>
          <div className='absolute w-[18rem] sm:w-[22rem] [transform:rotate(35deg)] left-[-140px] sm:left-[-160px] bottom-[-5px]'>
            <LongYellowLine />
          </div>
          <div className='absolute w-[18rem] sm:w-[22rem] [transform:rotate(35deg)] left-[-110px] sm:left-[-130px] bottom-[-5px]'>
            <LongYellowLine />
          </div>
          <div className='absolute w-[18rem] sm:w-[22rem] [transform:rotate(35deg)] left-[-80px] sm:left-[-100px] bottom-[-5px]'>
            <LongYellowLine />
          </div>
        </div>
      </div>
    </Atropos>
  )
}

/* 

*/