import { motion } from 'framer-motion'
import { FiCompass, FiFeather, FiTarget, FiCode, FiLayers, FiCpu } from 'react-icons/fi'
import SectionReveal from '../components/SectionReveal'
import SectionHeader from '../components/SectionHeader'
import { aboutContent, languages, portfolioData } from '../assets/data'

const traitIcons = [FiTarget, FiCompass, FiFeather]
const statItems = [
  { icon: FiCode,   label: 'Projects',  value: '21+' },
  { icon: FiLayers, label: 'Systems',   value: '10+' },
  { icon: FiCpu,    label: 'AI Focus',  value: '100%' },
]

export default function AboutSection({ language, setLanguage, navLabels, sectionText }) {
  const aboutText = sectionText.about
  const traitLabels = [aboutText.trait1, aboutText.trait2, aboutText.trait3]

  return (
    <SectionReveal id="about" className="section-gap">
      <div className="container-shell">

        {/* ── Header row ── */}
        <div className="mb-2 flex flex-wrap items-start justify-between gap-4">
          <SectionHeader tag={aboutText.sectionTag} title={navLabels.about} />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-surface flex overflow-hidden rounded-full p-1 text-xs font-semibold"
          >
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`rounded-full px-4 py-2 transition ${
                  language === lang
                    ? 'bg-[var(--accent)] text-white shadow-[0_2px_10px_-2px_color-mix(in_srgb,var(--accent)_60%,transparent)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                {lang}
              </button>
            ))}
          </motion.div>
        </div>

        {/* ── Main grid ── */}
        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">

          {/* LEFT — story card */}
          <div className="card-surface card-shimmer card-hover relative overflow-hidden rounded-3xl p-8 sm:p-10">
            <span className="pointer-events-none absolute -top-4 right-6 select-none text-[10rem] font-black leading-none text-[var(--accent)] opacity-[0.04]">"</span>

            <motion.p
              key={language}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="relative text-[15px] leading-[2] text-[var(--text-muted)] sm:text-base"
            >
              {aboutContent[language]}
            </motion.p>

            {/* Journey steps */}
            <div className="relative mt-8 border-t border-[var(--border)] pt-6">
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                {aboutText.journeyTitle}
              </p>
              <ul className="space-y-4">
                {portfolioData.personal.journey[language].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-start gap-4"
                  >
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                      style={{
                        background: i % 2 === 0 ? 'var(--accent)' : 'var(--accent-purple)',
                        boxShadow: `0 0 10px -2px ${i % 2 === 0 ? 'color-mix(in srgb,var(--accent) 50%,transparent)' : 'color-mix(in srgb,var(--accent-purple) 50%,transparent)'}`,
                      }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm leading-7 text-[var(--text-muted)]">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Stat strip */}
            <div className="relative mt-8 grid grid-cols-3 gap-3 border-t border-[var(--border)] pt-6">
              {statItems.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                  <Icon size={16} className="text-[var(--accent)]" />
                  <span className="text-xl font-black text-[var(--text)]">{value}</span>
                  <span className="text-[10px] uppercase tracking-wide text-[var(--text-muted)]">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — philosophy + traits */}
          <div className="flex flex-col gap-5">

            {/* Philosophy card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card-surface relative overflow-hidden rounded-3xl p-7"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[color:color-mix(in_srgb,var(--accent)_18%,transparent)] blur-3xl" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-[color:color-mix(in_srgb,var(--accent-purple)_14%,transparent)] blur-2xl" />

              <p className="relative text-[9px] font-semibold uppercase tracking-[0.26em] text-[var(--accent)]">
                {aboutText.signatureTag}
              </p>
              <p className="relative mt-4 text-sm font-medium leading-[1.9] text-[var(--text)]">
                "{portfolioData.personal.philosophy[language]}"
              </p>

              <div className="relative mt-6 flex items-center gap-3 border-t border-[var(--border)] pt-4">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-black text-white"
                  style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-purple))' }}
                >
                  N
                </div>
                <div>
                  <p className="text-sm font-bold text-[var(--text)]">NSENGIMANA Olivier</p>
                  <p className="text-[11px] text-[var(--accent)]">{aboutText.fullStackLabel}</p>
                </div>
              </div>
            </motion.div>

            {/* Trait cards */}
            <div className="space-y-3">
              {traitLabels.map((trait, i) => {
                const Icon = traitIcons[i]
                return (
                  <motion.div
                    key={trait}
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.09 }}
                    className="card-surface card-hover flex items-center gap-4 rounded-2xl border border-[var(--border)] px-5 py-4"
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        background: 'linear-gradient(135deg, color-mix(in srgb,var(--accent) 18%,var(--surface)), color-mix(in srgb,var(--accent-purple) 14%,var(--surface)))',
                        border: '1px solid color-mix(in srgb,var(--accent) 22%,var(--border))',
                        color: 'var(--accent)',
                      }}
                    >
                      <Icon size={15} />
                    </span>
                    <span className="text-sm font-medium text-[var(--text-muted)]">{trait}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  )
}