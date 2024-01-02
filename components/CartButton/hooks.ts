import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useClientCart } from '@/hooks/clientCartStore'

// In order to avoid hydration mismatch 
// when listening to the store in a component,
// is needed to use a separate state
// and listen for updates from the store

export const useCartButton = () => {
  const pathname = usePathname()
  const { quantifiedItems, quantity } = useClientCart()

  const emptyCart = quantifiedItems?.length === 0

  return { items: quantifiedItems, emptyCart, total: quantity, pathname }
}

type Cart = ReturnType<typeof useCartButton> | null

export const CartButtonContext = React.createContext<Cart>(null)

export const useCartButtonContext = () => {
  const context = React.useContext(CartButtonContext)

  if (!context) {
    throw new Error('useCartButtonContext must be used within a CartButtonProvider')
  }

  return context
}

export const useDocumentScroll = (enableScroll: boolean) => {

  useEffect(() => {
    if (typeof document === 'undefined') return

    if (enableScroll) {
      document.body.style.overflow = 'auto'
      return
    }

    document.body.style.overflow = 'hidden'
  }, [enableScroll])
}