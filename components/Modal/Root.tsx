import React from 'react'

interface FocusTrapProps {
  children?: React.ReactNode
  disableFocusTrap?: boolean
}

interface TrapProps {
  children?: React.ReactNode
}

export const Trap: React.FC<TrapProps> = ({ children }) => {
  const rootRef = React.useRef<HTMLDivElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Tab') {
      const rootElement = rootRef.current
      if (rootElement) {
        const filter = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        const focusableElements = rootElement.querySelectorAll<HTMLElement>(filter)
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]
        if (e.target === lastElement && !e.shiftKey) {
          e.preventDefault()
          firstElement.focus()
        } else if (e.target === firstElement && e.shiftKey) {
          e.preventDefault()
          lastElement.focus()
        }
      }
    }
  }

  React.useEffect(() => {
    const rootElement = rootRef.current
    if (rootElement) {
      const focusableElements = rootElement.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      if (firstElement) {
        firstElement.focus()
      }
      return () => {
        if (lastElement) {
          lastElement.blur()
        }
      }
    }
  }, [])

  return (
    <div ref={rootRef} onKeyDown={handleKeyDown} tabIndex={0}>
      {children}
    </div>
  )
}

export const FocusTrap: React.FC<FocusTrapProps> = ({ children, disableFocusTrap }) => {
  if (disableFocusTrap) {
    return <>{children}</>
  }
  return <Trap>{children}</Trap>
}