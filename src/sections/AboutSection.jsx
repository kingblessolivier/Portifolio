import { motion } from 'framer-motion'
import { FiCompass, FiFeather, FiTarget } from 'react-icons/fi'
import SectionReveal from '../components/SectionReveal'
import { aboutContent, languages, portfolioData } from '../assets/data'

const traitIcons = {
  0: FiTarget,
  1: FiCompass,
  2: FiFeather,
}

export default function AboutSection({ language, setLanguage, navLabels, sectionText }) {
  const aboutText = sectionText.about

  const traitLabels = [aboutText.trait1, aboutText.trait2, aboutText.trait3]

  return (
    <SectionReveal id="about" className="section-gap">
      <div className="container-shell">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="section-tag mb-3 block w-fit">{aboutText.sectionTag}</span>
            <h2 className="section-title text-3xl font-bold sm:text-4xl">{navLabels.about}</h2>
          </div>

          {/* Language switcher */}
          <div className="card-surface flex overflow-hidden rounded-full p-1 text-sm font-semibold">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`rounded-full px-4 py-2 transition ${
                  language === lang
                    ? 'bg-[var(--accent)] text-white'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          {/* Main bio card */}
          <div className="card-surface card-shimmer rounded-3xl p-7 sm:p-10">
            <motion.p
              key={language}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="max-w-4xl text-base leading-8 text-[var(--text-muted)] sm:text-lg"
            >
              {aboutContent[language]}
            </motion.p>

            {/* Journey milestones */}
            <div className="mt-8 border-t border-[var(--border)] pt-6">
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                {aboutText.journeyTitle}
              </p>
              <ul className="space-y-3">
                {portfolioData.personal.journey[language].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.38, delay: index * 0.07 }}
                    className="flex items-start gap-3 text-sm text-[var(--text-muted)]"
                  >
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                      style={{
                        background: index % 2 === 0 ? 'var(--accent)' : 'var(--accent-purple)',
                        boxShadow: `0 0 8px -2px ${index % 2 === 0 ? 'color-mix(in srgb, var(--accent) 55%, transparent)' : 'color-mix(in srgb, var(--accent-purple) 55%, transparent)'}`,
                      }}
                    />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Philosophy card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-surface relative overflow-hidden rounded-3xl p-7"
          >
            {/* Background glow */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[color:color-mix(in_srgb,var(--accent)_20%,transparent)] blur-3xl" />
            <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-[color:color-mix(in_srgb,var(--accent-purple)_15%,transparent)] blur-2xl" />

            <p className="relative text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">
              {aboutText.signatureTag}
            </p>
            <p className="relative mt-4 text-sm leading-7 text-[var(--text-muted)]">
              {portfolioData.personal.philosophy[language]}
            </p>

            <div className="relative mt-6 space-y-2.5">
              {[0, 1, 2].map((i) => {
                const Icon = traitIcons[i]
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                    className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm transition hover:border-[color:color-mix(in_srgb,var(--accent)_35%,var(--border))] hover:bg-[color:color-mix(in_srgb,var(--accent)_5%,var(--surface))]"
                  >
                    <Icon className="shrink-0 text-[var(--accent)]" />
                    <span className="text-[var(--text-muted)]">{traitLabels[i]}</span>
                  </motion.div>
                )
              })}
            </div>

            <div className="relative mt-8 border-t border-[var(--border)] pt-4">
              <p className="text-sm font-bold">NSENGIMANA Olivier</p>
              <p
                className="mt-0.5 text-xs font-medium"
                style={{ color: 'var(--accent)' }}
              >
                {aboutText.fullStackLabel}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionReveal>
  )
}
