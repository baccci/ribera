import localFont from 'next/font/local'

export const rawsonPro = localFont({
  src: [
    {
      path: './rawsonPro/RawsonPro-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './rawsonPro/RawsonPro-RegularIt.woff2',
      weight: '400',
      style: 'italic'
    },
    {
      path: './rawsonPro/RawsonPro-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './rawsonPro/RawsonPro-MediumIt.woff2',
      weight: '500',
      style: 'italic'
    },
    {
      path: './rawsonPro/RawsonPro-SemiBold.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: './rawsonPro/RawsonPro-SemiBoldIt.woff2',
      weight: '600',
      style: 'italic'
    },
    {
      path: './rawsonPro/RawsonPro-Bold.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: './rawsonPro/RawsonPro-BoldIt.woff2',
      weight: '700',
      style: 'italic'
    }
  ],
  variable: '--font-rawson-pro'
})