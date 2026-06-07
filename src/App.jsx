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
  const guestName = searchParams.get('to') || searchParams.get('g') || ''
  const side = searchParams.get('side') || '' // 'trai' or 'gai'

  const [showCover, setShowCover] = useState(!!guestName)

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

  return (
    <>
      <AnimatePresence>
        {showCover && (
          <EnvelopeHero 
            guestName={guestName} 
            onOpen={() => setShowCover(false)} 
          />
        )}
      </AnimatePresence>

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

