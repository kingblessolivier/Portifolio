import { motion } from 'framer-motion'
import { FiDatabase, FiLayers, FiMonitor, FiArrowRight, FiZap } from 'react-icons/fi'
import SectionReveal from '../components/SectionReveal'
import SectionHeader from '../components/SectionHeader'

const LAYER_CONFIG = [
  { icon: FiMonitor,  colorIdx: 0, accent: 'var(--accent)',         bg: 'color-mix(in srgb,var(--accent) 10%,var(--surface))',         border: 'color-mix(in srgb,var(--accent) 22%,var(--border))' },
  { icon: FiLayers,   colorIdx: 1, accent: 'var(--accent-purple)',  bg: 'color-mix(in srgb,var(--accent-purple) 10%,var(--surface))',  border: 'color-mix(in srgb,var(--accent-purple) 22%,var(--border))' },
  { icon: FiDatabase, colorIdx: 2, accent: '#10b981',               bg: 'color-mix(in srgb,#10b981 10%,var(--surface))',               border: 'color-mix(in srgb,#10b981 22%,var(--border))' },
]

function LayerCard({ title, items, delay, config }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="card-surface card-hover relative overflow-hidden rounded-2xl border border-[var(--border)] p-6"
    >
      {/* Accent top bar */}
      <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl" style={{ background: `linear-gradient(90deg,${config.accent},transparent)` }} />

      {/* Icon */}
      <div
        className="mb-5 inline-flex rounded-xl p-3 text-xl"
        style={{ background: config.bg, color: config.accent, border: `1px solid ${config.border}` }}
      >
        <config.icon />
      </div>

      <h3 className="mb-4 text-base font-bold text-[var(--text)]">{title}</h3>

      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-sm text-[var(--text-muted)]">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: config.accent }} />
            {item}
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

export default function SystemDesignSection({ sectionText }) {
  const t = sectionText.systems

  return (
    <SectionReveal id="systems" className="section-gap">
      <div className="container-shell">
        <SectionHeader
          tag="Architecture"
          title={t.title}
          subtitle={t.subtitle}
        />

        {/* Layer cards */}
        <div className="mb-6 grid gap-5 lg:grid-cols-3">
          {[
            { title: t.frontend, items: t.frontendItems },
            { title: t.backend,  items: t.backendItems  },
            { title: t.data,     items: t.dataItems     },
          ].map(({ title, items }, i) => (
            <LayerCard key={title} title={title} items={items} delay={i * 0.07} config={LAYER_CONFIG[i]} />
          ))}
        </div>

        {/* Flow diagram */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card-surface overflow-hidden rounded-2xl border border-[var(--border)] p-6"
        >
          <div className="mb-5 flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-xl text-white"
              style={{ background: 'linear-gradient(135deg,var(--accent),var(--accent-purple))' }}
            >
              <FiZap size={14} />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">{t.flowTitle}</p>
              <p className="text-sm font-bold text-[var(--text)]">Request → Response lifecycle</p>
            </div>
          </div>

          {/* Steps row */}
          <div className="flex items-center gap-2">
            {t.flow.map((step, i) => (
              <>
                <motion.div
                  key={step}
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.3 + i * 0.08 }}
                  className="flow-step flex-1"
                >
                  <span className="flow-step-num">{t.stepLabel} {i + 1}</span>
                  <span className="text-[11px] font-semibold leading-tight text-[var(--text)]">{step}</span>
                </motion.div>

                {i < t.flow.length - 1 && (
                  <motion.div
                    key={`arr-${i}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.08 }}
                    className="hidden shrink-0 text-[var(--text-muted)] lg:block"
                  >
                    <FiArrowRight size={14} />
                  </motion.div>
                )}
              </>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionReveal>
  )
}