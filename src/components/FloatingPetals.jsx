import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const petalEmojis = ['🌸', '🌺', '🌹', '🌷', '💮', '🏵️']

export default function FloatingPetals({ count = 15 }) {
  const [petals, setPetals] = useState([])

  useEffect(() => {
    const newPetals = Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: petalEmojis[Math.floor(Math.random() * petalEmojis.length)],
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 20,
      size: 0.8 + Math.random() * 0.7,
    }))
    setPetals(newPetals)
  }, [count])

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{ y: -50, x: `${petal.x}vw`, opacity: 0, rotate: 0 }}
          animate={{
            y: '110vh',
            x: [`${petal.x}vw`, `${petal.x + (Math.random() - 0.5) * 30}vw`, `${petal.x}vw`],
            opacity: [0, 1, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute"
          style={{ fontSize: `${petal.size}rem` }}
        >
          {petal.emoji}
        </motion.div>
      ))}
    </div>
  )
}
