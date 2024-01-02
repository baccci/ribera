import { LinkButton } from '@/components/Button'
import Image from 'next/image'
import Balancer from 'react-wrap-balancer'

export default function Page() {
  return (
    <main className='flex justify-between mb-28 md:mt-24'>
      <div className='z-[2]'>
        <div className='rounded-[1.375rem] bg-light-yellow text-yellow text-sm md:text-base font-medium px-5 py-1 text w-fit'>
          ¡Envios gratis en zonas elegidas!
        </div>
        <h1 className='text-4xl md:text-5xl text-gray leading-8 md:leading-[48px] font-extrabold max-w-2xl mt-7 md:mt-10 mb-4'>
          <Balancer>
            La vida es mejor con un buen plato y buena compañía.
          </Balancer>
          ¡Todo está bien!
        </h1>
        <p className='text-gray2 max-w-lg'>
          <Balancer>
            <em>Almuerzos, menús ejecutivos, after office, cenas.</em> De lunes a viernes
            de 8:30 a 12:30 y de 16:30 a 23:30.
            Sábados de 16:30 a 01:00.
          </Balancer>
        </p>
        <div className='mt-16 md:mt-20'>
          <LinkButton href='/productos' className='bg-yellow text-white font-bold text-xl md:w-fit py-7 px-6 flex hover:opacity-90 hover:bg-yellow transition-all duration-200'>
            Ordená tu pedido
          </LinkButton>
        </div>
      </div>
      <aside className='hidden xl:block'>
        <div className='relative'>
          <Image src="/mark.svg" alt="salmon pattern" className='absolute top-4 left-4' width={430} height={430} unoptimized />
          <Image src="/pattern-min.png" alt="salmon pattern" className='rounded-xl' width={464} height={464} unoptimized />
          <div className='absolute bottom-0 left-[38%] translate-x-[-50%] flex'>
            <Image src={'/waitress2.webp'} height={500} width={749} className='min-w-[749px]' unoptimized alt='Waitress holding a pizza.' />
          </div>
        </div>
      </aside>
    </main>
  )
}