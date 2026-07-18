import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bus } from 'lucide-react'
import EnvelopeHero from './components/EnvelopeHero'
import Invitation3DCard from './components/Invitation3DCard'
import WeddingDetails from './components/WeddingDetails'
import WeddingTimeline from './components/WeddingTimeline'
import OurStory from './components/OurStory'
import Gallery from './components/Gallery'
import WishesSection from './components/WishesSection'
import CountdownSection from './components/Countdown'
import ThankYouFooter from './components/ThankYouFooter'
import FloatingPetals from './components/FloatingPetals'
import MusicPlayer from './components/MusicPlayer'
import LinkGenerator from './components/LinkGenerator'
import { getInvitationParam } from './utils/invitationUrl'

function FlowerConfetti() {
  const [petals, setPetals] = useState([])

  useEffect(() => {
    // Generate 45 flower petals blasting from the center
    const items = Array.from({ length: 45 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2
      const distance = 100 + Math.random() * 320
      const duration = 2.5 + Math.random() * 2
      const emoji = ['🌸', '🌺', '🌹', '💮', '🌼', '💖'][Math.floor(Math.random() * 6)]
      
      return {
        id: i,
        emoji,
        xEnd: Math.cos(angle) * distance,
        yEnd: Math.sin(angle) * distance - (120 + Math.random() * 200), // explode and drift downwards
        scale: 0.5 + Math.random() * 1.2,
        rotateStart: Math.random() * 360,
        rotateEnd: Math.random() * 360 + 360,
        duration,
        delay: Math.random() * 0.4
      }
    })
    setPetals(items)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden flex items-center justify-center">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0, rotate: p.rotateStart }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: p.scale,
            x: p.xEnd,
            y: p.yEnd,
            rotate: p.rotateEnd
          }}
          transition={{ 
            duration: p.duration, 
            delay: p.delay,
            ease: [0.1, 0.8, 0.3, 1] 
          }}
          className="absolute text-2xl select-none"
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  )
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener('popstate', handleLocationChange)
    return () => window.removeEventListener('popstate', handleLocationChange)
  }, [])

  // Check if accessing the generator dashboard
  if (currentPath === '/danh-sach' || currentPath === '/admin') {
    return <LinkGenerator />
  }

  // Parse URL query parameters for personalization
  const searchParams = new URLSearchParams(window.location.search)
  const guestName = getInvitationParam(searchParams, 'g', 'to')
  const rawSide = getInvitationParam(searchParams, 's', 'side')
  const side = rawSide === 't' ? 'trai' : rawSide === 'g' ? 'gai' : rawSide // support 't', 'g', 'trai', 'gai'

  const [showCover, setShowCover] = useState(!!guestName)
  const [showConfetti, setShowConfetti] = useState(false)

  // Block scroll on body when invitation card is presented (unopened)
  useEffect(() => {
    if (showCover) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [showCover])

  // Clear confetti after 5 seconds
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showConfetti])

  // Gentle auto scroll-down effect after cover is opened (stops on user interaction, restarts on idle)
  useEffect(() => {
    if (showCover) return // Wait until cover is opened

    let scrollTimeout = null
    let animationFrameId = null
    let lastTime = null
    let accumulator = 0

    const startAutoScroll = () => {
      if (animationFrameId) return
      
      // Temporarily disable smooth scroll behavior for instant frame updates
      document.documentElement.style.scrollBehavior = 'auto'
      
      lastTime = performance.now()
      accumulator = 0

      const scrollStep = (time) => {
        if (!lastTime) {
          lastTime = time
        }
        const deltaTime = time - lastTime
        lastTime = time

        // Speed: 0.035 pixels per millisecond = ~35 pixels per second (extremely gentle & smooth)
        const speed = 0.035
        accumulator += speed * deltaTime

        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        if (window.scrollY >= maxScroll - 1) {
          // Reached bottom, stop auto-scrolling
          document.documentElement.style.scrollBehavior = ''
          animationFrameId = null
          return
        }

        const pixelsToScroll = Math.floor(accumulator)
        if (pixelsToScroll > 0) {
          accumulator -= pixelsToScroll
          window.scrollBy(0, pixelsToScroll)
        }

        animationFrameId = requestAnimationFrame(scrollStep)
      }

      animationFrameId = requestAnimationFrame(scrollStep)
    }

    const handleUserInteraction = () => {
      // Restore smooth scroll behavior
      document.documentElement.style.scrollBehavior = ''

      // 1. Cancel the active auto scroll frame
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = null
      }

      // 2. Clear any pending timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }

      // 3. Restart the idle timer to resume auto-scrolling after 3 seconds of inactivity
      scrollTimeout = setTimeout(() => {
        startAutoScroll()
      }, 3000)
    }

    const addListeners = () => {
      window.addEventListener('wheel', handleUserInteraction, { passive: true })
      window.addEventListener('touchstart', handleUserInteraction, { passive: true })
      window.addEventListener('touchmove', handleUserInteraction, { passive: true })
      window.addEventListener('mousedown', handleUserInteraction, { passive: true })
      window.addEventListener('keydown', handleUserInteraction, { passive: true })
    }

    const removeListeners = () => {
      window.removeEventListener('wheel', handleUserInteraction)
      window.removeEventListener('touchstart', handleUserInteraction)
      window.removeEventListener('touchmove', handleUserInteraction)
      window.removeEventListener('mousedown', handleUserInteraction)
      window.removeEventListener('keydown', handleUserInteraction)
    }

    addListeners()
    
    // Initial delay of 3 seconds before auto-scrolling starts after opening cover or page load
    scrollTimeout = setTimeout(() => {
      startAutoScroll()
    }, 3000)

    return () => {
      document.documentElement.style.scrollBehavior = ''
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      removeListeners()
    }
  }, [showCover])

  const handleOpenCover = () => {
    setShowCover(false)
    setShowConfetti(true)
  }

  return (
    <>
      <AnimatePresence>
        {showCover && (
          <EnvelopeHero 
            guestName={guestName} 
            onOpen={handleOpenCover} 
          />
        )}
      </AnimatePresence>

      {showConfetti && <FlowerConfetti />}

      <FloatingPetals count={20} />
      <main className="overflow-x-hidden">
        <Invitation3DCard />
        <WeddingDetails side={side} />
        <CountdownSection />
        <WeddingTimeline />
        <OurStory />
        <Gallery />
        <WishesSection guestName={guestName} />
        <ThankYouFooter />
      </main>
      <MusicPlayer />

      {/* Fixed shuttle bus registration button */}
      <motion.a
        href="https://forms.gle/j43jADvVwQGoovQ97"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-4 z-40 flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-amber-700 transition-all"
      >
        <Bus size={18} />
        <span className="text-sm font-medium">Đăng ký xe đưa đón</span>
      </motion.a>
    </>
  )
}
