import { useState, useEffect } from 'react'
import { UseDeviceDetectionReturn } from '@/types'
import { UI_CONSTANTS } from '@/utils/constants'

/**
 * Custom hook for device detection and responsive behavior
 * Provides real-time device type detection and window size information
 */
export function useDeviceDetection(): UseDeviceDetectionReturn {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth
      
      const mobile = width < UI_CONSTANTS.MOBILE_BREAKPOINT
      const tablet = width >= UI_CONSTANTS.MOBILE_BREAKPOINT && width < UI_CONSTANTS.TABLET_BREAKPOINT
      const desktop = width >= UI_CONSTANTS.TABLET_BREAKPOINT

      setIsMobile(mobile)
      setIsTablet(tablet)
      setIsDesktop(desktop)
    }

    // Check on mount
    checkDeviceType()

    // Add event listener for window resize
    window.addEventListener('resize', checkDeviceType)

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkDeviceType)
    }
  }, [])

  return {
    isMobile,
    isTablet,
    isDesktop
  }
}

/**
 * Custom hook for window dimensions
 * Provides real-time window width and height
 */
export function useWindowDimensions() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return dimensions
}

/**
 * Custom hook for scroll position
 * Provides real-time scroll position information
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState({
    x: window.scrollX,
    y: window.scrollY
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY
      })
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return scrollPosition
}

/**
 * Custom hook for element visibility
 * Detects if an element is visible in the viewport
 */
export function useElementVisibility(ref: React.RefObject<HTMLElement>) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.1
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref])

  return isVisible
}

/**
 * Custom hook for touch device detection
 * Detects if the device supports touch input
 */
export function useTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    const checkTouchDevice = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      setIsTouchDevice(isTouch)
    }

    checkTouchDevice()
  }, [])

  return isTouchDevice
}

/**
 * Custom hook for orientation detection
 * Detects device orientation (portrait/landscape)
 */
export function useOrientation() {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
  )

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(
        window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
      )
    }

    window.addEventListener('resize', handleOrientationChange)
    window.addEventListener('orientationchange', handleOrientationChange)

    return () => {
      window.removeEventListener('resize', handleOrientationChange)
      window.removeEventListener('orientationchange', handleOrientationChange)
    }
  }, [])

  return orientation
}

/**
 * Custom hook for reduced motion preference
 * Detects if user prefers reduced motion
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return prefersReducedMotion
}

/**
 * Custom hook for dark mode preference
 * Detects if user prefers dark mode
 */
export function useDarkModePreference() {
  const [prefersDarkMode, setPrefersDarkMode] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersDarkMode(e.matches)
    }

    setPrefersDarkMode(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return prefersDarkMode
}

/**
 * Custom hook for network status
 * Detects online/offline status
 */
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOnline
}
