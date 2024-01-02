'use client'
import React, { useEffect } from 'react'

interface UseTextInputArgs {
  value?: string
  name?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  id?: string
  label?: string
  placeholder?: string
  className?: string
  labelClassName?: string
  hint?: string
  hintClassName?: string
  wrapperClassName?: string
  disabled?: boolean
  icon?: React.ReactNode
  required?: boolean
  showPasswordButton: boolean
  error?: string | null
  errorDisplay?: 'tooltip' | 'text' | 'bottom' | 'none'
  inputRef: React.RefObject<HTMLInputElement>
}

export const useTextInput = (args: UseTextInputArgs) => {

  function focus() {
    args.inputRef.current?.focus()
  }

  return { focus, ...args }
}

type TextInputContextType = ReturnType<typeof useTextInput>

export const TextInputContext = React.createContext<TextInputContextType | null>(null)

export const useTextInputContext = () => {
  const context = React.useContext(TextInputContext)

  if (!context) {
    throw new Error('useTextInputContext must be used within a TextInputProvider')
  }

  return context
}

export const useAutoFocus = (autoFocus: boolean, ref: React.RefObject<HTMLInputElement>) => {
  useEffect(() => {
    if (autoFocus) ref.current?.focus()
  }, [autoFocus, ref])
}