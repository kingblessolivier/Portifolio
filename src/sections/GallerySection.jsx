import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMaximize2 } from 'react-icons/fi'
import { HiXMark } from 'react-icons/hi2'
import SectionReveal from '../components/SectionReveal'
import { galleryImages } from '../assets/data'

export default function GallerySection({ navLabels, sectionText, language }) {
  const [activeImage, setActiveImage] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')

  const categoryLabels = sectionText.gallery.categories
  const categories = ['All', ...Object.keys(categoryLabels)]
  const visibleImages =
    activeCategory === 'All' ? galleryImages : galleryImages.filter((item) => item.category === activeCategory)

  return (
    <SectionReveal id="gallery" className="section-gap">
      <div className="container-shell">
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">{sectionText.gallery.sectionTag}</p>
        <h2 className="section-title mb-12 text-3xl font-bold sm:text-4xl">{navLabels.gallery}</h2>

        <div className="mb-7 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                activeCategory === category
                  ? 'border-[var(--accent)] bg-[color:color-mix(in_srgb,var(--accent)_18%,transparent)] text-[var(--text)]'
                  : 'border-[var(--border)] text-[var(--text-muted)]'
              }`}
            >
              {category === 'All' ? sectionText.gallery.all : categoryLabels[category]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleImages.map((item, index) => (
            <motion.figure
              key={`${item.title}-${item.image}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="card-surface group relative overflow-hidden rounded-2xl"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                onClick={() => setActiveImage(item)}
                className="aspect-[4/3] w-full cursor-zoom-in object-cover transition duration-300 hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-3">
                <p className="text-xs font-semibold text-white">{item.title[language] ?? item.title.EN}</p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="rounded-full border border-white/35 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/85">
                    {categoryLabels[item.category]}
                  </span>
                  <span className="rounded-full border border-white/35 bg-black/20 p-1 text-white/90 opacity-0 transition group-hover:opacity-100">
                    <FiMaximize2 size={12} />
                  </span>
                </div>
              </div>
            </motion.figure>
          ))}
        </div>

        <AnimatePresence>
          {activeImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] bg-black/80 p-4 backdrop-blur-sm"
              onClick={() => setActiveImage(null)}
            >
              <button
                onClick={() => setActiveImage(null)}
                className="card-surface absolute right-6 top-6 rounded-full p-2 text-xl"
                aria-label="Close image preview"
              >
                <HiXMark />
              </button>

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.22 }}
                className="mx-auto flex h-full max-w-5xl items-center justify-center"
              >
                <img
                  src={activeImage.image}
                  alt={activeImage.title}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  sizes="100vw"
                  className="max-h-[86vh] w-full rounded-2xl object-contain"
                  onClick={(event) => event.stopPropagation()}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionReveal>
  )
}
