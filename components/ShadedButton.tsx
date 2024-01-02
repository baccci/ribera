
import React from 'react'
import { Button, ButtonProps, LinkButton, LinkButtonProps } from './Button'
import { cn } from '@/lib/tailwindClassMerge'

interface ShadedButtonProps extends ButtonProps {
  shadowClassName?: string
}

const ShadedButton: React.FC<ShadedButtonProps> = ({ shadowClassName, className, children, ...buttonProps }) => {
  return (
    <Button className={cn('group relative flex items-center hover:bg-yellow rounded-xl bg-yellow py-6 w-full overflow-hidden', className)} {...buttonProps}>
      <div className={cn('absolute bottom-0 left-1/2 h-2/5 w-4/5 -translate-x-1/2 rounded-full bg-yellow-foreground blur-md mix-blend-color-burn opacity-70', shadowClassName)} />
      <div className='z-[1]'>
        {children}
      </div>
    </Button>
  )
}

export default ShadedButton

interface LinkShadedButtonProps extends LinkButtonProps {
  shadowClassName?: string
  href: string
}

export const LinkShadedButton: React.FC<LinkShadedButtonProps> = ({ shadowClassName, className, children, href, ...buttonProps }) => {
  return (
    <LinkButton href={href} className={cn('group relative flex items-center hover:bg-yellow rounded-xl bg-yellow py-6 w-full overflow-hidden', className)} {...buttonProps}>
      <div className={cn('z-[0] absolute bottom-0 left-1/2 h-2/5 w-4/5 -translate-x-1/2 rounded-full bg-yellow-foreground blur-md mix-blend-color-burn opacity-70', shadowClassName)} />
      <div className='z-[1]'>
        {children}
      </div>
    </LinkButton>
  )
}
