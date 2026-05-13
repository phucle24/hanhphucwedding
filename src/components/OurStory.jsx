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
              year: '2023',
              title: 'Gặp gỡ',
              desc: 'Chúng mình gặp nhau trong một dịp thật tình cờ. Từ đó mở đầu cho một câu chuyện mà sau này cả hai đều muốn gìn giữ.'
            },
            {
              year: 'Cuối năm 2023',
              title: 'Hẹn hò',
              desc: 'Sau những ngày tháng trò chuyện và thấu hiểu nhau hơn, chúng mình chính thức nắm tay bước vào tình yêu. Những buổi cà phê, những lần dạo phố, những câu chuyện không đầu không cuối đã trở thành những kỷ niệm thật dịu dàng.'
            },
            {
              year: '2024',
              title: 'Vun vén',
              desc: 'Tình yêu của chúng mình lớn lên từ những điều giản dị: cùng chia sẻ niềm vui, cùng lắng nghe những mệt mỏi, cùng ở lại bên nhau qua những ngày không dễ dàng.'
            },
            {
              year: '2025',
              title: 'Đồng hành',
              desc: 'Học cách yêu thương nhiều hơn, bao dung nhiều hơn và trân trọng từng khoảnh khắc có nhau. Mỗi chặng đường đi qua đều khiến cả hai thêm tin rằng: đây chính là người mình muốn cùng bước tiếp.'
            },
            {
              year: '2026',
              title: 'Dạm ngõ',
              desc: 'Khi tình yêu đã đủ chín, chúng mình cùng hai bên gia đình gửi gắm lời hứa cho một tương lai chung. Đó là khoảnh khắc hạnh phúc, ấm áp và đầy xúc động.'
            },
            {
              year: '2026',
              title: 'Kết hôn',
              desc: 'Và hôm nay, chúng mình chính thức viết tiếp câu chuyện yêu thương bằng một mái ấm nhỏ. Cảm ơn vì đã đến, đã chứng kiến và chúc phúc cho ngày trọng đại của chúng mình.'
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
