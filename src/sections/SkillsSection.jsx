import { useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SectionReveal from '../components/SectionReveal'
import TiltCard from '../components/TiltCard'
import { skills } from '../assets/data'

/* ── Animated Radar Chart ────────────────────────────── */
function RadarChart({ title, points }) {
  const size = 240
  const center = size / 2
  const radius = 84
  const step = (Math.PI * 2) / points.length

  const coordinates = points.map((point, index) => {
    const angle = -Math.PI / 2 + step * index
    const valueRadius = (point.value / 100) * radius
    return {
      ...point,
      x: center + Math.cos(angle) * valueRadius,
      y: center + Math.sin(angle) * valueRadius,
      lx: center + Math.cos(angle) * (radius + 24),
      ly: center + Math.sin(angle) * (radius + 24),
      gx: center + Math.cos(angle) * radius,
      gy: center + Math.sin(angle) * radius,
    }
  })

  const polygon = coordinates.map((p) => `${p.x},${p.y}`).join(' ')
  const outerPolygon = coordinates.map((p) => `${p.gx},${p.gy}`).join(' ')

  return (
    <div className="card-surface card-shimmer rounded-2xl p-6">
      <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{title}</p>
      <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto h-64 w-64">
        {/* Background rings */}
        {[0.25, 0.5, 0.75, 1].map((scale) => (
          <circle
            key={scale}
            cx={center}
            cy={center}
            r={radius * scale}
            fill="none"
            stroke="var(--border)"
            strokeDasharray={scale === 1 ? '4 4' : '2 4'}
            strokeWidth={scale === 1 ? 1.2 : 0.8}
          />
        ))}

        {/* Spoke lines */}
        {coordinates.map((p) => (
          <line
            key={`spoke-${p.label}`}
            x1={center}
            y1={center}
            x2={p.gx}
            y2={p.gy}
            stroke="var(--border)"
            strokeWidth="0.8"
          />
        ))}

        {/* Filled area — animate clip */}
        <motion.polygon
          points={polygon}
          fill="color-mix(in srgb, var(--accent) 22%, transparent)"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinejoin="round"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: `${center}px ${center}px` }}
        />

        {/* Data point dots with glow */}
        {coordinates.map((p, i) => (
          <motion.g
            key={p.label}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.5 + i * 0.07 }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          >
            {/* Glow ring */}
            <circle cx={p.x} cy={p.y} r="6" fill="color-mix(in srgb, var(--accent) 20%, transparent)" />
            <circle cx={p.x} cy={p.y} r="3.5" fill="var(--accent)" />
            <text
              x={p.lx}
              y={p.ly}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-[var(--text-muted)]"
              fontSize="9"
              fontWeight="600"
            >
              {p.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  )
}

/* ── Skill progress bar ──────────────────────────────── */
function SkillBar({ skill, category, index }) {
  const hue = skill.level >= 80 ? 'var(--accent)' : skill.level >= 60 ? 'var(--accent)' : 'var(--accent-purple)'

  return (
    <motion.div
      key={`${category}-${skill.name}`}
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
    >
      <div className="mb-1.5 flex items-center justify-between text-xs text-[var(--text-muted)]">
        <span className="font-medium text-[var(--text)]">{skill.name}</span>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + index * 0.04 }}
          className="font-semibold"
          style={{ color: hue }}
        >
          {skill.level}%
        </motion.span>
      </div>
      <div className="progress-track h-2 rounded-full bg-[var(--surface)]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
          className="progress-fill h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, var(--accent), var(--accent-purple))`,
            boxShadow: `0 0 10px -3px color-mix(in srgb, var(--accent) 55%, transparent)`,
          }}
        />
      </div>
    </motion.div>
  )
}

export default function SkillsSection({ navLabels, sectionText }) {
  const entries = Object.entries(skills)
  const [activeCategory, setActiveCategory] = useState(entries[0]?.[0] ?? 'Frontend')
  const [query, setQuery] = useState('')
  const [sortMode, setSortMode] = useState('desc')

  const radarPoints = entries.map(([category, list]) => {
    const average = Math.round(list.reduce((sum, skill) => sum + skill.level, 0) / list.length)
    return { label: category, value: average }
  })

  const activeSkills = useMemo(() => {
    const selected = entries.find(([category]) => category === activeCategory)?.[1] ?? []
    const byName = selected.filter((item) => item.name.toLowerCase().includes(query.trim().toLowerCase()))
    return [...byName].sort((a, b) => sortMode === 'asc' ? a.level - b.level : b.level - a.level)
  }, [entries, activeCategory, query, sortMode])

  return (
    <SectionReveal id="skills" className="section-gap">
      <div className="container-shell">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="section-tag mb-3 block w-fit">{sectionText.skills.sectionTag}</span>
            <h2 className="section-title text-3xl font-bold sm:text-4xl">{navLabels.skills}</h2>
          </div>
        </div>

        <div className="mb-6 grid gap-6 xl:grid-cols-[1.1fr_1.9fr]">
          <RadarChart title={sectionText.skills.radarTitle} points={radarPoints} />

          <div className="card-surface rounded-2xl p-6">
            {/* Category tabs */}
            <div className="mb-5 flex flex-wrap gap-2">
              {entries.map(([category]) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  whileTap={{ scale: 0.95 }}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                    activeCategory === category
                      ? 'border-[var(--accent)] bg-[color:color-mix(in_srgb,var(--accent)_16%,transparent)] text-[var(--text)]'
                      : 'border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--text)]'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Search + sort */}
            <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_auto]">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={sectionText.skills.searchPlaceholder}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[color:color-mix(in_srgb,var(--accent)_25%,transparent)]"
              />
              <button
                onClick={() => setSortMode((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
                className="rounded-xl border border-[var(--border)] px-3 py-2 text-xs font-semibold text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--text)]"
              >
                {sectionText.skills.sortLabel}: {sortMode === 'desc' ? sectionText.skills.highToLow : sectionText.skills.lowToHigh}
              </button>
            </div>

            <div className="space-y-3.5">
              {activeSkills.map((skill, index) => (
                <SkillBar key={`${activeCategory}-${skill.name}`} skill={skill} category={activeCategory} index={index} />
              ))}
              {activeSkills.length === 0 && (
                <p className="text-xs text-[var(--text-muted)]">{sectionText.skills.noMatch}</p>
              )}
            </div>
          </div>
        </div>

        {/* Category cards grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {entries.map(([category, list], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <TiltCard className="card-surface card-shimmer rounded-2xl p-6 transition hover:shadow-[0_20px_52px_-28px_rgba(59,130,246,0.35)]">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-base font-semibold">{category}</h3>
                  <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-[10px] text-[var(--text-muted)]">
                    {list.length} skills
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {list.map((skill) => (
                    <span
                      key={`${category}-${skill.name}`}
                      className="skill-tag cursor-default rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--text-muted)]"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionReveal>
  )
}
