import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { config } from '../weddingConfig'

// Helper component for individual gallery items with elegant loading skeleton
function GalleryImage({ src, alt, onClick }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  return (
    <div
      className="w-full h-full bg-[#fdfaf7] relative overflow-hidden flex items-center justify-center rounded-2xl group shadow-md border border-[#ecc1c1]/15 hover:shadow-xl transition-all duration-500 cursor-pointer"
      onClick={onClick}
    >
      {/* Skeleton Pulse Loader */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 to-[#fffafa] animate-pulse z-10">
          <div className="w-8 h-8 border-2 border-pink-300 border-t-transparent rounded-full animate-spin mb-2" />
          <span className="text-pink-300/80 text-[10px] font-serif italic tracking-wide">Đang tải ảnh cưới...</span>
        </div>
      )}

      {/* Error Fallback */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10 p-4 text-center">
          <span className="text-gray-400 text-xl mb-1">🖼️</span>
          <span className="text-gray-400 text-xs font-sans">Không thể tải ảnh</span>
        </div>
      )}

      {/* The Image */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-all duration-700 ease-out ${isLoaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
          } group-hover:scale-105`}
      />

      {/* Hover Glass Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm shadow-md flex items-center justify-center text-pink-500 text-xl font-bold transition-all duration-300"
        >
          ❤️
        </motion.div>
      </div>
    </div>
  )
}

// Helper component for Lightbox image with loader
function LightboxImage({ src, alt }) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="relative max-w-[90vw] max-h-[80vh] flex items-center justify-center">
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin mb-3" />
          <span className="text-white/70 text-xs font-light">Đang tải ảnh gốc chất lượng cao...</span>
        </div>
      )}
      <motion.img
        key={src}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: isLoaded ? 1 : 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index) => {
    setCurrentIndex(index)
    setSelectedImage(config.gallery[index])
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % config.gallery.length
    setCurrentIndex(newIndex)
    setSelectedImage(config.gallery[newIndex])
  }

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + config.gallery.length) % config.gallery.length
    setCurrentIndex(newIndex)
    setSelectedImage(config.gallery[newIndex])
  }

  const getGridClass = (index) => {
    const classes = [
      'col-span-2 row-span-2 aspect-[2/3] md:aspect-square', // 1 (Large)
      'col-span-1 row-span-1 aspect-square',                 // 2
      'col-span-1 row-span-1 aspect-square',                 // 3
      'col-span-1 row-span-2 aspect-[3/4]',                  // 4 (Tall)
      'col-span-1 row-span-2 aspect-[3/4]',                  // 4 (Tall)
      'col-span-2 row-span-1 aspect-[2/1] md:aspect-[16/9]', // 5 (Wide)
    ]
    return classes[index % classes.length] || 'col-span-1 row-span-1 aspect-square'
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-rose-50/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-serif text-gray-800 mb-2">Album Ảnh</h2>
          <div className="w-16 h-0.5 bg-pink-300 mx-auto rounded-full mt-3 opacity-60" />
        </motion.div>

        {/* Collage Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {config.gallery.map((image, index) => {
            const gridClass = getGridClass(index)
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className={gridClass}
              >
                <GalleryImage
                  src={image}
                  alt={`Ảnh cưới ${index + 1}`}
                  onClick={() => openLightbox(index)}
                />
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-55"
              onClick={closeLightbox}
            >
              <X className="w-8 h-8" />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-55"
              onClick={(e) => { e.stopPropagation(); prevImage() }}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <LightboxImage src={selectedImage} alt={`Ảnh cưới phóng to ${currentIndex + 1}`} />

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-55"
              onClick={(e) => { e.stopPropagation(); nextImage() }}
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Photo Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-light select-none">
              {currentIndex + 1} / {config.gallery.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
