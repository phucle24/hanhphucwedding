import { useEffect } from 'react'
import EnvelopeHero from './components/EnvelopeHero'
import WeddingDetails from './components/WeddingDetails'
import WeddingTimeline from './components/WeddingTimeline'
import OurStory from './components/OurStory'
import Gallery from './components/Gallery'
import WishesSection from './components/WishesSection'
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
        <WeddingTimeline />
        <OurStory />
        <Gallery />
        <WishesSection />
      </main>
      <MusicPlayer />
    </>
  )
}
