import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, MessageCircle } from 'lucide-react'

// Initial sample wishes data
const INITIAL_WISHES = [
  { id: 1, name: 'Hương', message: 'Mong rằng tình yêu của hai bạn mãi đẹp như ngày hôm nay!', emoji: '🎊', position: { top: '5%', left: '5%' } },
  { id: 2, name: 'Hiền', message: 'Tấn hôn hạnh phúc, trăm năm bền nhau!', emoji: '🕊️', position: { top: '15%', left: '60%' } },
  { id: 3, name: 'Thảo', message: 'Chúc hai bạn trăm năm hòa hợp, hạnh phúc!', emoji: '💐', position: { top: '30%', left: '10%' } },
  { id: 4, name: 'Việt Anh', message: 'Chúc hai bạn trăm năm hòa hợp, hạnh phúc!', emoji: '💐', position: { top: '45%', left: '55%' } },
  { id: 5, name: 'Hoàng Dũng', message: 'Chúc bạn trăm năm hạnh phúc!', emoji: '🎁', position: { top: '60%', left: '8%' } },
  { id: 6, name: 'Lan Anh', message: 'Chúc hai bạn trăm năm hòa hợp, hạnh phúc!', emoji: '💐', position: { top: '70%', left: '65%' } },
  { id: 7, name: 'Minh', message: 'Chúc mừng hạnh phúc!', emoji: '💖', position: { top: '85%', left: '20%' } },
]

function WishBubble({ wish, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="absolute z-10 max-w-[220px]"
      style={{ top: wish.position.top, left: wish.position.left }}
    >
      <div className="bg-[#e8a8a8] bg-opacity-70 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
        <p className="text-white text-sm leading-snug">
          <span className="font-semibold">{wish.name}:</span>{' '}
          <span>{wish.emoji}</span>{' '}
          <span>{wish.message}</span>
        </p>
      </div>
    </motion.div>
  )
}

function WishModal({ isOpen, onClose, onSubmit, isLoading }) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim() && message.trim()) {
      onSubmit(name.trim(), message.trim())
      setName('')
      setMessage('')
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50"
          />
          
          {/* Modal - tràn viền như hình mẫu */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed left-4 right-4 top-1/2 -translate-y-1/2 z-50"
          >
            <div className="bg-[#fff5f5] rounded-3xl shadow-2xl p-6 relative max-w-lg mx-auto">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1 z-10"
              >
                <X size={20} />
              </button>

              {/* Heart icon header */}
              <div className="flex justify-center mb-4">
                <div className="w-14 h-10 bg-[#ff7a85] rounded-t-full rounded-b-lg flex items-center justify-center shadow-lg relative">
                  <span className="text-white text-xl">🤍</span>
                  {/* Floating hearts decoration */}
                  <span className="absolute -top-2 left-0 text-pink-300 text-xs">💖</span>
                  <span className="absolute -top-2 right-0 text-pink-300 text-xs">💕</span>
                  <span className="absolute top-0 -right-3 text-pink-300 text-xs">�</span>
                </div>
              </div>

              <h3 className="text-center text-lg font-semibold text-gray-800 mb-6">
                Lời chúc
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tên của bạn"
                  className="w-full border border-pink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-400 bg-white/80 placeholder-gray-400"
                  required
                />
                
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Lời chúc của bạn"
                  rows={4}
                  className="w-full border border-pink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-400 bg-white/80 resize-none placeholder-gray-400"
                  required
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#ef5364] hover:bg-[#e84556] disabled:opacity-60 text-white font-semibold py-3 rounded-full transition-colors duration-200 shadow-lg"
                >
                  {isLoading ? 'Đang gửi...' : 'Gửi Lời Chúc'}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

const EMOJI_LIST = ['💝', '💐', '🎊', '🕊️', '🎁', '💖', '🌸', '✨']

export default function WishesSection() {
  const [wishes, setWishes] = useState(INITIAL_WISHES)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Fetch wishes from backend
  useEffect(() => {
    fetch('/api/wishes')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setWishes(data)
        }
      })
      .catch(() => {
        // fallback to initial if API not available
      })
  }, [])

  const handleSubmit = async (name, message) => {
    const emoji = EMOJI_LIST[Math.floor(Math.random() * EMOJI_LIST.length)]
    setIsLoading(true)
    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message, emoji }),
      })
      if (res.ok) {
        const newWish = await res.json()
        setWishes(prev => [...prev, newWish])
      }
    } catch {
      // Fallback: add locally if API unavailable
      setWishes(prev => [...prev, { id: Date.now(), name, message, emoji }])
    } finally {
      setIsLoading(false)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }
  }

  return (
    <section id="wishes" className="relative py-12 px-4 bg-gradient-to-b from-white to-pink-50 overflow-hidden">
      <div className="max-w-md mx-auto">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl font-serif text-gray-800 mb-2">Lời Chúc</h2>
          <p className="text-gray-600 text-sm">Wishes from loved ones</p>
        </motion.div>

        {/* Scrolling wishes container */}
        <div className="relative h-[400px] overflow-hidden mb-20">
          <motion.div
            className="absolute w-full"
            initial={{ y: '100%' }}
            animate={{ y: '-100%' }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {/* Double the wishes for seamless loop */}
            {[...wishes, ...wishes].map((wish, idx) => (
              <div
                key={`${wish.id}-${idx}`}
                className="bg-[#e8a8a8]/80 backdrop-blur-sm rounded-xl px-4 py-3 shadow-sm mb-3 mx-2"
              >
                <p className="text-white text-sm leading-relaxed">
                  <span className="font-semibold">{wish.name}:</span>{' '}
                  <span>{wish.emoji}</span>{' '}
                  <span>{wish.message}</span>
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating input button at bottom left */}
        <div className="fixed bottom-6 left-4 z-40">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-600 px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <MessageCircle size={18} className="text-gray-400" />
            <span className="text-sm font-medium">Gửi lời chúc...</span>
          </motion.button>
        </div>

        {/* Modal */}
        <WishModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />

        {/* Success Toast */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#ef5364] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
            >
              Đã gửi lời chúc thành công! 💕
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
