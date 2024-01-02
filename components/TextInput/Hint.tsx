import { cn } from '@/lib/tailwindClassMerge'
import { useTextInputContext } from './hooks'

export const Hint = () => {
  const { hint, hintClassName, error, errorDisplay } = useTextInputContext()

  if (!hint && errorDisplay !== 'bottom') return null
  if (errorDisplay === 'bottom' && !error) return null

  return (
    <div className={cn('text-slate-500 text-[13px] flex gap-2', hintClassName)}>
      {hint}
      <span className={cn('text-red-500')}>* {error}</span>
    </div>
  )
}