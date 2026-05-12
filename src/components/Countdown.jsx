import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { config } from '../weddingConfig'

const easeSmooth = [0.22, 1, 0.36, 1]

function CountdownBlock({ value, label, index }) {
  const [prev, setPrev] = useState(value)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (value !== prev) {
      setAnimate(true)
      const t = setTimeout(() => {
        setPrev(value)
        setAnimate(false)
      }, 300)
      return () => clearTimeout(t)
    }
  }, [value, prev])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: easeSmooth }}
      className="flex flex-col items-center"
    >
      <div
        className="relative w-18 h-18 md:w-22 md:h-22 flex items-center justify-center"
        style={{ width: 72, height: 72 }}
      >
        {/* Background card */}
        <div
          className="absolute inset-0 rounded-2xl shadow-lg"
          style={{ background: 'linear-gradient(135deg, #7b1a1a, #9b2a2a)' }}
        />
        {/* Shine effect */}
        <div className="absolute inset-0 rounded-2xl bg-white/10" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%)' }} />
        {/* Number */}
        <AnimatePresence mode="wait">
          <motion.span
            key={value}
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative z-10 text-3xl font-bold text-white tabular-nums"
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-xs tracking-widest text-gray-500 uppercase font-medium">{label}</span>
    </motion.div>
  )
}

export default function CountdownSection() {
  const targetDate = new Date(config.weddingDate)

  const getTimeLeft = () => {
    const diff = targetDate - new Date()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }

  const [timeLeft, setTimeLeft] = useState(getTimeLeft)
  const isPast = targetDate <= new Date()

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  const blocks = [
    { value: timeLeft.days,    label: 'Ngày' },
    { value: timeLeft.hours,   label: 'Giờ' },
    { value: timeLeft.minutes, label: 'Phút' },
    { value: timeLeft.seconds, label: 'Giây' },
  ]

  return (
    <section className="py-12 px-4" style={{ background: 'linear-gradient(180deg, #fff5f5 0%, #fff 100%)' }}>
      <div className="max-w-md mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: easeSmooth }}
        >
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-2">Đếm ngược đến ngày cưới</p>
          <h2 className="font-serif text-2xl text-gray-800 mb-1">
            {config.groomName} &amp; {config.brideName}
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            {targetDate.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        {isPast ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: easeSmooth }}
            className="text-2xl font-serif text-rose-600 py-6"
          >
            🎉 Chúng tôi đã kết hôn! 🎉
          </motion.div>
        ) : (
          <div className="flex justify-center gap-4">
            {blocks.map((b, i) => (
              <CountdownBlock key={b.label} value={b.value} label={b.label} index={i} />
            ))}
          </div>
        )}

        {/* Decorative dots */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-8 flex justify-center gap-2"
        >
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: i === 2 ? '#9b2a2a' : '#e8c8c8' }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
