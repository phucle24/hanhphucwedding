import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Clock, Heart } from 'lucide-react'
import { config } from '../weddingConfig'

export default function WeddingDetails() {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']
    const dayName = days[date.getDay()]
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return { dayName, day, month, year }
  }

  const { dayName, day, month, year } = formatDate(config.weddingDate)

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-rose-50 to-white">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Heart className="w-8 h-8 text-red-500 mx-auto mb-4 animate-pulse" />
          <h2 className="text-3xl font-serif text-gray-800 mb-2">Thông Tin Lễ Cưới</h2>
          <p className="text-gray-600">Wedding Details</p>
        </motion.div>

        {/* Date Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-red-900 to-red-700 rounded-2xl p-8 mb-8 text-center text-white shadow-2xl"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Calendar className="w-6 h-6 text-yellow-400" />
            <span className="text-lg tracking-wider">{dayName}</span>
          </div>
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="text-center">
              <span className="block text-sm text-yellow-200 mb-1">Tháng</span>
              <span className="text-3xl font-bold text-yellow-400">{month}</span>
            </div>
            <div className="text-center bg-white/20 rounded-xl px-6 py-3">
              <span className="block text-6xl font-bold">{day}</span>
            </div>
            <div className="text-center">
              <span className="block text-sm text-yellow-200 mb-1">Năm</span>
              <span className="text-3xl font-bold text-yellow-400">{year}</span>
            </div>
          </div>
          <p className="text-yellow-200 text-sm">Âm lịch: Ngày 19 tháng Chạp năm Giáp Thìn</p>
        </motion.div>

        {/* Event Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Lễ Vu Quy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="bg-red-800 text-white p-4 text-center">
              <h3 className="text-xl font-serif flex items-center justify-center gap-2">
                <Heart className="w-5 h-5" />
                Lễ Vu Quy
              </h3>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3 text-gray-700">
                <Clock className="w-5 h-5 text-red-600" />
                <span className="font-medium">{config.ceremonyTime}</span>
              </div>
              <div className="flex items-start gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{config.ceremonyVenue.name}</p>
                  <p className="text-sm text-gray-500">{config.ceremonyVenue.address}</p>
                </div>
              </div>
              <a
                href={config.ceremonyVenue.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Xem bản đồ</span>
              </a>
            </div>
          </motion.div>

          {/* Tiệc Cưới */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="bg-red-800 text-white p-4 text-center">
              <h3 className="text-xl font-serif flex items-center justify-center gap-2">
                <Heart className="w-5 h-5" />
                Tiệc Cưới
              </h3>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3 text-gray-700">
                <Clock className="w-5 h-5 text-red-600" />
                <span className="font-medium">{config.receptionTime}</span>
              </div>
              <div className="flex items-start gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{config.receptionVenue.name}</p>
                  <p className="text-sm text-gray-500">{config.receptionVenue.address}</p>
                </div>
              </div>
              <a
                href={config.receptionVenue.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Xem bản đồ</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
