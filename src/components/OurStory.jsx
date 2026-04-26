import React from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

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

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.15 } }
}

const cardReveal = {
  initial: { opacity: 0, y: 60, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 1.1, ease: easeSmooth }
  }
}

export default function OurStory() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-rose-50 to-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-12"
        >
          <Heart className="w-8 h-8 text-red-500 mx-auto mb-4" />
          <h2 className="text-3xl font-serif text-gray-800 mb-2">Chuyện Tình Yêu</h2>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          {[
            {
              year: '2020',
              title: 'Gặp gỡ',
              desc: 'Chúng mình gặp nhau trong một dịp tình cờ. Từ ánh mắt đầu tiên, đã có một điều gì đó thật đặc biệt.'
            },
            {
              year: '2022',
              title: 'Hẹn hò',
              desc: 'Sau thời gian tìm hiểu, chúng mình chính thức hẹn hò. Những buổi cà phê, những chuyến đi chơi đã tạo nên biết bao kỷ niệm đẹp.'
            },
            {
              year: '2025',
              title: 'Dặm ngõ',
              desc: 'Và giờ đây, chúng mình sẵn sàng bước sang một chương mới của cuộc đời. Cảm ơn vì đã đến để chứng kiến ngày trọng đại này.'
            },
            {
              year: '2025',
              title: 'Kết hôn',
              desc: 'Và giờ đây, chúng mình sẵn sàng bước sang một chương mới của cuộc đời. Cảm ơn vì đã đến để chứng kiến ngày trọng đại này.'
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={cardReveal}
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
            >
              <span className="inline-block bg-red-100 text-red-600 rounded-full px-4 py-1 text-sm font-medium mb-4">
                {item.year}
              </span>
              <h3 className="text-xl font-serif text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
