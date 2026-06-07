import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { config } from '../weddingConfig'

export default function Invitation3DCard() {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left - width / 2
    const mouseY = e.clientY - rect.top - height / 2

    // Tilt calculations (max 10 degrees)
    const rY = (mouseX / (width / 2)) * 10
    const rX = -(mouseY / (height / 2)) * 10

    setRotateX(rX)
    setRotateY(rY)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <section
      className="py-12 px-4 bg-[#faf6f0] flex flex-col items-center justify-center relative overflow-hidden border-b border-[#ecc1c1]/20"
      id="invitation-3d"
    >
      {/* Background elements */}
      <div className="absolute left-[-50px] top-10 opacity-[0.03] pointer-events-none select-none">
        <span className="text-[20rem]">🌸</span>
      </div>
      <div className="absolute right-[-50px] bottom-10 opacity-[0.03] pointer-events-none select-none">
        <span className="text-[20rem]">🌸</span>
      </div>

      {/* 3D Wedding Card Container */}
      <div
        className="w-[340px] h-[540px] cursor-pointer select-none relative z-10"
        style={{ perspective: '1000px' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          ref={cardRef}
          animate={{ rotateX, rotateY }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.5 }}
          className="w-full h-full relative"
          style={{
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Card Base (z-0): Paper texture, borders, and main shadow */}
          <div
            className="absolute inset-0 rounded-[24px] border border-[#d4af37]/25 bg-[#faf6f0] shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden"
            style={{
              backgroundImage: "url('/themes/nhat-binh-red/paper.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: 'translateZ(0px)',
              pointerEvents: 'none',
            }}
          />
          {/* Subtle gold inner border */}
          <div
            className="absolute inset-2.5 rounded-[16px] border border-[#d4af37]/20 pointer-events-none"
            style={{ transform: 'translateZ(2px)' }}
          />

          {/* Layer 1 (z-0): Corner Ornaments */}
          {/* Top-Left Corner: Flowers - Shrunk to prevent covering the groom's name 'LÊ' */}
          <img
            src="/themes/nhat-binh-red/hoa.webp"
            className="absolute top-[-15px] left-[-15px] w-28 pointer-events-none select-none z-10"
            style={{ transform: 'translateZ(15px)' }}
            alt=""
          />

          {/* Top-Right Corner: Lantern */}
          <motion.img
            src="/themes/nhat-binh-red/long-den.webp"
            className="absolute top-[-15px] right-2 w-9 pointer-events-none select-none z-10 origin-top"
            style={{ transform: 'translateZ(20px)' }}
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            alt=""
          />

          {/* Top Center: Names - Smaller and Bolder */}
          <div
            className="absolute top-[80px] left-0 right-0 text-[#962525] font-extrabold text-[19px] tracking-[0.2em] uppercase z-20 flex flex-col items-center select-none"
            style={{
              fontFamily: "'Playfair Display', serif",
              transform: 'translateZ(25px)'
            }}
          >
            <span>{config.groomName} &amp; {config.brideName}</span>
          </div>

          {/* Layer 2 (z-8): Center Double Happiness "Chữ Hỷ" */}
          <div
            className="absolute top-[35%] left-1/2 w-[190px] h-[190px] z-10 opacity-90"
            style={{ transform: 'translate(-50%, -50%) translateZ(8px)' }}
          >
            <img
              src="/themes/nhat-binh-red/chu-hy.webp"
              className="w-full h-full object-contain pointer-events-none select-none"
              alt="Song Hỷ"
            />
          </div>

          {/* Layer 3 (z-12): Background ornaments - Larger & more visible outwards */}
          {/* Left behind chu-hy: Quạt */}
          <motion.div
            className="absolute top-[41%] left-[-16%] w-44 h-44 z-12 opacity-95"
            style={{ transform: 'translateY(-50%) translateZ(12px) rotate(-22deg)' }}
            animate={{ rotate: [-22, -17, -22] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          >
            <img src="/themes/nhat-binh-red/quat.webp" className="w-full h-full object-contain pointer-events-none select-none" alt="" />
          </motion.div>

          {/* Top-Left behind chu-hy: Mây nhỏ */}
          <motion.div
            className="absolute top-[29%] left-[-15%] w-40 h-40 z-14 opacity-85"
            style={{ transform: 'translateY(-50%) translateZ(14px)' }}
            animate={{ x: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          >
            <img src="/themes/nhat-binh-red/may.webp" className="w-full h-full object-contain pointer-events-none select-none" alt="" />
          </motion.div>

          {/* Bottom-Right behind chu-hy: Mây to */}
          <motion.div
            className="absolute top-[48%] right-[-20%] w-56 h-56 z-15 opacity-95"
            style={{ transform: 'translateY(-50%) translateZ(18px)' }}
            animate={{ x: [2, -2, 2] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          >
            <img src="/themes/nhat-binh-red/may-to.webp" className="w-full h-full object-contain pointer-events-none select-none" alt="" />
          </motion.div>

          {/* Top-Right behind chu-hy: Hoa */}
          <motion.div
            className="absolute top-[26%] right-[-15%] w-44 h-44 z-12 opacity-95"
            style={{ transform: 'translateY(-50%) translateZ(10px) rotate(20deg)' }}
            animate={{ rotate: [20, 25, 20] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            <img src="/themes/nhat-binh-red/hoa.webp" className="w-full h-full object-contain pointer-events-none select-none" alt="" />
          </motion.div>

          {/* Layer 4 (z-30): Vertical Bold Banner "NHÀ CÓ HỶ" */}
          <div
            className="absolute left-6 top-[52%] text-center text-[#a72d2d] select-none z-25 flex flex-col items-center"
            style={{ transform: 'translateY(-50%) translateZ(30px)' }}
          >
            <span className="text-[15px] font-extrabold tracking-widest block font-sans">NHÀ</span>
            <span className="text-[15px] font-extrabold tracking-widest block font-sans mt-0.5">CÓ</span>
            <span className="text-[15px] font-extrabold tracking-widest block font-sans mt-0.5">HỶ</span>
          </div>

          {/* Layer 5 (z-40): Bride & Groom (dau-re) in the exact center in front */}
          <div
            className="absolute top-[48%] left-1/2 z-30 w-[265px] flex justify-center"
            style={{ transform: 'translate(-50%, -32%) translateZ(40px)' }}
          >
            <motion.div
              animate={{ y: [-3, 3, -3] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="w-full flex justify-center"
            >
              <img
                src="/themes/nhat-binh-red/dau-re.webp"
                className="w-full h-auto object-contain pointer-events-none select-none filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.22)]"
                alt="Cô dâu chú rể"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
