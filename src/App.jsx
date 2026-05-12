import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bus } from 'lucide-react'
import EnvelopeHero from './components/EnvelopeHero'
import WeddingDetails from './components/WeddingDetails'
import WeddingTimeline from './components/WeddingTimeline'
import OurStory from './components/OurStory'
import Gallery from './components/Gallery'
import WishesSection from './components/WishesSection'
import CountdownSection from './components/Countdown'
import ThankYouFooter from './components/ThankYouFooter'
import FloatingPetals from './components/FloatingPetals'
import MusicPlayer from './components/MusicPlayer'
import { useAutoScroll } from './hooks/useAutoScroll'

export default function App() {
  const { startAutoScroll } = useAutoScroll()

  useEffect(() => {
    // Start auto-scroll 4s after user opens envelope
    const handleEnvelopeOpen = () => {
      setTimeout(() => startAutoScroll(), 4000)
    }
    window.addEventListener('envelope-open', handleEnvelopeOpen)
    return () => window.removeEventListener('envelope-open', handleEnvelopeOpen)
  }, [startAutoScroll])

  return (
    <>
      <FloatingPetals count={20} />
      <main className="overflow-x-hidden">
        <EnvelopeHero />
        <WeddingDetails />
        <CountdownSection />
        <WeddingTimeline />
        <OurStory />
        <Gallery />
        <WishesSection />
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
