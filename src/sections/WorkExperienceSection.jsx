import { motion } from 'framer-motion'
import { FiBookOpen, FiBriefcase, FiClock } from 'react-icons/fi'
import SectionReveal from '../components/SectionReveal'
import { portfolioData } from '../assets/data'

export default function WorkExperienceSection({ language, sectionText }) {
  const text = sectionText.work

  return (
    <SectionReveal id="work" className="section-gap">
      <div className="container-shell">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="section-tag mb-3 block w-fit">{text.sectionTag}</span>
            <h2 className="section-title text-3xl font-bold sm:text-4xl">{text.title}</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[var(--text-muted)]">{text.focus}</p>
        </div>

        {/* ── Work timeline ─── */}
        <div className="relative space-y-5 sm:pl-10">
          {/* Animated vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top' }}
            className="pointer-events-none absolute left-4 top-2 hidden w-0.5 sm:block"
            aria-hidden
          >
            <div className="h-full w-full bg-gradient-to-b from-[var(--accent)] via-[var(--accent-purple)] to-transparent"
              style={{ height: `calc(${portfolioData.workExperience.length} * 120px)` }}
            />
          </motion.div>

          {portfolioData.workExperience.map((item, index) => (
            <motion.article
              key={`${item.company}-${item.role.EN}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-surface card-shimmer relative rounded-2xl p-6"
            >
              {/* Pulsing timeline dot */}
              <span
                className="timeline-dot timeline-dot-pulse absolute -left-6 top-6 hidden h-3.5 w-3.5 rounded-full sm:inline-block"
                aria-hidden
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2 text-[var(--accent)]">
                    <FiBriefcase size={14} />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold">{item.role[language]}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{item.company}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-muted)]">
                  <FiClock size={11} />
                  {item.duration[language]}
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">{item.details[language]}</p>

              {/* Accent accent line */}
              <div
                className="mt-4 h-0.5 w-16 rounded-full"
                style={{ background: 'linear-gradient(90deg, var(--accent), transparent)' }}
              />
            </motion.article>
          ))}
        </div>

        {/* ── Education ─── */}
        <div className="mt-12">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[var(--border)]" />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
              {text.educationTitle}
            </p>
            <div className="h-px flex-1 bg-[var(--border)]" />
          </div>

          <div className="space-y-4">
            {portfolioData.education.map((item, index) => (
              <motion.article
                key={`${item.institution.EN}-${item.degree.EN}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="card-surface card-shimmer rounded-2xl p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-3">
                    <span
                      className="rounded-xl p-2 text-[var(--accent)]"
                      style={{
                        background:
                          'linear-gradient(135deg, color-mix(in srgb, var(--accent) 16%, var(--surface)), color-mix(in srgb, var(--accent-purple) 12%, var(--surface)))',
                        border: '1px solid color-mix(in srgb, var(--accent) 22%, var(--border))',
                      }}
                    >
                      <FiBookOpen size={15} />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold">{item.degree[language]}</h3>
                      <p className="text-sm text-[var(--text-muted)]">{item.institution[language]}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-muted)]">
                    <FiClock size={11} />
                    {text.expectedGraduationLabel}: {item.expectedGraduation}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">{item.details[language]}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  )
}
