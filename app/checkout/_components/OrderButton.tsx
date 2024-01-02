import { Button } from '@/components/Button'
import { IconChevronRight } from '@tabler/icons-react'
import React, { useRef } from 'react'

export const OrderButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const x = (e.clientX - rect.left) * 100 / button.clientWidth
    const y = (e.clientY - rect.top) * 100 / button.clientHeight

    button.style.setProperty('--mouse-x', `${x}`)
    button.style.setProperty('--mouse-y', `${y}`)
  }

  return (
    <Button
      ref={buttonRef}
      onMouseMove={handleButtonHover}
      className={`[background-size:_200%_200%] [background-position:calc((100_-_var(--mouse-x,0))*1%)] hover:[background-image:radial-gradient(circle_at_center,var(--yellow-foreground)_0%,var(--yellow)_40%,var(--yellow)_100%)] 
      group relative flex items-center hover:bg-yellow rounded-xl bg-yellow py-6 transition w-full overflow-hidden`
      }
      type='submit'
    >

      <div className="absolute bottom-0 left-1/2 h-2/5 w-4/5 -translate-x-1/2 rounded-full bg-yellow-foreground blur-md mix-blend-color-burn opacity-70" />

      <span className="relative mt-px text-white text-lg font-bold transition-all duration-200 flex items-center group-hover:text-[19px]">
        Confirmar compra <IconChevronRight size={14} className='relative top-0.5 left-1' stroke={3} />
      </span>
    </Button>
  )
}
