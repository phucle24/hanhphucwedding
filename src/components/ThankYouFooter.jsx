import React from 'react'
import { motion } from 'framer-motion'

export default function ThankYouFooter() {
  return (
    <footer className="relative py-12 px-4 bg-gradient-to-b from-pink-50 to-white overflow-hidden">
      <div className="max-w-md mx-auto text-center">
        {/* Thank you GIF */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <img
            src="/thankyou.gif"
            alt="Thank you"
            className="w-48 h-auto mx-auto rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Thank you text - smooth reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <motion.h3 
            className="font-serif text-2xl text-gray-800 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Trân Trọng Cảm Ơn
          </motion.h3>
          <motion.p 
            className="text-gray-600 text-sm leading-relaxed whitespace-pre-line"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            Chúng mình sắp bắt đầu một hành trình mới cùng nhau.
            Niềm vui này sẽ trọn vẹn hơn khi có bạn bên cạnh.
            Cuộc sống quý giá không chỉ ở đích đến, mà còn ở những khoảnh khắc chia sẻ cùng nhau.
            Vì vậy, chúng mình mong được bạn chung vui trong ngày hạnh phúc này.
          </motion.p>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 flex justify-center gap-4"
        >
          <span className="text-pink-300 text-xl">💖</span>
          <span className="text-pink-300 text-xl">🌸</span>
          <span className="text-pink-300 text-xl">💕</span>
        </motion.div>
        <span className="text-pink-300 text-xl">Made with Chú Rể và Cô Dâu</span>
      </div>
    </footer>
  )
}
