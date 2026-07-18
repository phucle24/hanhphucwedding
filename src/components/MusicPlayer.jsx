import React, { useState, useRef, useEffect } from 'react'
import { Music, Music2 } from 'lucide-react'
import { getInvitationParam } from '../utils/invitationUrl'

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)
  const hasStartedRef = useRef(false)

  // Auto-play on envelope open OR first user interaction (for root link / direct access)
  useEffect(() => {
    if (hasStartedRef.current) return

    const startMusic = () => {
      if (hasStartedRef.current || !audioRef.current) return
      audioRef.current.play().then(() => {
        setPlaying(true)
        hasStartedRef.current = true
        removeListeners()
      }).catch((err) => {
        // Autoplay blocked by browser policy, keep listening for next interaction
        console.log("Autoplay blocked:", err)
      })
    }

    const handleEnvelopeOpen = () => {
      startMusic()
    }

    const handleUserInteraction = () => {
      startMusic()
    }

    const addListeners = () => {
      window.addEventListener('envelope-open', handleEnvelopeOpen)
      window.addEventListener('touchstart', handleUserInteraction, { passive: true })
      window.addEventListener('mousedown', handleUserInteraction, { passive: true })
      window.addEventListener('wheel', handleUserInteraction, { passive: true })
      window.addEventListener('keydown', handleUserInteraction, { passive: true })
    }

    const removeListeners = () => {
      window.removeEventListener('envelope-open', handleEnvelopeOpen)
      window.removeEventListener('touchstart', handleUserInteraction)
      window.removeEventListener('mousedown', handleUserInteraction)
      window.removeEventListener('wheel', handleUserInteraction)
      window.removeEventListener('keydown', handleUserInteraction)
    }

    addListeners()
    
    // Attempt autoplay immediately in case browser allows it (e.g. relaxed policy)
    const autoPlayTimeout = setTimeout(() => {
      const searchParams = new URLSearchParams(window.location.search)
      const hasGuest = getInvitationParam(searchParams, 'g', 'to')
      if (!hasGuest) {
        startMusic()
      }
    }, 1000)

    return () => {
      removeListeners()
      clearTimeout(autoPlayTimeout)
    }
  }, [playing])

  const toggle = () => {
    if (!audioRef.current) return
    hasStartedRef.current = true // User interacted directly, disable auto-start listeners
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setPlaying(!playing)
  }

  return (
    <>
      <audio
        ref={audioRef}
        loop
        src="/musice.mp3"
        preload="metadata"
      />
      
      {/* Inline styles for custom wave animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes musicWave {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1.2); }
        }
        .animate-wave-1 { animation: musicWave 0.8s ease-in-out infinite; transform-origin: bottom; }
        .animate-wave-2 { animation: musicWave 0.5s ease-in-out infinite; transform-origin: bottom; }
        .animate-wave-3 { animation: musicWave 0.7s ease-in-out infinite; transform-origin: bottom; }
      `}} />

      <button
        onClick={toggle}
        title={playing ? 'Tắt nhạc' : 'Bật nhạc'}
        className="fixed top-4 right-4 z-[99] w-12 h-12 rounded-full bg-[#faf6f0]/95 backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex items-center justify-center transition-all duration-300 border border-amber-600/25 hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] active:scale-95 cursor-pointer select-none"
      >
        {/* Rotating dash circle border around the note when playing - SVG to prevent subpixel wobble */}
        {playing && (
          <svg 
            className="absolute inset-0 w-full h-full animate-spin text-[#962525]/60 pointer-events-none" 
            style={{ animationDuration: '8s' }}
            viewBox="0 0 100 100"
          >
            <circle 
              cx="50" 
              cy="50" 
              r="40" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeDasharray="6 8" 
              strokeLinecap="round"
            />
          </svg>
        )}
        
        {/* Center Music Icon - remains static and perfectly centered */}
        <div className="z-10 flex items-center justify-center w-5 h-5 text-[#962525]">
          {playing
            ? <Music2 size={18} className="text-[#a32a2a]" />
            : <Music size={18} className="text-amber-800/60" />
          }
        </div>

        {/* Pulse wave bars underneath - perfectly centered horizontally */}
        {playing && (
          <div className="absolute bottom-2.5 left-0 right-0 flex items-end gap-[2px] z-10 h-3 justify-center">
            <span className="w-[1.5px] h-2 bg-[#a32a2a] rounded-full animate-wave-1" />
            <span className="w-[1.5px] h-3 bg-[#a32a2a] rounded-full animate-wave-2" />
            <span className="w-[1.5px] h-2 bg-[#a32a2a] rounded-full animate-wave-3" />
          </div>
        )}
      </button>
    </>
  )
}
