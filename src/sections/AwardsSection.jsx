import { motion } from 'framer-motion'
import { HiOutlineAcademicCap } from 'react-icons/hi2'
import SectionReveal from '../components/SectionReveal'
import { awards } from '../assets/data'

export default function AwardsSection({ navLabels, sectionText }) {
  return (
    <SectionReveal id="awards" className="section-gap">
      <div className="container-shell">
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">{sectionText.awards.sectionTag}</p>
        <h2 className="section-title mb-12 text-3xl font-bold sm:text-4xl">{navLabels.awards}</h2>

        <div className="relative grid gap-6 sm:grid-cols-2">
          <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-[var(--border)] sm:block" />
          {awards.map((award, index) => (
            <motion.article
              key={award.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="card-surface flex items-start gap-4 rounded-2xl p-6 transition hover:-translate-y-2.5 hover:shadow-[0_20px_52px_-28px_rgba(139,92,246,0.45)]"
            >
              <div className="rounded-xl bg-[var(--surface)] p-2 text-xl text-[var(--accent)]">
                <HiOutlineAcademicCap />
              </div>
              <div>
                <h3 className="font-semibold">{award.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-muted)]">{award.description}</p>
                <p className="mt-2 text-xs uppercase tracking-wide text-[var(--text-muted)]">
                  {award.issuer} - {award.year}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionReveal>
  )
}
