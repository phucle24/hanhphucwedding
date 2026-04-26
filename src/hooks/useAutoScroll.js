import { useCallback, useRef } from 'react'

export function useAutoScroll() {
  const scrollIntervalRef = useRef(null)
  const isScrollingRef = useRef(false)

  const startAutoScroll = useCallback(() => {
    if (isScrollingRef.current) return
    isScrollingRef.current = true
    
    let lastTime = performance.now()
    const speed = 0.5 // pixels per millisecond - slow and smooth
    
    const scrollStep = (currentTime) => {
      if (!isScrollingRef.current) return
      
      const deltaTime = currentTime - lastTime
      lastTime = currentTime
      
      const scrollAmount = speed * deltaTime
      const currentScroll = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      
      if (currentScroll >= maxScroll) {
        // Reached bottom, stop scrolling
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
    if (scrollIntervalRef.current) {
      cancelAnimationFrame(scrollIntervalRef.current)
      scrollIntervalRef.current = null
    }
  }, [])

  return { startAutoScroll, stopAutoScroll }
}
