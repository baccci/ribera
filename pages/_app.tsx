import '../styles/globals.css'
import 'styles/font-faces.css'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import useShop from 'store/old-shopStore'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { cleanShop } = useShop((state: any) => state)

  useEffect(() => {
    if(router.pathname !== '/order') {
      cleanShop()
    }
  }, [router.pathname, cleanShop])
  
  return <Component {...pageProps} />
}
