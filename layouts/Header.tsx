import Link from 'next/link'
import Logo from '@components/Logo'
import { YellowLine } from '../components/Icons'
import { CartButton } from '../components/CartButton/CartButton'
import { Button } from '../components/Button'
import { IconMenu2 } from '@tabler/icons-react'
import { Sheet, SheetContent, SheetTrigger } from '../components/Sheet'

export const Header = () => {
  return (
    <header className='flex py-6 md:py-[2.125rem] px-lateral-sm md:px-lateral-md lg:px-lateral justify-between items-center mb-10 md:mb-[3.125rem] text-yellow relative'>
      <div className='absolute top-0 left-[50%] translate-x-[-50%] max-w-[30%] flex justify-center pt-9'>
        <div className='relative top-4 hidden xl:block '>
          <nav className='flex gap-[3.125rem] font-semibold text-gray mb-[0.625rem] justify-between'>
            <Link href='/' className='focus-visible:underline focus-visible:outline-none decoration-wavy decoration-yellow underline-offset-2 decoration-2'>
              Home
            </Link>
            <Link href='/productos' className='focus-visible:underline focus-visible:outline-none decoration-wavy decoration-yellow underline-offset-2 decoration-2'>
              Productos
            </Link>
            <Link href='/' className='focus-visible:underline focus-visible:outline-none decoration-wavy decoration-yellow underline-offset-2 decoration-2'>
              Envíos
            </Link>
            <Link href='/' className='focus-visible:underline focus-visible:outline-none decoration-wavy decoration-yellow underline-offset-2 decoration-2'>
              Sobre Nosotros
            </Link>
          </nav>
          <div className='w-[90%]'>
            <YellowLine />
          </div>
        </div>
      </div>
      <Logo width={undefined} height={undefined} className='w-[80px] md:w-[100px] md:h-[56px] z-10' />
      <div className='flex gap-6 md:gap-[2.125rem] items-center'>
        <CartButton />
        <Button className='hidden md:block'>
          Sign In
        </Button>
        <Sheet >
          <SheetTrigger aria-label='Open menu'>
            <IconMenu2 className='xl:hidden text-gray cursor-pointer' size={28} />
          </SheetTrigger>
          <SheetContent className='border-l-0 flex flex-col justify-between'>
            <Logo color='var(--yellow)' className='mb-4' />
            <ul className='text-xl flex flex-col gap-4'>
              <li>
                {/* sheet anchors must be normal anchors to force site reload */}
                {/* otherwise, the page will load but sheet won't close */}
                <a href={'/'} >Home</a>
              </li>
              <li>
                <a href={'/productos'}>Productos</a>
              </li>
              <li>
                Envíos
              </li>
              <li>
                Sobre Nosotros
              </li>
            </ul>
            <Button className='mt-auto w-full block xl:hidden'>
              Sign In
            </Button>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
