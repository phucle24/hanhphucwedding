import React from 'react'
import { motion } from 'framer-motion'
import { config } from '../weddingConfig'

export default function InvitationSection() {
  return (
    <section id="invitation" className="py-20 px-6 bg-parchment relative overflow-hidden">
      {/* Background flower watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-5">
        <span className="text-[30rem] leading-none">🌸</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="max-w-2xl mx-auto text-center relative z-10"
      >
        {/* Top ornament */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px flex-1 bg-gold-400/40" />
          <span className="text-gold-500 text-2xl">❀</span>
          <div className="h-px flex-1 bg-gold-400/40" />
        </div>

        <p className="font-script text-gold-600 text-3xl md:text-4xl mb-8">
          Thiệp Mời Trân Trọng
        </p>

        {/* Invitation card */}
        <div
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gold-200 relative"
          style={{
            backgroundImage:
              'radial-gradient(circle at top right, #fef3e2 0%, #ffffff 60%)',
          }}
        >
          {/* Corner roses */}
          <div className="absolute top-3 left-3 text-3xl opacity-30 select-none pointer-events-none">🌹</div>
          <div className="absolute top-3 right-3 text-3xl opacity-30 select-none pointer-events-none -scale-x-100">🌹</div>
          <div className="absolute bottom-3 left-3 text-3xl opacity-30 select-none pointer-events-none scale-y-[-1]">🌹</div>
          <div className="absolute bottom-3 right-3 text-3xl opacity-30 select-none pointer-events-none -scale-100">🌹</div>

          <p className="font-sans text-gray-600 text-sm md:text-base leading-loose mb-6">
            Với tất cả tình yêu thương và niềm hân hoan, hai gia đình chúng tôi trân trọng kính mời Quý vị tham dự
            lễ thành hôn của
          </p>

          {/* Groom family */}
          <div className="mb-4">
            <p className="font-sans text-gray-500 text-sm mb-1">Con trai:</p>
            <p className="font-serif text-xl md:text-2xl text-gold-700 font-semibold">{config.groomFullName}</p>
            <p className="text-sm text-gray-500">
              {config.groomFamily.father} &amp; {config.groomFamily.mother}
            </p>
          </div>

          {/* Heart divider */}
          <div className="my-5 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-blush-300" />
            <span className="heart-pulse text-blush-400 text-2xl">♥</span>
            <div className="h-px w-12 bg-blush-300" />
          </div>

          {/* Bride family */}
          <div className="mb-6">
            <p className="font-sans text-gray-500 text-sm mb-1">Con gái:</p>
            <p className="font-serif text-xl md:text-2xl text-gold-700 font-semibold">{config.brideFullName}</p>
            <p className="text-sm text-gray-500">
              {config.brideFamily.father} &amp; {config.brideFamily.mother}
            </p>
          </div>

          <div className="h-px bg-gold-200 my-5" />

          <p className="font-sans text-gray-600 text-sm leading-relaxed">
            Sự hiện diện của Quý vị là niềm vinh hạnh và là món quà ý nghĩa nhất
            đối với gia đình chúng tôi trong ngày trọng đại này.
          </p>

          <p className="font-script text-gold-500 text-2xl mt-5">
            Trân trọng kính mời 🙏
          </p>
        </div>

        {/* Bottom ornament */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="h-px flex-1 bg-gold-400/40" />
          <span className="text-gold-500 text-2xl">❀</span>
          <div className="h-px flex-1 bg-gold-400/40" />
        </div>
      </motion.div>
    </section>
  )
}
