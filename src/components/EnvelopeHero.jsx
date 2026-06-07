import React, { useCallback } from 'react'
import { motion } from 'framer-motion'
import { config } from '../weddingConfig'

export default function EnvelopeHero({ guestName, onOpen }) {
  const handleOpen = useCallback(() => {
    // Trigger music via custom event
    window.dispatchEvent(new CustomEvent('envelope-open'))

    // Trigger onOpen callback to dismiss overlay card
    if (onOpen) {
      onOpen()
    }
  }, [onOpen])

  // Relationship pronoun detection helper
  const searchParams = new URLSearchParams(window.location.search)
  const urlRelation = searchParams.get('r')

  const getPronoun = (name, override) => {
    if (override) return override.trim()
    if (!name) return 'chúng em'

    const lowerName = name.toLowerCase()

    // Juniors -> Couple is "anh chị" (older sibling/couple)
    if (
      lowerName.startsWith('em') ||
      lowerName.includes(' em ') ||
      lowerName.startsWith('cháu') ||
      lowerName.includes(' cháu ') ||
      lowerName.startsWith('gia đình em')
    ) {
      return 'anh chị'
    }

    // Peers -> Couple is "chúng mình"
    if (
      lowerName.startsWith('bạn') ||
      lowerName.includes(' bạn ') ||
      lowerName.startsWith('cậu') ||
      lowerName.startsWith('tớ')
    ) {
      return 'chúng mình'
    }

    // Seniors -> Couple is "chúng em"
    if (
      lowerName.startsWith('anh') ||
      lowerName.startsWith('chị') ||
      lowerName.startsWith('cô') ||
      lowerName.startsWith('chú') ||
      lowerName.startsWith('bác') ||
      lowerName.startsWith('dì') ||
      lowerName.startsWith('dượng') ||
      lowerName.startsWith('thầy') ||
      lowerName.startsWith('gia đình anh') ||
      lowerName.startsWith('gia đình chị')
    ) {
      return 'chúng em'
    }

    return 'chúng em' // default
  }

  // Parse header and guest name to avoid duplication (e.g. "Thân mời Gia đình em..." vs "Thân Mời")
  let cleanGuestName = guestName || 'Quý Khách'
  let invitationHeader = 'Thân Mời'

  if (guestName) {
    const lowerName = guestName.toLowerCase()
    if (lowerName.startsWith('kính mời')) {
      invitationHeader = 'Kính Mời'
      cleanGuestName = guestName.substring(8).trim()
    } else if (lowerName.startsWith('thân mời')) {
      invitationHeader = 'Thân Mời'
      cleanGuestName = guestName.substring(8).trim()
    } else if (lowerName.startsWith('thân gửi')) {
      invitationHeader = 'Thân Gửi'
      cleanGuestName = guestName.substring(8).trim()
    }
  }

  // Format wedding date to short Vietnamese: "2 tháng 8, 2026"
  const formatWeddingDateShort = (dateStr) => {
    try {
      const date = new Date(dateStr)
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      return `0${day} tháng 0${month}, ${year}`
    } catch (e) {
      return '2 tháng 8, 2026'
    }
  }

  return (
    <motion.section 
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.7, ease: 'easeInOut' } 
      }}
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-center bg-[#3e2723] z-50 overflow-hidden py-8 px-4"
      id="home"
    >
      {/* Background Chữ Hỷ ở 2 bên */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none hidden lg:block select-none">
        <img src="/themes/nhat-binh-red/chu-hy.webp" className="w-32 h-32" alt="Hỷ" />
      </div>
      <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none hidden lg:block select-none">
        <img src="/themes/nhat-binh-red/chu-hy.webp" className="w-32 h-32" alt="Hỷ" />
      </div>

      {/* Khung Thiệp chính */}
      <motion.div 
        initial={{ opacity: 1, y: 0 }}
        exit={{ 
          y: -120, 
          opacity: 0,
          transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } 
        }}
        className="w-[320px] h-[460px] cursor-pointer select-none relative"
      >
        <div className="w-full h-full relative animate-float-slow">
          {/* Card Base (z-0): Paper texture, borders, and main shadow */}
          <div
            className="absolute inset-0 rounded-[24px] border border-[#d4af37]/25 bg-[#faf6f0] shadow-[0_25px_60px_rgba(0,0,0,0.7)] overflow-hidden pointer-events-none"
            style={{
              backgroundImage: "url('/themes/nhat-binh-red/paper.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          {/* Subtle gold inner border */}
          <div className="absolute inset-2.5 rounded-[16px] border border-[#d4af37]/20 pointer-events-none" />

          {/* Card Content Layer */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center">
            {/* Center Chữ Hỷ */}
            <img
              src="/themes/nhat-binh-red/chu-hy.webp"
              className="w-8 h-8 object-contain pointer-events-none select-none mb-4"
              alt="Chữ Hỷ"
            />

            {/* Names (Vertical stacked layout) */}
            <div className="flex flex-col items-center text-[#a32a2a] font-serif text-[24px] font-black tracking-[0.05em] leading-tight select-none">
              <span>{config.groomName.toUpperCase()}</span>
              <span className="text-sm font-light text-[#8b3a3a] my-1 font-sans opacity-70">&amp;</span>
              <span>{config.brideName.toUpperCase()}</span>
            </div>

            {/* Date */}
            <span className="text-gray-500 text-[11px] font-medium tracking-wide mt-2.5 select-none">
              {formatWeddingDateShort(config.weddingDate)}
            </span>

            {/* Divider line */}
            <div className="w-12 h-px bg-amber-600/30 my-3" />

            {/* Header */}
            <span className="text-[#a32a2a] font-serif italic text-[14px] font-semibold mb-1 select-none">
              {invitationHeader}
            </span>

            {/* Name pill - blueish background box */}
            <div className="bg-[#eaeef3]/95 border border-[#d2dfec] px-6 py-1.5 rounded-full shadow-sm flex items-center justify-center max-w-[90%] mt-1 select-none">
              <span className="text-[#1e3a5f] font-bold text-sm tracking-wide">
                {cleanGuestName}
              </span>
            </div>

            {/* Relation Invite subtext */}
            <span className="text-gray-500 text-[11px] font-light mt-2.5 select-none">
              Dự tiệc chung vui cùng {getPronoun(guestName, urlRelation)}
            </span>

            {/* Mở thiệp Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              className="mt-6 px-10 py-2.5 bg-gradient-to-r from-[#f54343] to-[#e03535] text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer select-none"
            >
              Mở thiệp
            </motion.button>
          </div>

          {/* Ornaments in corners (placed behind content z-10) */}
          <img
            src="/themes/nhat-binh-red/hoa.webp"
            className="absolute top-0 left-0 w-16 pointer-events-none select-none z-10"
            alt=""
          />
          <motion.img
            src="/themes/nhat-binh-red/long-den.webp"
            className="absolute top-2 right-4 w-9 pointer-events-none select-none z-10 origin-top"
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            alt=""
          />
          <img
            src="/themes/nhat-binh-red/quat.webp"
            className="absolute bottom-2 left-2 w-20 pointer-events-none select-none z-10"
            alt=""
          />
          <img
            src="/themes/nhat-binh-red/may-to.webp"
            className="absolute bottom-2 right-2 w-20 pointer-events-none select-none z-10"
            alt=""
          />
        </div>
      </motion.div>

      <div className="absolute top-6 left-3 text-sm opacity-20 animate-float pointer-events-none">🌸</div>
      <div className="absolute top-10 right-4 text-xs opacity-15 animate-float pointer-events-none" style={{ animationDelay: '1.2s' }}>🌺</div>
    </motion.section>
  )
}
