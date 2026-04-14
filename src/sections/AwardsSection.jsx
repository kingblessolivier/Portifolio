import { motion } from 'framer-motion'
import { HiOutlineAcademicCap, HiOutlineStar } from 'react-icons/hi2'
import SectionReveal from '../components/SectionReveal'
import { awards } from '../assets/data'

export default function AwardsSection({ navLabels, sectionText, language }) {
  return (
    <SectionReveal id="awards" className="section-gap">
      <div className="container-shell">
        <span className="section-tag mb-3 block w-fit">{sectionText.awards.sectionTag}</span>
        <h2 className="section-title mb-12 text-3xl font-bold sm:text-4xl">{navLabels.awards}</h2>

        <div className="grid gap-5 sm:grid-cols-2">
          {awards.map((award, index) => (
            <motion.article
              key={award.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="award-card card-surface group relative flex items-start gap-5 overflow-hidden rounded-2xl p-6"
              style={{
                boxShadow: 'var(--shadow)',
                transition: 'box-shadow 0.3s ease, transform 0.3s ease',
              }}
            >
              {/* Gradient icon */}
              <div
                className="award-icon relative shrink-0 rounded-2xl p-3 text-2xl text-[var(--accent)] transition-transform duration-300 group-hover:scale-110"
              >
                <HiOutlineAcademicCap />
                {/* Sparkle on hover */}
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute -right-1 -top-1 text-xs text-yellow-400"
                >
                  <HiOutlineStar size={10} />
                </motion.span>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold leading-snug">{award.title[language] ?? award.title.EN}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{award.description[language] ?? award.description.EN}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide"
                    style={{
                      background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                      color: 'var(--accent)',
                      border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)',
                    }}
                  >
                    {award.issuer}
                  </span>
                  <span className="text-[10px] uppercase tracking-wide text-[var(--text-muted)]">
                    {award.year}
                  </span>
                </div>
              </div>

              {/* Animated corner accent */}
              <motion.div
                className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-bl-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    'radial-gradient(circle at top right, color-mix(in srgb, var(--accent-purple) 14%, transparent), transparent 70%)',
                }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </SectionReveal>
  )
}
