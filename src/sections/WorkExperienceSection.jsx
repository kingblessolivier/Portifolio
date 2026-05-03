import { motion } from 'framer-motion'
import { FiBookOpen, FiBriefcase, FiCalendar } from 'react-icons/fi'
import SectionReveal from '../components/SectionReveal'
import SectionHeader from '../components/SectionHeader'
import { portfolioData } from '../assets/data'

export default function WorkExperienceSection({ language, sectionText }) {
  const text = sectionText.work

  return (
    <SectionReveal id="work" className="section-gap">
      <div className="container-shell">
        <SectionHeader
          tag={text.sectionTag}
          title={text.title}
          subtitle={text.focus}
        />

        {/* ── Work timeline ── */}
        <div className="relative space-y-4">
          {portfolioData.workExperience.map((item, index) => (
            <motion.article
              key={`${item.company}-${item.role.EN}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-surface card-hover group relative flex gap-5 overflow-hidden rounded-2xl border border-[var(--border)] p-6"
            >
              {/* Left accent bar */}
              <div className="card-accent-line shrink-0" />

              {/* Icon */}
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[var(--accent)] transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: 'linear-gradient(135deg,color-mix(in srgb,var(--accent) 16%,var(--surface)),color-mix(in srgb,var(--accent-purple) 12%,var(--surface)))',
                  border: '1px solid color-mix(in srgb,var(--accent) 22%,var(--border))',
                }}
              >
                <FiBriefcase size={16} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-[var(--text)]">{item.role[language]}</h3>
                    <p className="mt-0.5 text-sm font-semibold text-[var(--accent)]">{item.company}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3 py-1 text-[11px] text-[var(--text-muted)]">
                    <FiCalendar size={10} />
                    {item.duration[language]}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-[1.85] text-[var(--text-muted)]">{item.details[language]}</p>
              </div>

              {/* Hover corner glow */}
              <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: 'radial-gradient(circle at top right,color-mix(in srgb,var(--accent) 12%,transparent),transparent 70%)' }} />
            </motion.article>
          ))}
        </div>

        {/* ── Education ── */}
        <div className="mt-10">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-[var(--border)] to-transparent" />
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--text-muted)]">
              {text.educationTitle}
            </p>
            <div className="h-px flex-1 bg-gradient-to-l from-[var(--border)] to-transparent" />
          </div>

          <div className="space-y-4">
            {portfolioData.education.map((item, index) => (
              <motion.article
                key={`${item.institution.EN}-${item.degree.EN}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="card-surface card-hover group relative flex gap-5 overflow-hidden rounded-2xl border border-[var(--border)] p-6"
              >
                {/* Left bar — green for education */}
                <div
                  className="w-[3px] shrink-0 self-stretch rounded-full"
                  style={{ background: 'linear-gradient(to bottom,#10b981,#0891b2)' }}
                />

                {/* Icon */}
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg,color-mix(in srgb,#10b981 16%,var(--surface)),color-mix(in srgb,#0891b2 12%,var(--surface)))',
                    border: '1px solid color-mix(in srgb,#10b981 22%,var(--border))',
                    color: '#10b981',
                  }}
                >
                  <FiBookOpen size={16} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-[var(--text)]">{item.degree[language]}</h3>
                      <p className="mt-0.5 text-sm font-semibold text-[#10b981]">{item.institution[language]}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3 py-1 text-[11px] text-[var(--text-muted)]">
                      <FiCalendar size={10} />
                      {text.expectedGraduationLabel}: {item.expectedGraduation}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-[1.85] text-[var(--text-muted)]">{item.details[language]}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  )
}