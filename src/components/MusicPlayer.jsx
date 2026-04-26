import React, { useState, useRef, useEffect } from 'react'
import { Music, Music2 } from 'lucide-react'

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  // Auto-play when envelope is opened
  useEffect(() => {
    const handleEnvelopeOpen = () => {
      if (!audioRef.current || playing) return
      audioRef.current.play().catch(() => {})
      setPlaying(true)
    }
    window.addEventListener('envelope-open', handleEnvelopeOpen)
    return () => window.removeEventListener('envelope-open', handleEnvelopeOpen)
  }, [playing])

  const toggle = () => {
    if (!audioRef.current) return
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
      <button
        onClick={toggle}
        title={playing ? 'Tắt nhạc' : 'Bật nhạc'}
        className="fixed top-4 right-4 z-50 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center transition-all duration-300 border border-pink-200 hover:shadow-xl active:scale-95"
      >
        <div className={`transition-all duration-500 ${playing ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }}>
          {playing
            ? <Music2 size={20} className="text-pink-500" />
            : <Music size={20} className="text-pink-400" />
          }
        </div>
        {playing && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
            <span className="w-0.5 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
            <span className="w-0.5 h-3 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '100ms' }} />
            <span className="w-0.5 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
          </div>
        )}
      </button>
    </>
  )
}
