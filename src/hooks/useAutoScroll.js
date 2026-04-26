import { useCallback, useRef, useEffect, useState } from 'react'

export function useAutoScroll() {
  const scrollIntervalRef = useRef(null)
  const isScrollingRef = useRef(false)
  const userInteractedRef = useRef(false)
  const [isAutoScrolling, setIsAutoScrolling] = useState(false)

  const startAutoScroll = useCallback(() => {
    // Don't start if user has already manually scrolled
    if (isScrollingRef.current || userInteractedRef.current) return
    
    isScrollingRef.current = true
    setIsAutoScrolling(true)
    
    let scrollY = window.scrollY
    const speed = 0.8 // pixels per frame - smooth for mobile
    
    const scrollStep = () => {
      if (!isScrollingRef.current || userInteractedRef.current) return
      
      scrollY += speed
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      
      if (scrollY >= maxScroll) {
        isScrollingRef.current = false
        setIsAutoScrolling(false)
        return
      }
      
      window.scrollTo(0, scrollY)
      scrollIntervalRef.current = requestAnimationFrame(scrollStep)
    }
    
    scrollIntervalRef.current = requestAnimationFrame(scrollStep)
  }, [])

  const stopAutoScroll = useCallback(() => {
    isScrollingRef.current = false
    setIsAutoScrolling(false)
    userInteractedRef.current = true // Mark that user took control
    if (scrollIntervalRef.current) {
      cancelAnimationFrame(scrollIntervalRef.current)
      scrollIntervalRef.current = null
    }
  }, [])

  // Detect user manual scroll/touch - stop auto-scroll permanently
  useEffect(() => {
    const handleUserScroll = () => {
      if (isScrollingRef.current) {
        // User is manually scrolling, stop auto-scroll
        stopAutoScroll()
      }
    }

    // Desktop: wheel event
    window.addEventListener('wheel', handleUserScroll, { passive: true })
    
    // Mobile: touch move (scrolling)
    window.addEventListener('touchmove', handleUserScroll, { passive: true })
    
    // Click also stops auto-scroll
    window.addEventListener('click', handleUserScroll, { passive: true })
    
    return () => {
      window.removeEventListener('wheel', handleUserScroll)
      window.removeEventListener('touchmove', handleUserScroll)
      window.removeEventListener('click', handleUserScroll)
    }
  }, [stopAutoScroll])

  // Cleanup
  useEffect(() => {
    return () => {
      if (scrollIntervalRef.current) {
        cancelAnimationFrame(scrollIntervalRef.current)
      }
    }
  }, [])

  return { startAutoScroll, stopAutoScroll, isAutoScrolling }
}
