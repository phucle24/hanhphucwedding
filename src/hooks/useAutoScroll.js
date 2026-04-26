import { useCallback, useRef, useEffect } from 'react'

export function useAutoScroll() {
  const scrollIntervalRef = useRef(null)
  const isScrollingRef = useRef(false)
  const isPausedRef = useRef(false)

  const startAutoScroll = useCallback(() => {
    if (isScrollingRef.current || isPausedRef.current) return
    isScrollingRef.current = true
    
    let lastTime = performance.now()
    const speed = 0.1 // pixels per millisecond - very slow and smooth
    
    const scrollStep = (currentTime) => {
      if (!isScrollingRef.current) return
      if (isPausedRef.current) {
        lastTime = currentTime
        scrollIntervalRef.current = requestAnimationFrame(scrollStep)
        return
      }
      
      const deltaTime = currentTime - lastTime
      lastTime = currentTime
      
      const scrollAmount = speed * deltaTime
      const currentScroll = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      
      if (currentScroll >= maxScroll) {
        isScrollingRef.current = false
        return
      }
      
      window.scrollTo(0, currentScroll + scrollAmount)
      scrollIntervalRef.current = requestAnimationFrame(scrollStep)
    }
    
    scrollIntervalRef.current = requestAnimationFrame(scrollStep)
  }, [])

  const stopAutoScroll = useCallback(() => {
    isScrollingRef.current = false
    isPausedRef.current = false
    if (scrollIntervalRef.current) {
      cancelAnimationFrame(scrollIntervalRef.current)
      scrollIntervalRef.current = null
    }
  }, [])

  const pauseAutoScroll = useCallback(() => {
    isPausedRef.current = true
  }, [])

  const resumeAutoScroll = useCallback(() => {
    isPausedRef.current = false
  }, [])

  // Auto-pause on click
  useEffect(() => {
    const handleClick = () => {
      if (isScrollingRef.current) {
        isPausedRef.current = true
        // Resume after 3 seconds
        setTimeout(() => {
          isPausedRef.current = false
        }, 3000)
      }
    }

    window.addEventListener('click', handleClick)
    window.addEventListener('touchstart', handleClick)
    
    return () => {
      window.removeEventListener('click', handleClick)
      window.removeEventListener('touchstart', handleClick)
    }
  }, [])

  return { startAutoScroll, stopAutoScroll, pauseAutoScroll, resumeAutoScroll }
}
