'use client'
import React, { useState, forwardRef, useImperativeHandle, DetailedHTMLProps } from 'react'
import { TextInputContext, useTextInput } from './hooks'
import { InputWrapper } from './InputWrapper'
import { cn } from '@/lib/tailwindClassMerge'
import { Icon } from './Icon'
import { EyeButton } from './EyeButton'
import { RightIcons } from './RightIcons'
import { ErrorIcon } from './ErrorIcon'

export interface TextInputProps extends DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  maxLength?: number
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
  type?: 'text' | 'password' | 'email' | 'number'
  autoFocus?: boolean
  showPasswordButton?: boolean
  error?: string | null
  errorDisplay?: 'tooltip' | 'text' | 'bottom' | 'none'
  onEnterKey?: () => void
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const {
    value,
    onChange,
    id,
    label,
    placeholder,
    className,
    name,
    icon,
    autoFocus = false,
    required = false,
    disabled = false,
    showPasswordButton = false,
    type,
    error,
    onEnterKey,
    errorDisplay = 'tooltip',
    wrapperClassName,
    ...rest
  } = props

  const [controlledType, setControlledType] = useState(props.type || 'text')
  const inputRef = React.useRef<HTMLInputElement>(null)
  const textInput = useTextInput({ inputRef, required, showPasswordButton, error, errorDisplay, wrapperClassName, ...props })

  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnterKey && onEnterKey()
    }
  }

  return (
    <TextInputContext.Provider value={textInput}>
      <InputWrapper>
        <Icon icon={icon} />
        <input
          maxLength={props.maxLength}
          type={controlledType}
          name={name}
          id={id}
          onChange={onChange}
          className={cn(`px-3 h-11 border border-slate-200 rounded-xl placeholder:text-slate-400 w-full
            text-[15px] focus-visible:outline-none focus-visible:ring-2 ring-yellow focus-visible:ring-offset-2`,
            { 'pl-10': icon },
            { 'w-full': icon || showPasswordButton },
            { 'disabled:bg-slate-100': disabled },
            { 'ring-2 ring-offset-2 ring-red-500': error },
            className
          )}
          placeholder={placeholder}
          required={required}
          ref={inputRef}
          aria-required={required}
          aria-label={`${label || type || 'text'} input`}
          disabled={disabled}
          autoFocus={autoFocus}
          onKeyDown={handleKeyDown}
          value={value}
          {...rest}
        />
        <RightIcons>
          <EyeButton
            type={controlledType}
            setType={setControlledType}
            showPasswordButton={showPasswordButton}
          />
          <ErrorIcon error={error} errorDisplay={errorDisplay} />
        </RightIcons>
      </InputWrapper>
    </TextInputContext.Provider>
  )
}
)
TextInput.displayName = 'TextInput'
export default TextInput