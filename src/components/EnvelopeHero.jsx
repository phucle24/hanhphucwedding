import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { config } from '../weddingConfig'

/*
 * ENVELOPE LAYOUT (all values in px, mobile-first)
 *
 *  comboH = peek + envH
 *  ┌──────────────────────────────┐  ← y = 0 (combo top)
 *  │  peek area (photo shows here)│  peek = 85px
 *  ├──────────────────────────────┤  ← y = peek (envelope top)
 *  │  opening depth               │  openH = 105px  ← photo visible inside here (z=10)
 *  ├──────────────────────────────┤  ← y = peek + openH
 *  │  solid body                  │  bodyH = 110px  ← front face at z=15 covers photo
 *  └──────────────────────────────┘  ← y = comboH
 *
 *  Z-index stack:
 *   2  envelope back (dark red rectangle)
 *  10  photo (slides from y=envH to y=0)
 *  15  envelope BODY FRONT (solid, lower portion only — makes photo look "inside")
 *  16  decorative fold lines on body front
 *  20  wax seal (envelope.webp)
 *  25  top flap (closed) / invisible when opened (backfaceVisibility: hidden)
 */
const W = 340          // wider envelope
const envH = 220        // taller envelope
const photoW = 300      // wider photo
const photoH = 320      // taller photo - half inside, half outside
const photoPeek = 160   // 160px outside, 160px inside when opened
const comboH = photoPeek + envH  // total container height

function FlyingHearts({ isActive }) {
  const hearts = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 280,
    y: -(Math.random() * 180 + 60),
    scale: 0.4 + Math.random() * 0.7,
    delay: Math.random() * 0.4,
    emoji: ['💖', '💕', '💗', '💝', '💘', '❤️'][Math.floor(Math.random() * 6)]
  }))

  return (
    <AnimatePresence>
      {isActive && hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
          animate={{ opacity: 0, x: heart.x, y: heart.y, scale: heart.scale }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, delay: heart.delay, ease: 'easeOut' }}
          className="absolute pointer-events-none text-xl"
          style={{ left: '50%', top: '40%', transform: 'translate(-50%,-50%)', zIndex: 50 }}
        >
          {heart.emoji}
        </motion.div>
      ))}
    </AnimatePresence>
  )
}

