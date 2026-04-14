import { motion } from 'framer-motion'
import { FiDatabase, FiLayers, FiMonitor, FiArrowRight } from 'react-icons/fi'
import SectionReveal from '../components/SectionReveal'
import { portfolioData } from '../assets/data'

function LayerCard({ title, items, delay, icon }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -6 }}
      className="card-surface rounded-2xl p-6"
    >
      <div className="mb-4 inline-flex rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2 text-[var(--accent)]">{icon}</div>
      <h3 className="text-base font-semibold">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm text-[var(--text-muted)]">
        {items.map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
    </motion.article>
  )
}

export default function SystemDesignSection({ sectionText }) {
  const systemText = sectionText.systems

  return (
    <SectionReveal id="systems" className="section-gap">
      <div className="container-shell">
        <div className="mb-10 max-w-3xl">
          <h2 className="section-title text-3xl font-bold sm:text-4xl">{systemText.title}</h2>
          <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">{systemText.subtitle}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <LayerCard title={systemText.frontend} items={portfolioData.systemDesign.frontend} delay={0.02} icon={<FiMonitor />} />
          <LayerCard title={systemText.backend} items={portfolioData.systemDesign.backend} delay={0.08} icon={<FiLayers />} />
          <LayerCard title={systemText.data} items={portfolioData.systemDesign.data} delay={0.14} icon={<FiDatabase />} />
        </div>

        <div className="card-surface mt-6 rounded-2xl p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{systemText.flowTitle}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {systemText.flow.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="relative rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-center text-sm"
              >
                <p className="text-[11px] uppercase tracking-wide text-[var(--text-muted)]">Step {index + 1}</p>
                <p className="mt-1 font-medium">{step}</p>
                {index < systemText.flow.length - 1 && (
                  <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-[var(--border)] bg-[var(--bg)] p-1 text-[var(--text-muted)] lg:inline-flex">
                    <FiArrowRight size={12} />
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  )
}
