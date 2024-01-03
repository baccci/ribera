'use client'
import React from 'react'
import { LensIcon } from '@components/Icons'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const SearchInput: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [search, setSearch] = React.useState(searchParams?.get('search') || '')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleClick = () => {
    const inputText = inputRef.current?.value || ''
    handleSearch(inputText)
  }

  const handleEnterDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(e.currentTarget.value)
    }
  }

  const handleSearch = (searchString: string) => {
    const current = new URLSearchParams(Array.from(searchParams?.entries() || []))

    current.set('search', searchString)
    router.push(pathname + '?' + current.toString())
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <div className='max-w-sm w-full relative'>
      <input
        type='text'
        className={`px-4 w-full py-3 bg-light-gray2 rounded-xl hover:bg-light-gray focus-visible:ring-yellow focus-visible:outline-none placeholder:text-ellipsis
          transition-colors duration-200 placeholder:text-gray2 placeholder:font-medium focus-visible:ring-2 focus-visible:ring-offset-2`}
        placeholder='Escribí para buscar algun producto'
        onKeyDown={handleEnterDown}
        ref={inputRef}
        value={search}
        onChange={handleSearchChange}
      />
      <div
        className='absolute right-4 top-0 h-full flex items-center text-gray2'
        onClick={handleClick}
      >
        <LensIcon size={16} className='cursor-pointer' />
      </div>
    </div>
  )
}
