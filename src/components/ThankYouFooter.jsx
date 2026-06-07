import React from 'react'
import { motion } from 'framer-motion'
import { config } from '../weddingConfig'

export default function ThankYouFooter() {
  return (
    <footer className="relative py-16 px-4 bg-[#fdf8f0] overflow-hidden border-t border-[#ecc1c1]/20">
      <div className="max-w-md mx-auto text-center flex flex-col items-center">
        
        {/* Thank you text - smooth reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <h3 
            className="font-serif text-2xl text-gray-800 mb-4 font-semibold animate-pulse"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Trân Trọng Cảm Ơn
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line max-w-sm mx-auto font-light">
            Chúng mình sắp bắt đầu một hành trình mới cùng nhau.
            Niềm vui này sẽ trọn vẹn hơn khi có bạn bên cạnh.
            Cuộc sống quý giá không chỉ ở đích đến, mà còn ở những khoảnh khắc chia sẻ cùng nhau.
            Vì vậy, chúng mình mong được bạn chung vui trong ngày hạnh phúc này.
          </p>
        </motion.div>

        {/* Bottom copyright/signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-[10px] text-gray-400 font-light tracking-widest uppercase flex flex-col items-center gap-1.5"
        >
          <div className="flex gap-2 text-xs">
            <span>🌸</span>
            <span>💝</span>
            <span>🌸</span>
          </div>
          <span>{config.brideName} &amp; {config.groomName} • 2026</span>
        </motion.div>
      </div>
    </footer>
  )
}
