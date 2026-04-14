import { motion } from 'framer-motion'
import { FiCompass, FiFeather, FiTarget } from 'react-icons/fi'
import SectionReveal from '../components/SectionReveal'
import { aboutContent, languages, portfolioData } from '../assets/data'

export default function AboutSection({ language, setLanguage, navLabels, sectionText }) {
  const aboutText = sectionText.about

  return (
    <SectionReveal id="about" className="section-gap">
      <div className="container-shell">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="section-title text-3xl font-bold sm:text-4xl">{navLabels.about}</h2>

          <div className="card-surface flex overflow-hidden rounded-full p-1 text-sm font-semibold">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`rounded-full px-4 py-2 transition ${
                  language === lang ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-muted)]'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="card-surface rounded-3xl p-7 sm:p-10">
            <p className="mb-5 text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">{aboutText.sectionTag}</p>
            <motion.p
              key={language}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="max-w-4xl text-base leading-8 text-[var(--text-muted)] sm:text-lg"
            >
              {aboutContent[language]}
            </motion.p>

            <div className="mt-7 border-t border-[var(--border)] pt-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{aboutText.journeyTitle}</p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--text-muted)]">
                {portfolioData.personal.journey[language].map((item, index) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-[var(--accent)]" />
                    <span>{item}</span>
                    {index < portfolioData.personal.journey[language].length - 1 && (
                      <span className="mx-2 mt-2 h-px flex-1 bg-[var(--border)]" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="card-surface relative overflow-hidden rounded-3xl p-7"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[color:color-mix(in_srgb,var(--accent)_24%,transparent)] blur-2xl" />
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">{aboutText.signatureTag}</p>
            <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">{portfolioData.personal.philosophy[language]}</p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm">
                <FiTarget className="text-[var(--accent)]" />
                <span className="text-[var(--text-muted)]">Outcome-driven engineering</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm">
                <FiCompass className="text-[var(--accent)]" />
                <span className="text-[var(--text-muted)]">System clarity and scalability</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm">
                <FiFeather className="text-[var(--accent)]" />
                <span className="text-[var(--text-muted)]">Clean, human-centered interfaces</span>
              </div>
            </div>

            <div className="mt-8 border-t border-[var(--border)] pt-4 text-sm font-semibold">NSENGIMANA Olivier</div>
          </motion.div>
        </div>
      </div>
    </SectionReveal>
  )
}
