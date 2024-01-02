'use client'
import type React from 'react'
import { Button, type ButtonProps } from '../Button'
import { useModalContext } from './hooks'

interface CloseButtonProps extends Omit<ButtonProps, 'onClick'> { }

export const CloseButton: React.FC<CloseButtonProps> = ({ variant, className, children, ...rest }) => {
  const { closeFn, setUncontrolledOpen } = useModalContext()
  const buttonVariant = variant ?? 'default'

  const handleCloseModal = () => closeFn?.() || (setUncontrolledOpen(false))

  return (
    <Button className={className} variant={buttonVariant} {...rest} onClick={handleCloseModal}>
      {children}
    </Button>
  )
}
