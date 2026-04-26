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
 
function WishModal({ isOpen, onClose, onSubmit }) {
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
            className="fixed inset-0 bg-black/50 z-50"
          />
 
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md"
          >
            <div className="bg-[#fff5f5] rounded-2xl shadow-2xl p-6 relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={20} />
              </button>
 
              {/* Heart icon header */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-[#ff7a85] rounded-xl flex items-center justify-center shadow-lg relative">
                  <span className="text-white text-2xl">💬</span>
                  {/* Floating hearts decoration */}
                  <span className="absolute -top-1 -left-1 text-pink-300 text-xs">💖</span>
                  <span className="absolute -top-1 -right-1 text-pink-300 text-xs">💕</span>
                </div>
              </div>
 
              <h3 className="text-center text-xl font-semibold text-gray-800 mb-6">
                Lời chúc
              </h3>
 
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tên của bạn"
                  className="w-full border border-pink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 bg-white"
                  required
                />
 
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Lời chúc của bạn"
                  rows={4}
                  className="w-full border border-pink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 bg-white resize-none"
                  required
                />
 
                <button
                  type="submit"
                  className="w-full bg-[#ef5364] hover:bg-[#e84556] text-white font-semibold py-3 rounded-full transition-colors duration-200"
                >
                  Gửi Lời Chúc
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
 
export default function WishesSection() {
  const [wishes, setWishes] = useState(INITIAL_WISHES)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
 
  const handleSubmit = (name, message) => {
    const newWish = {
      id: Date.now(),
      name,
      message,
      emoji: '💝',
      position: {
        top: `${Math.random() * 70 + 10}%`,
        left: `${Math.random() * 60 + 5}%`,
      }
    }
    setWishes(prev => [...prev, newWish])
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }
 
  // Add floating animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setWishes(prev => [...prev])
    }, 50)
    return () => clearInterval(interval)
  }, [])
 
  return (
    <section id="wishes" className="relative min-h-[500px] py-16 overflow-hidden bg-gradient-to-b from-white to-pink-50">
      {/* Floating wishes bubbles */}
      <div className="relative h-[400px] max-w-4xl mx-auto">
        {wishes.map((wish, idx) => (
          <WishBubble key={wish.id} wish={wish} delay={idx * 0.1} />
        ))}
      </div>
 
      {/* Floating input button at bottom */}
      <div className="fixed bottom-6 left-6 z-40">
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
 
      {/* Heart decoration near the floating button */}
      <div className="fixed bottom-20 left-4 z-30 pointer-events-none">
        <motion.span
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-2xl"
        >
          ❤️
        </motion.span>
      </div>
 
      {/* Modal */}
      <WishModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
 
      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-6 z-50 bg-[#ef5364] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
          >
            Đã gửi lời chúc thành công! 💕
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
 

