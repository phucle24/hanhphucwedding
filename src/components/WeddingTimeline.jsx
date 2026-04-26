import React from 'react'
import { motion } from 'framer-motion'

const easeSmooth = [0.22, 1, 0.36, 1]

const fadeInUp = {
  initial: { opacity: 0, y: 50, scale: 0.97 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 1, ease: easeSmooth }
  }
}

const HouseIcon = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
    <path d="M24 4L4 18h4v22h12V28h8v12h12V18h4L24 4z" fill="#f5e6d3" stroke="#c9956a" strokeWidth="1.5" strokeLinejoin="round"/>
    <rect x="18" y="30" width="12" height="10" rx="1" fill="#c9956a" opacity="0.4"/>
    <circle cx="24" cy="24" r="2" fill="#c9956a"/>
  </svg>
)

function HouseBadge({ label, mapLink }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <HouseIcon />
      <span className="text-sm font-semibold" style={{ color: '#c9956a' }}>{label}</span>
      <a
        href={mapLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-white text-xs font-semibold tracking-wide"
        style={{ backgroundColor: '#5a1a1a' }}
      >
        CHỈ ĐƯỜNG
      </a>
    </div>
  )
}

function TimelineEvent({ title, time, day, month, year, lunarDate, location, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 45, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.1, delay, ease: easeSmooth }}
      className="text-center py-4"
    >
      {/* Title */}
      <h3 className="font-serif text-2xl md:text-3xl text-gray-800 font-semibold tracking-wide mb-1">
        {title}
      </h3>

      {/* Time */}
      <p className="font-sans text-gray-600 text-sm mb-4 tracking-widest">
        VÀO {time}
      </p>

      {/* Date row: THÁNG X | DAY | NĂM YYYY */}
      <div className="flex items-center justify-center gap-3 md:gap-6 mb-2">
        <span className="font-serif text-base md:text-xl font-bold text-gray-800 tracking-widest">
          THÁNG {month}
        </span>
        <div className="h-10 w-px bg-gray-300" />
        <span className="font-serif text-4xl md:text-5xl font-bold leading-none" style={{ color: '#8b0a1a' }}>
          {day}
        </span>
        <div className="h-10 w-px bg-gray-300" />
        <span className="font-serif text-base md:text-xl font-bold text-gray-800 tracking-widest">
          NĂM {year}
        </span>
      </div>

      {/* Lunar Date */}
      <p className="font-sans text-gray-500 text-xs mb-3">
        {lunarDate}
      </p>

      {/* Location - underlined */}
      <p className="font-serif text-sm md:text-base text-gray-800 font-semibold tracking-widest border-b border-gray-800 inline-block pb-0.5">
        {location}
      </p>
    </motion.div>
  )
}

export default function WeddingTimeline() {
  return (
    <section className="py-6 px-4 bg-white">
      <div className="max-w-md mx-auto">
        {/* LỄ VU QUY + Nhà Gái */}
        <div className="relative flex items-start gap-4">
          <div className="flex-1">
            <TimelineEvent
              title="LỄ VU QUY"
              time="CHỦ NHẬT - 09H00"
              day="20"
              month="12"
              year="2026"
              lunarDate="Tức Ngày 16 tháng 10 năm Bính Ngọ"
              location="TẠI TƯ GIA NHÀ GÁI"
              delay={0.1}
            />
          </div>
          {/* Nhà Gái - Right side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pt-4"
          >
            <HouseBadge label="Nhà Gái" mapLink="https://maps.google.com" />
          </motion.div>
        </div>

        {/* Road Illustration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative my-2"
        >
          <img
            src="/road.png"
            alt="Wedding journey road"
            className="w-full h-auto"
          />
          {/* Floating hearts decoration */}
          <motion.span
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-1/4 left-1/4 text-pink-400 text-sm"
          >
            🌸
          </motion.span>
          <motion.span
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
            className="absolute top-1/2 right-1/3 text-pink-400 text-sm"
          >
            💕
          </motion.span>
        </motion.div>

        {/* Nhà Trai + LỄ THÀNH HÔN */}
        <div className="relative flex items-start gap-4">
          {/* Nhà Trai - Left side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-4"
          >
            <HouseBadge label="Nhà Trai" mapLink="https://maps.google.com" />
          </motion.div>
          <div className="flex-1">
            <TimelineEvent
              title="LỄ THÀNH HÔN"
              time="CHỦ NHẬT - 14H00"
              day="20"
              month="12"
              year="2026"
              lunarDate="Tức Ngày 16 tháng 10 năm Bính Ngọ"
              location="TẠI TƯ GIA NHÀ TRAI"
              delay={0.5}
            />
          </div>
        </div>
      </div>
    </section>
  )
}