import { motion } from 'framer-motion'
import { FiDatabase, FiLayers, FiMonitor, FiArrowRight } from 'react-icons/fi'
import SectionReveal from '../components/SectionReveal'

const layerColors = {
  0: { accent: 'var(--accent)', bg: 'color-mix(in srgb, var(--accent) 10%, var(--surface))' },
  1: { accent: 'var(--accent-purple)', bg: 'color-mix(in srgb, var(--accent-purple) 10%, var(--surface))' },
  2: { accent: '#10b981', bg: 'color-mix(in srgb, #10b981 10%, var(--surface))' },
}

function LayerCard({ title, items, delay, icon, colorIndex }) {
  const colors = layerColors[colorIndex] ?? layerColors[0]

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6 }}
      className="card-surface card-shimmer rounded-2xl p-6"
    >
      <div
        className="mb-4 inline-flex rounded-xl p-2.5 text-xl"
        style={{ background: colors.bg, color: colors.accent, border: `1px solid color-mix(in srgb, ${colors.accent} 20%, var(--border))` }}
      >
        {icon}
      </div>
      <h3 className="text-base font-semibold">{title}</h3>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: colors.accent }}
            />
            {item}
          </li>
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
          <span className="section-tag mb-3 block w-fit">Architecture</span>
          <h2 className="section-title text-3xl font-bold sm:text-4xl">{systemText.title}</h2>
          <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">{systemText.subtitle}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <LayerCard title={systemText.frontend} items={systemText.frontendItems} delay={0.02} icon={<FiMonitor />} colorIndex={0} />
          <LayerCard title={systemText.backend} items={systemText.backendItems} delay={0.08} icon={<FiLayers />} colorIndex={1} />
          <LayerCard title={systemText.data} items={systemText.dataItems} delay={0.14} icon={<FiDatabase />} colorIndex={2} />
        </div>

        {/* Flow diagram */}
        <div className="card-surface mt-6 rounded-2xl p-6">
          <p className="mb-1 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{systemText.flowTitle}</p>
          <div
            className="mb-5 h-0.5 w-12 rounded-full"
            style={{ background: 'linear-gradient(90deg, var(--accent), transparent)' }}
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {systemText.flow.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.38, delay: index * 0.07 }}
                className="relative rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-center text-sm transition hover:border-[color:color-mix(in_srgb,var(--accent)_40%,var(--border))]"
              >
                <p
                  className="text-[10px] font-bold uppercase tracking-wide"
                  style={{ color: 'var(--accent)' }}
                >
                  Step {index + 1}
                </p>
                <p className="mt-1 font-medium">{step}</p>
                {index < systemText.flow.length - 1 && (
                  <span className="absolute -right-2.5 top-1/2 hidden -translate-y-1/2 rounded-full border border-[var(--border)] bg-[var(--bg)] p-1 text-[var(--text-muted)] lg:inline-flex">
                    <FiArrowRight size={11} />
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
