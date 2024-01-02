'use client'
import React, { useState, useEffect, useCallback } from 'react'

export const useClickComparison = (ref: React.RefObject<HTMLElement>, callback?: () => void) => {
  const [isClicked, setIsClicked] = useState(false)

  const documentClick = useCallback((e: MouseEvent) => {
    if(ref.current && ref.current === e.target) {
      callback && callback()
      return setIsClicked(true)
    }

    setIsClicked(false)
  }, [callback, ref])

  useEffect(() => {
    document.addEventListener('mousedown', documentClick)
    
    return () => {
      document.removeEventListener('mousedown', documentClick)
    }
  }, [documentClick])

  return { isClicked }
}