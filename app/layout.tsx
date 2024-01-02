import './global.css'
import React from 'react'
import { rawsonPro } from '@/fonts/fonts'
import type { Metadata } from 'next'
import { Header } from '@/layouts/Header'
import { Footer } from '@/layouts/Footer'
import { Announcement } from '@/components/Announcements/Announcement'

export const metadata: Metadata = {
  title: 'Ribera',
  description: 'Ribera ▪︎ Restobar ▪︎ Delivery'
}

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {

  return (
    <html className='h-full'>
      <body className={`${rawsonPro.variable} font-sans box-border h-full flex flex-col overflow-x-hidden`}>
        <Announcement message='Página web de prueba, ¡No es oficial!' />
        <Header />
        <div className='px-lateral-sm md:px-lateral-md lg:px-lateral'>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
