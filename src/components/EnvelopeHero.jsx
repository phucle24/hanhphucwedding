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
const W = 320
const envH = 215        // total envelope height
const openH = 105       // opening depth (photo visible here when inside)
const bodyH = envH - openH  // 110px – solid face covers photo bottom
const peek = 85         // px photo sticks above envelope top
const comboH = peek + envH  // 300
const photoW = 280
const photoH = 190
const flapH = 118       // top flap height (slightly deeper than opening for coverage)

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
      className="relative flex flex-col items-center justify-center py-6 px-4 overflow-hidden"
      style={{ backgroundColor: '#fdf6f3' }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-2"
      >
        <p className="text-[10px] tracking-[0.35em] text-[#8b4545] uppercase mb-1">
          Wedding Invitation
        </p>
        <h1 className="text-[18px] md:text-2xl tracking-[0.15em] text-[#6b2d2d] font-semibold">
          THIỆP MỜI CƯỚI
        </h1>
      </motion.div>

      {/* Names row */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex items-center justify-between mb-1"
        style={{ width: W }}
      >
        <span className="font-script text-2xl text-gray-800 ml-3">{config.brideName}</span>
        <span className="text-[#8b4545] text-xl font-light px-2">&amp;</span>
        <span className="font-script text-2xl text-gray-800 mr-3">{config.groomName}</span>
      </motion.div>

      {/* ═══ ENVELOPE + PHOTO COMBO ═══ */}
      <motion.div
        className="relative flex-1"
        style={{ width: W, height: comboH, cursor: isOpen ? 'default' : 'pointer', perspective: 800 }}
        onClick={!isOpen ? handleOpen : undefined}
        animate={isOpen
          ? { scale: 1.15, y: -10 }
          : { scale: [1, 1.02, 1], y: [0, -4, 0] }
        }
        transition={isOpen
          ? { duration: 0.6, ease: 'easeOut' }
          : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <FlyingHearts isActive={showHearts} />

        {/* z=2 — Envelope back (dark interior) */}
        <div
          className="absolute left-0 right-0 bottom-0 rounded-lg"
          style={{
            height: envH,
            zIndex: 2,
            background: 'linear-gradient(170deg, #7a2020 0%, #5a1818 100%)',
            boxShadow: '0 14px 45px rgba(80,15,15,0.4)',
          }}
        />

        {/* z=10 — Wedding photo: starts hidden inside, slides up on open */}
        <motion.div
          initial={false}
          animate={showPhoto
            ? { y: -20, opacity: 1, scale: 1.12 }
            : { y: envH + 10, opacity: 0, scale: 0.9 }
          }
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute overflow-hidden rounded-xl shadow-2xl"
          style={{
            top: 0,
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
          <div className="absolute inset-2 border border-white/25 rounded-lg pointer-events-none" />
        </motion.div>

        {/* z=15 — Envelope BODY FRONT: only the lower bodyH portion
            This is what makes the photo look "inside" the envelope —
            the solid face covers the bottom of the photo.          */}
        <div
          className="absolute left-0 right-0 bottom-0 pointer-events-none rounded-b-lg"
          style={{ height: bodyH, zIndex: 15 }}
        >
          <div className="absolute inset-0 rounded-b-lg" style={{ background: '#922e2e' }} />
          {/* Left fold shadow */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #bc4848 0%, #8a2525 100%)',
              clipPath: 'polygon(0 0, 50% 50%, 0 100%)',
            }}
          />
          {/* Right fold shadow */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(-135deg, #bc4848 0%, #8a2525 100%)',
              clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)',
            }}
          />
          {/* Bottom triangle fold */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: '70%',
              background: 'linear-gradient(to top, #9e3232 0%, #7a2222 100%)',
              clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
            }}
          />
        </div>

        {/* z=20 — Wax seal (envelope.webp) */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            bottom: Math.round(bodyH * 0.35),
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
          }}
          animate={isOpen ? { scale: 0.8, opacity: 0.5 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src="/envelope.webp"
            alt="seal"
            className="w-12 h-12 drop-shadow-xl"
          />
        </motion.div>

        {/* z=25 — Top flap (closed) / disappears when opened via backfaceVisibility */}
        <motion.div
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: peek,
            height: flapH,
            zIndex: 25,
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(175deg, #c85050 0%, #a03030 55%, #7a2424 100%)',
            clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
          }}
          animate={isOpen ? { rotateX: -180 } : { rotateX: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />

        {/* Drop shadow */}
        <div
          className="absolute rounded-full blur-xl pointer-events-none"
          style={{
            bottom: -8, left: '10%', right: '10%', height: 12,
            background: 'rgba(0,0,0,0.2)', zIndex: 1,
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
            className="mt-5 px-7 py-2.5 rounded-full border border-[#d4a0a0] bg-white/75 backdrop-blur-sm shadow-md active:scale-95 transition-transform select-none"
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
