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
            <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">{text.sectionTag}</p>
            <h2 className="section-title text-3xl font-bold sm:text-4xl">{text.title}</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[var(--text-muted)]">{text.focus}</p>
        </div>

        <div className="relative space-y-5">
          <div className="pointer-events-none absolute left-4 top-2 hidden h-[calc(100%-1rem)] w-px bg-[var(--border)] sm:block" />
          {portfolioData.workExperience.map((item, index) => (
            <motion.article
              key={`${item.company}-${item.role.EN}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="card-surface relative rounded-2xl p-6 sm:ml-10"
            >
              <span className="absolute -left-6 top-6 hidden rounded-full border border-[var(--border)] bg-[var(--bg)] p-2 text-[var(--accent)] sm:inline-flex">
                <FiBriefcase size={14} />
              </span>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{item.role[language]}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{item.company}</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-muted)]">
                  <FiClock size={12} />
                  {item.duration[language]}
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">{item.details[language]}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-10">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{text.educationTitle}</p>

          {portfolioData.education.map((item, index) => (
            <motion.article
              key={`${item.institution.EN}-${item.degree.EN}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="card-surface rounded-2xl p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2">
                  <span className="rounded-full border border-[var(--border)] bg-[var(--bg)] p-2 text-[var(--accent)]">
                    <FiBookOpen size={15} />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{item.degree[language]}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{item.institution[language]}</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-muted)]">
                  <FiClock size={12} />
                  {text.expectedGraduationLabel}: {item.expectedGraduation}
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">{item.details[language]}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionReveal>
  )
}
