'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Ring } from '@uiball/loaders'
import { cn } from '@/lib/tailwindClassMerge'
import Link from 'next/link'

const buttonVariants = cva(
  'flex items-center justify-center rounded-[12px] text-[15px] font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none',
  {
    variants: {
      variant: {
        default: 'bg-black text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-light-gray hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-slate-200 hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-[12px] px-[18px]',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'lg'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  loading?: boolean
  asChild?: boolean
  full?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
  type?: 'button' | 'submit' | 'reset' | undefined
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, loading, full, onClick, type = 'button', ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    const spinnerColor = variant === 'default' ? 'white' : 'black'
    const child = !loading ? children : <Ring size={24} color={spinnerColor} />

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (loading) return
      onClick && onClick(e)
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), { 'w-full': full })}
        ref={ref}
        onClick={handleClick}
        type={type}
        {...props}
      >
        {child}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }

export interface LinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
  VariantProps<typeof buttonVariants> {
  loading?: boolean
  asChild?: boolean
  full?: boolean
  link?: string
  href: string
}

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant, size, asChild = false, children, loading, full, href, ...props }, ref) => {
    const child = !loading ? children : <Ring size={24} color='white' />

    return (
      <Link
        className={cn(buttonVariants({ variant, size, className }), { 'w-full': full })}
        ref={ref}
        href={href}
        {...props}
      >
        {child}
      </Link>
    )
  }
)
LinkButton.displayName = 'Button'
