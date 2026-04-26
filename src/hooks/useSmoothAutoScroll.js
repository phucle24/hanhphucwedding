import { useCallback, useRef, useEffect, useState } from 'react'

export function useSmoothAutoScroll() {
  const containerRef = useRef(null)
  const animationRef = useRef(null)
  const isScrollingRef = useRef(false)
  const isPausedRef = useRef(false)
  const scrollYRef = useRef(0)
  const [isScrolling, setIsScrolling] = useState(false)

  const startAutoScroll = useCallback(() => {
    if (isScrollingRef.current || !containerRef.current) return
    
    isScrollingRef.current = true
    setIsScrolling(true)
    scrollYRef.current = window.scrollY
    
    const speed = 0.4 // pixels per frame - smooth and gentle
    let lastTime = performance.now()
    
    const scrollStep = (currentTime) => {
      if (!isScrollingRef.current) return
      
      if (isPausedRef.current) {
        lastTime = currentTime
        animationRef.current = requestAnimationFrame(scrollStep)
        return
      }
      
      const deltaTime = currentTime - lastTime
      lastTime = currentTime
      
      // Smooth scroll calculation
      const scrollAmount = speed * (deltaTime / 16) // Normalize to 60fps
      scrollYRef.current += scrollAmount
      
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      
      if (scrollYRef.current >= maxScroll) {
        isScrollingRef.current = false
        setIsScrolling(false)
        return
      }
      
      // Smooth scroll with CSS scroll-behavior
      window.scrollTo({ top: scrollYRef.current, behavior: 'smooth' })
      
      animationRef.current = requestAnimationFrame(scrollStep)
    }
    
    animationRef.current = requestAnimationFrame(scrollStep)
  }, [])

  const stopAutoScroll = useCallback(() => {
    isScrollingRef.current = false
    isPausedRef.current = false
    setIsScrolling(false)
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
  }, [])

  const pauseAutoScroll = useCallback(() => {
    isPausedRef.current = true
  }, [])

  const resumeAutoScroll = useCallback(() => {
    isPausedRef.current = false
  }, [])

  // Pause on user interaction - mobile optimized
  useEffect(() => {
    let resumeTimeout = null
    
    const handleInteraction = () => {
      if (isScrollingRef.current) {
        isPausedRef.current = true
        clearTimeout(resumeTimeout)
        // Resume after 2 seconds
        resumeTimeout = setTimeout(() => {
          isPausedRef.current = false
        }, 2000)
      }
    }

    // Passive listeners for better mobile performance
    window.addEventListener('touchstart', handleInteraction, { passive: true })
    window.addEventListener('click', handleInteraction, { passive: true })
    window.addEventListener('wheel', handleInteraction, { passive: true })
    
    return () => {
      window.removeEventListener('touchstart', handleInteraction)
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('wheel', handleInteraction)
      clearTimeout(resumeTimeout)
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return { 
    containerRef, 
    startAutoScroll, 
    stopAutoScroll, 
    pauseAutoScroll, 
    resumeAutoScroll,
    isScrolling 
  }
}

// Hook for scroll reveal animations
export function useScrollReveal() {
  const [visibleElements, setVisibleElements] = useState(new Set())
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.dataset.reveal]))
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    )
    
    const elements = document.querySelectorAll('[data-reveal]')
    elements.forEach((el) => observer.observe(el))
    
    return () => observer.disconnect()
  }, [])
  
  return { isVisible: (id) => visibleElements.has(id) }
}
