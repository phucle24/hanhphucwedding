import React from 'react'
import { motion } from 'framer-motion'

export default function WeddingDetails() {
  return (
    <section className="py-8 px-4 bg-white">
      <div className="max-w-md mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-xl font-serif font-semibold text-gray-800 tracking-wide">
            THƯ MỜI THAM DỰ
          </h2>
        </motion.div>

        <div className="space-y-4">
          {/* TIỆC CƯỚI NHÀ TRAI */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-[#6b1a1a] to-[#8b2323] rounded-3xl p-5 text-white text-center shadow-xl overflow-hidden"
          >
            {/* Heart icon on left */}
            <div className="absolute left-4 bottom-16 text-red-300 text-lg">❤️</div>
            
            <h3 className="text-lg font-serif tracking-wider mb-1">TIỆC CƯỚI NHÀ TRAI</h3>
            <p className="text-sm text-white/90 tracking-wide mb-2">CHỦ NHẬT - 09:30</p>
            
            <div className="text-[#d4af37] text-3xl font-bold tracking-wider mb-2">
              20 . 12 . 2026
            </div>
            
            <p className="text-xs text-white/80 mb-2">Tức Ngày 16 tháng 10 năm Bính Ngọ</p>
            
            <h4 className="text-lg font-serif tracking-wider mb-1">TẠI TƯ GIA NHÀ TRAI</h4>
            <p className="text-sm text-white/90 mb-4">Tân Mỹ - Tiên Phong - Bắc Ninh</p>
            
            <button
              onClick={() => window.open('https://maps.google.com', '_blank')}
              className="bg-white text-gray-800 px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors shadow-md"
            >
              Xem chỉ đường
            </button>
          </motion.div>

          {/* TIỆC CƯỚI NHÀ GÁI */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative bg-gradient-to-br from-[#6b1a1a] to-[#8b2323] rounded-3xl p-5 text-white text-center shadow-xl overflow-hidden"
          >
            {/* Heart icon on right */}
            <div className="absolute right-4 bottom-20 text-red-300 text-lg">❤️</div>
            
            <h3 className="text-lg font-serif tracking-wider mb-1">TIỆC CƯỚI NHÀ GÁI</h3>
            <p className="text-sm text-white/90 tracking-wide mb-2">THỨ BẢY - 18 : 00</p>
            
            <div className="text-[#d4af37] text-3xl font-bold tracking-wider mb-2">
              19 . 12 . 2026
            </div>
            
            <p className="text-xs text-white/80 mb-2">Tức Ngày 15 tháng 10 năm Bính Ngọ</p>
            
            <h4 className="text-lg font-serif tracking-wider mb-1">TẠI NHÀ HÀNG SEN VÀNG</h4>
            <p className="text-sm text-white/90 mb-4">Phú Cát - Quốc Oai - Hà Nội</p>
            
            <button
              onClick={() => window.open('https://maps.google.com', '_blank')}
              className="bg-white text-gray-800 px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors shadow-md"
            >
              Xem chỉ đường
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
