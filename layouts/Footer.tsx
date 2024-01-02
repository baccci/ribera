import Link from 'next/link'
import { InstagramIcon, WhatsappIcon } from '../components/Icons'
import Image from 'next/image'
import Logo from '../components/Logo'
import Balancer from 'react-wrap-balancer'

export const Footer = () => {
  const whatsappURL = new URL('/send/', 'https://api.whatsapp.com/')
  whatsappURL.searchParams.append('phone', '543535626869')
  whatsappURL.searchParams.append('text', 'Hola, me gustaría hacer un pedido 🍽️')

  const whatsappURLString = whatsappURL.toString()

  return (
    <footer className='overflow-hidden min-h-[20rem] mt-auto flex flex-col'>
      <div className='w-full h-full relative'>
        <div className='w-[101%] flex items-end absolute left-0 top-0 z-[-1] bg-cover h-[286px] pt-1'>
          <Image src='/1920-footer.svg' fill className='object-cover' alt='Footer background image.' priority={true}/>
        </div>
        <div className='w-full px-lateral-sm md:px-lateral-md pt-5 lg:px-lateral h-full flex items-center text-sm md:text-base text-ellipsis whitespace-nowrap'>
          <div className='flex justify-between md:justify-normal w-full'>
            <div className='flex flex-col gap-4'>
              <Logo width={undefined} height={undefined} color='white' className='w-[80px] md:w-[100px] md:h-[56px]'/>
              <p className='text-white text-sm md:text-base max-w-xs whitespace-pre-wrap opacity-80'>
                <Balancer>
                  📍 Bulevar Sarmiento 660, Villa María, Córdoba, Argentina.
                </Balancer>
              </p>
            </div>
            <div className='flex justify-end md:justify-evenly md:w-full'>
              <div className='hidden md:block'>
                <p className='text-white font-bold mb-2 text-lg'><Link href={'/productos'}>Productos</Link></p>
                <ul className='text-white opacity-80'>
                  <li>
                    <Link href={'/productos?category=Pizzas'}>Pizzas</Link>
                  </li>
                  <li>
                  <Link href={'/productos?category=Hamburguesas'}>Hamburguesas</Link>
                  </li>
                  <li>
                  <Link href={'/productos?category=Empanadas'}>Empanadas</Link>
                  </li>
                  <li>
                  <Link href={'/productos?category=Bebidas'}>Bebidas</Link>
                  </li>
                </ul>
              </div>
              <div className='hidden lg:block'>
                <p className='text-white font-bold mb-2 text-lg'>Sobre nosotros</p>
                <ul className='text-white opacity-80'>
                  <li>
                    Quienes somos
                  </li>
                  <li>
                    Ribera Pampa
                  </li>
                  <li>
                    Ribera Vivo
                  </li>
                </ul>
              </div>
              <div className='flex flex-col gap-4' >
                <p className='text-white font-bold mb-2 text-lg'>Nuestras redes</p>
                <div className='flex gap-4 justify-end md:justify-normal'>
                  <Link href={'https://www.instagram.com/ribera_bar/'}>
                    <InstagramIcon color='white'/>
                  </Link>
                  <Link href={whatsappURLString} target='_blank'>
                    <WhatsappIcon color='white'/>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full bg-black py-2 flex justify-center items-center'>
        <p className='text-gray3 text-sm px-4 md:text-base'>
          © Todos los derechos pertenecen a Ribera | Página no oficial.
        </p>
      </div>
    </footer>
  )
}
