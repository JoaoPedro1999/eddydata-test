/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState } from 'react'

export type Devices = 'mobile' | 'tablet' | 'desktop' | 'wide' | 'ultraWide'

export const useDevice = () => {
  const [device, setDevice] = useState<Devices | undefined>(() => {
    if (typeof window !== 'undefined') {
      const { innerWidth } = window
      if (innerWidth < 768) {
        return 'mobile'
      }
      if (innerWidth < 1023) {
        return 'tablet'
      }
      if (innerWidth < 1280) {
        return 'desktop'
      }
      if (innerWidth < 1466) {
        return 'wide'
      }
      if (innerWidth >= 1466) {
        return 'ultraWide'
      }
      return undefined
    }
  })

  const [windowSize, setWindowSize] = useState<{
    width?: number
    height?: number
  }>({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })

      const { innerWidth } = window

      if (innerWidth < 768) {
        setDevice('mobile')
      } else if (innerWidth < 1023) {
        setDevice('tablet')
      } else if (innerWidth < 1280) {
        setDevice('desktop')
      } else if (innerWidth < 1466) {
        setDevice('wide')
      } else if (innerWidth >= 1466) {
        setDevice('ultraWide')
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { windowSize, device }
}
