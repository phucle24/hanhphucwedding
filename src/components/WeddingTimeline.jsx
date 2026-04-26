import React from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function WeddingTimeline() {
  const events = [
    {
      time: '09:00',
      title: 'Đón khách',
      description: 'Đón tiếp quan khách tại tư gia',
      side: 'left'
    },
    {
      time: '11:00',
      title: 'Lễ Vu Quy',
      description: 'Nghi lễ truyền thống tại nhà gái',
      side: 'right'
    },
    {
      time: '12:00',
      title: 'Tiệc Cưới',
      description: 'Bắt đầu tiệc chiêu đãi quan khách',
      side: 'left'
    },
    {
      time: '14:00',
      title: 'Kết thúc',
      description: 'Kết thúc buổi lễ',
      side: 'right'
    }
  ]

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-rose-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Heart className="w-8 h-8 text-red-500 mx-auto mb-4" />
          <h2 className="text-3xl font-serif text-gray-800 mb-2">Timeline</h2>
          <p className="text-gray-600">Dòng thời gian ngày trọng đại</p>
        </motion.div>

        <div className="relative">
          {/* Road background image */}
          <div 
            className="absolute left-1/2 top-0 bottom-0 w-4 -translate-x-1/2 rounded-full"
            style={{
              backgroundImage: 'url(/road.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.8
            }}
          />

          {/* Timeline events */}
          <div className="space-y-8">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: event.side === 'left' ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`flex items-center gap-4 ${
                  event.side === 'left' ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${event.side === 'left' ? 'text-right' : 'text-left'}`}>
                  <div className="bg-white rounded-xl p-4 shadow-lg inline-block">
                    <span className="text-red-600 font-bold text-lg">{event.time}</span>
                    <h3 className="font-serif text-lg text-gray-800 mt-1">{event.title}</h3>
                    <p className="text-gray-500 text-sm">{event.description}</p>
                  </div>
                </div>
                <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg z-10 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
