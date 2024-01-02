'use client'
import { cn } from '@lib/tailwindClassMerge'
import React from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

interface CategoryTagProps {
  tagName: string
  icon: React.ReactNode
}

export const CategoryTag: React.FC<CategoryTagProps> = ({ tagName, icon }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // if category matches the current category in the url, or if the category is 'todo' and there is no category in the url
  // - Todo means 'all' in this case
  const currentCategory = searchParams?.get('category')?.toLocaleLowerCase()
  const isCategoryMatch = currentCategory === tagName.toLocaleLowerCase()
  const isTodoCategory = tagName.toLocaleLowerCase() === 'todo' && !searchParams?.get('category')
  const selected = isCategoryMatch || isTodoCategory

  const handleClick = () => {
    const current = new URLSearchParams(Array.from(searchParams?.entries() || []))
    current.set('category', tagName)
    router.push(pathname + '?' + current.toString())
  }

  return (
    <button className={cn(
      `px-3 py-1 cursor-pointer
      rounded-2xl  bg-light-gray
       hover:bg-[#eeeeee] transition-colors 
       duration-200 relative group`,
      { 'bg-light-yellow hover:bg-[rgba(255, 243, 217, .9)]': selected }
    )}
      onClick={handleClick}
    >
      <div className='z-[0] absolute top-0 left-0 size-full overflow-hidden rounded-2xl mix-blend-color-burn'>
        <div className={cn('z-[0] absolute bottom-0 left-1/2 h-2/5 w-4/5 -translate-x-1/2 rounded-full bg-slate-700 blur-md opacity-70 group-hover:h-2/4 transition-all duration-200',
          { 'bg-yellow-300 mix-blend-lighten group-hover:bg-yellow-foreground group-hover:h-2/4': selected }
        )} />
      </div>

      <div className='z-[1] flex items-center gap-2'>
        {icon}
        <span className={cn('text-black text-[15px] font-bold z-[1]', { 'text-yellow ': selected })}>
          {tagName}
        </span>
      </div>
    </button>
  )
}

/*

z-[0] absolute bottom-0 left-1/2 h-2/5 w-4/5 -translate-x-1/2 group-hover:h-2/4

<div class="z-[0] absolute top-0 left-0 size-full overflow-hidden"><div class="absolute h-2/5 w-4/5 rounded-full size-full bg-slate-700 blur-md mix-blend-color-burn opacity-70 group-hover:h-2/4 transition-all duration-200"></div></div>

 <div className='flex items-center overflow-hidden size-full gap-2 [transform:translate3d(0,0,0)]'>
        <div className={cn('z-[0] absolute bottom-0 left-1/2 h-2/5 w-4/5 -translate-x-1/2 rounded-full bg-slate-700 blur-md mix-blend-color-burn opacity-70 group-hover:h-2/4 transition-all duration-200',
          { 'bg-yellow-300 mix-blend-lighten group-hover:bg-yellow-foreground group-hover:h-2/4': selected }
        )} />
        {icon}
        <span className={cn('text-black text-[15px] font-bold z-[1]', { 'text-yellow ': selected })}>
          {tagName}
        </span>
      </div>

*/