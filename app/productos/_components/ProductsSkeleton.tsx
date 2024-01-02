import { Skeleton } from '@/components/Skeleton'

export const ProductsSkeleton = () => {
  const skeletons = Array.from({ length: 8 }, (_, i) => i)
  return (
    <section className='grid grid-cols-1 md:grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] lg:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-2 md:gap-8 grid-flow-row mt-7 mb-20 md:mb-32'>
      {skeletons?.map((_, index) => {
        return <Skeleton key={index} className='w-full rounded-xl h-[320px]' />
      })}
    </section>
  )
}
