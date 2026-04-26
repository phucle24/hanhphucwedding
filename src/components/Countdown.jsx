import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date()
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        }
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const timeBlocks = [
    { value: timeLeft.days, label: 'Ngày' },
    { value: timeLeft.hours, label: 'Giờ' },
    { value: timeLeft.minutes, label: 'Phút' },
    { value: timeLeft.seconds, label: 'Giây' }
  ]

  return (
    <div className="flex justify-center gap-3 md:gap-4">
      {timeBlocks.map((block, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="text-center"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-lg w-16 h-16 md:w-20 md:h-20 flex items-center justify-center shadow-lg">
            <span className="text-2xl md:text-3xl font-bold text-red-600">
              {block.value.toString().padStart(2, '0')}
            </span>
          </div>
          <span className="text-xs md:text-sm text-gray-600 mt-1 block">{block.label}</span>
        </motion.div>
      ))}
    </div>
  )
}
