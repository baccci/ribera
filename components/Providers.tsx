import React from 'react'
import { Provider as TextBalancerProvider } from 'react-wrap-balancer'

interface ProvicersProps {
  children: React.ReactNode
}

export const Providers: React.FC<ProvicersProps> = ({ children }) => {
  return (
    <TextBalancerProvider>
      {children}
    </TextBalancerProvider>
  )
}