export default function EnvelopeHero() {
  const [isOpen, setIsOpen] = useState(false)
  const [showPhoto, setShowPhoto] = useState(false)
  const [showHearts, setShowHearts] = useState(false)

  const handleOpen = useCallback(() => {
    if (isOpen) return
    setIsOpen(true)
    // Hearts
    setShowHearts(true)
    setTimeout(() => setShowHearts(false), 2500)
    // Photo slides up after flap opens
    setTimeout(() => setShowPhoto(true), 500)
    // Trigger music + auto-scroll via custom event
    window.dispatchEvent(new CustomEvent('envelope-open'))
  }, [isOpen])

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center py-3 px-4 overflow-hidden"
      style={{ backgroundColor: '#fdf6f3' }}
    >
      {/* Header text */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-2"
      >
        <p className="text-[10px] tracking-[0.4em] text-[#8b4545] uppercase mb-1">
          WEDDING INVITATION
        </p>
        <h1 className="text-xl tracking-[0.2em] text-[#6b2d2d] font-medium">
          THIỆP MỜI CƯỚI
        </h1>
      </motion.div>

      {/* Names positioned on left and right above envelope */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative mb-0"
        style={{ width: W, height: 40 }}
      >
        {/* Bride name - left */}
        <span 
          className="absolute left-0 top-0 text-3xl text-gray-800"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          {config.brideName}
        </span>
        {/* Groom name - right */}
        <span 
          className="absolute right-0 top-0 text-3xl text-gray-800"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          {config.groomName}
        </span>
      </motion.div>

      {/* ═══ ENVELOPE + PHOTO COMBO ═══ */}
      <motion.div
        className="relative"
        style={{ width: W, height: comboH, cursor: isOpen ? 'default' : 'pointer', perspective: 800 }}
        onClick={!isOpen ? handleOpen : undefined}
        animate={isOpen
          ? { scale: 1.05, y: [-5, 5, -5, 5, 0] }
          : { scale: [1, 1.02, 1, 1.01, 1], y: [0, -4, 0, -2, 0] }
        }
        transition={isOpen
          ? { duration: 0.8, ease: 'easeOut' }
          : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <FlyingHearts isActive={showHearts} />

        {/* z=2 — Envelope back (dark interior) */}
        <div
          className="absolute left-0 right-0 bottom-0 rounded-lg"
          style={{
            height: envH,
            zIndex: 2,
            background: 'linear-gradient(180deg, #a03535 0%, #8b2323 100%)',
            boxShadow: '0 10px 40px rgba(139,35,35,0.3)',
          }}
        />

        {/* z=10 — Wedding photo: hidden when closed, slides up when opened */}
        <motion.div
          initial={false}
          animate={showPhoto
            ? { y: -photoPeek, opacity: 1, scale: 1 }
            : { y: 0, opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute overflow-hidden rounded-lg shadow-2xl"
          style={{
            top: photoPeek,
            left: (W - photoW) / 2,
            width: photoW,
            height: photoH,
            zIndex: 10,
          }}
        >
          <img
            src={config.gallery[0]}
            alt="Ảnh cưới"
            className="w-full h-full object-cover object-top"
          />
        </motion.div>

        {/* z=15 — Envelope BODY with triangular side flaps */}
        <motion.div
          className="absolute left-0 right-0 bottom-0 pointer-events-none"
          style={{ height: envH, zIndex: 15 }}
          animate={isOpen ? { y: envH * 0.4, opacity: 0.3 } : { y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Base color */}
          <div className="absolute inset-0 rounded-lg" style={{ background: '#b94444' }} />
          
          {/* Left triangular flap */}
          <div
            className="absolute left-0 top-0"
            style={{
              width: '50%',
              height: '100%',
              background: 'linear-gradient(135deg, #c95454 0%, #a03535 100%)',
              clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
            }}
          />
          
          {/* Right triangular flap */}
          <div
            className="absolute right-0 top-0"
            style={{
              width: '50%',
              height: '100%',
              background: 'linear-gradient(-135deg, #c95454 0%, #a03535 100%)',
              clipPath: 'polygon(100% 0, 0 50%, 100% 100%)',
            }}
          />
          
          {/* Bottom triangular flap */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: '60%',
              background: 'linear-gradient(to top, #9a3030 0%, #b94444 100%)',
              clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
            }}
          />
        </motion.div>

        {/* z=20 — Wax seal positioned at center of envelope body */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            bottom: envH * 0.35,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
          }}
          animate={isOpen ? { scale: 0.85, opacity: 0.6 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src="/envelope.webp"
            alt="seal"
            className="w-12 h-12 drop-shadow-lg"
          />
        </motion.div>


        {/* Drop shadow */}
        <div
          className="absolute rounded-full blur-lg pointer-events-none"
          style={{
            bottom: -10, left: '5%', right: '5%', height: 15,
            background: 'rgba(0,0,0,0.15)', zIndex: 1,
          }}
        />
      </motion.div>

      {/* "Chạm để mở thiệp" button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            onClick={handleOpen}
            className="mt-3 px-7 py-2.5 rounded-full border border-[#d4a0a0] bg-white/75 backdrop-blur-sm shadow-md active:scale-95 transition-transform select-none"
          >
            <span className="font-script text-[#8b4545] text-base tracking-wide">
              Chạm để mở thiệp
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <div className="absolute top-6 left-3 text-sm opacity-20 animate-float">🌸</div>
      <div className="absolute top-10 right-4 text-xs opacity-15 animate-float" style={{ animationDelay: '1.2s' }}>🌺</div>
    </section>
  )
}
