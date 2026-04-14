import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import SectionReveal from '../components/SectionReveal'
import TiltCard from '../components/TiltCard'
import { skills } from '../assets/data'

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
      lx: center + Math.cos(angle) * (radius + 22),
      ly: center + Math.sin(angle) * (radius + 22),
    }
  })

  const polygon = coordinates.map((point) => `${point.x},${point.y}`).join(' ')

  return (
    <div className="card-surface rounded-2xl p-6">
      <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{title}</p>
      <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto h-64 w-64">
        <circle cx={center} cy={center} r={radius} fill="none" stroke="var(--border)" strokeDasharray="4 4" />
        <polygon points={polygon} fill="color-mix(in srgb, var(--accent) 28%, transparent)" stroke="var(--accent)" strokeWidth="2" />
        {coordinates.map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.y} r="4" fill="var(--accent)" />
            <text x={point.lx} y={point.ly} textAnchor="middle" className="fill-[var(--text-muted)] text-[10px]">
              {point.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
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

    return [...byName].sort((a, b) => {
      if (sortMode === 'asc') return a.level - b.level
      return b.level - a.level
    })
  }, [entries, activeCategory, query, sortMode])

  return (
    <SectionReveal id="skills" className="section-gap">
      <div className="container-shell">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">{sectionText.skills.sectionTag}</p>
            <h2 className="section-title text-3xl font-bold sm:text-4xl">{navLabels.skills}</h2>
          </div>
        </div>

        <div className="mb-6 grid gap-6 xl:grid-cols-[1.1fr_1.9fr]">
          <RadarChart title={sectionText.skills.radarTitle} points={radarPoints} />

          <div className="card-surface rounded-2xl p-6">
            <div className="mb-4 flex flex-wrap gap-2">
              {entries.map(([category]) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    activeCategory === category
                      ? 'border-[var(--accent)] bg-[color:color-mix(in_srgb,var(--accent)_18%,transparent)] text-[var(--text)]'
                      : 'border-[var(--border)] text-[var(--text-muted)]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_auto]">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={sectionText.skills.searchPlaceholder}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm outline-none"
              />
              <button
                onClick={() => setSortMode((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
                className="rounded-xl border border-[var(--border)] px-3 py-2 text-xs font-semibold text-[var(--text-muted)]"
              >
                {sectionText.skills.sortLabel}: {sortMode === 'desc' ? sectionText.skills.highToLow : sectionText.skills.lowToHigh}
              </button>
            </div>

            <div className="space-y-3">
              {activeSkills.map((skill) => (
                <motion.div key={`${activeCategory}-${skill.name}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                  <div className="mb-1 flex items-center justify-between text-xs text-[var(--text-muted)]">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--surface)]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45 }}
                      className="h-full rounded-full bg-[var(--accent)]"
                    />
                  </div>
                </motion.div>
              ))}
              {activeSkills.length === 0 && <p className="text-xs text-[var(--text-muted)]">{sectionText.skills.noMatch}</p>}
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {entries.map(([category, list], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className=""
            >
              <TiltCard className="card-surface rounded-2xl p-6">
                <h3 className="mb-5 text-lg font-semibold">{category}</h3>

                <div className="flex flex-wrap gap-2">
                  {list.map((skill) => (
                    <span
                      key={`${category}-${skill.name}`}
                      className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--text-muted)]"
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
