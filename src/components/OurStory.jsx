import React from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function OurStory() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-rose-50 to-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Heart className="w-8 h-8 text-red-500 mx-auto mb-4" />
          <h2 className="text-3xl font-serif text-gray-800 mb-2">Chuyện Tình Yêu</h2>
          <p className="text-gray-600">Our Love Story</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
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
              title: 'Kết hôn',
              desc: 'Và giờ đây, chúng mình sẵn sàng bước sang một chương mới của cuộc đời. Cảm ơn vì đã đến để chứng kiến ngày trọng đại này.'
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
            >
              <span className="inline-block bg-red-100 text-red-600 rounded-full px-4 py-1 text-sm font-medium mb-4">
                {item.year}
              </span>
              <h3 className="text-xl font-serif text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
