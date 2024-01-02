import { useCallback, useEffect, useRef } from 'react'

export function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  zIndex: 4
}

export function getAnimationSettings(originXA: number, originXB: number) {
  return {
    startVelocity: 20,
    spread: 300,
    ticks: 200,
    zIndex: 0,
    particleCount: 150,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.2
    }
  }
}

export function useConfetti() {
  const refAnimationInstance = useRef<unknown>(null)

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current && typeof refAnimationInstance.current === 'function') {
      refAnimationInstance.current(getAnimationSettings(0.3, 0.6))
      refAnimationInstance.current(getAnimationSettings(0.7, 0.9))
    }
  }, [refAnimationInstance])

  useEffect(() => {
    const timeout = setTimeout(() => {
      nextTickAnimation()
    }, 1000)
    return () => clearTimeout(timeout)
  }, [nextTickAnimation])

  const getInstance = useCallback((instance: unknown) => {
    refAnimationInstance.current = instance
  }, [])

  return getInstance
}
