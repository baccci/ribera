import React from 'react'
import { useModalContext } from './hooks'
import { XButton } from '../XButton'
import { cn } from '@/lib/tailwindClassMerge'
import { Balancer } from '../Balancer'

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> { 
  children: React.ReactNode, 
  className?: string,
  balanceText?: boolean
  [key: string]: any 
}

export const Header = ({ children, className, balanceText, ...other }: HeaderProps) => {
  const { closeButton, closeFn, headerId, setUncontrolledOpen, usingIcon } = useModalContext()

  const closeFunction = () => closeFn || (() => setUncontrolledOpen(false))

  return (
    <div className={cn('mb-2 sm:mb-2 text-2xl text-primary flex justify-between items-center font-bold', className)} id={`ribera-header${headerId}`} {...other}>
      <Balancer balance={balanceText}>
        {children}
      </Balancer>
      <div className='relative cursor-pointer flex items-center'>
        <CloseButton show={closeButton} fn={closeFunction()} icon={usingIcon}/>
      </div>
    </div>
  )
}
Header.displayName = 'Header'

interface CloseButtonProps {
  show?: boolean
  fn: () => void
  icon?: boolean
}

const CloseButton: React.FC<CloseButtonProps> = ({ show, fn, icon }) => {

  if(!show || icon) return null
  return <XButton func={fn} className='cursor-pointer'/>
}