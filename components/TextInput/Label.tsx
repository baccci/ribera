'use client'
import { cn } from '@/lib/tailwindClassMerge'
import { useTextInputContext } from './hooks'

export const Label = () => {
  const { id, label, labelClassName, required, error, errorDisplay } = useTextInputContext()
  const returnNull = !label || !id

  const errorMessage = error && errorDisplay === 'text' ? error : null

  if (returnNull) return null
  return (
    <label htmlFor={id} className={cn('text-[15px] cursor-pointer w-fit', labelClassName)}>
      {label}
      {required && <span className='text-red-500 ml-1'>*</span>}
      {errorMessage && <span className='text-red-500 ml-1'>{errorMessage}</span>}
    </label>
  )
}