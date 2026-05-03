import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const GITHUB_USERNAME = 'kingblessolivier'
const WEEKS = 52
const DAYS = 7

/* ── Seeded PRNG so fallback data looks the same every render ── */
function seededRand(seed) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

function buildFallback() {
  const cells = []
  const now = new Date()
  for (let i = WEEKS * DAYS - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const r = seededRand(d.getTime() / 86400000)
    let level = 0
    if (r > 0.55) level = 1
    if (r > 0.70) level = 2
    if (r > 0.82) level = 3
    if (r > 0.92) level = 4
    cells.push({ date: d.toISOString().slice(0, 10), level })
  }
  return cells
}

/* ── Map level → CSS opacity class ── */
const LEVEL_STYLE = {
  0: 'bg-[var(--heatmap-0)]',
  1: 'bg-[var(--heatmap-1)]',
  2: 'bg-[var(--heatmap-2)]',
  3: 'bg-[var(--heatmap-3)]',
  4: 'bg-[var(--heatmap-4)]',
}

export default function GitHubHeatmap() {
  const [cells, setCells] = useState([])
  const [total, setTotal] = useState(null)
  const [hovered, setHovered] = useState(null)
  const [live, setLive] = useState(false)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
          { signal: AbortSignal.timeout(4000) }
        )
        if (!res.ok) throw new Error()
        const json = await res.json()
        if (cancelled) return
        const list = json.contributions ?? []
        setCells(list.slice(-WEEKS * DAYS))
        setTotal(json.total?.lastYear ?? list.reduce((s, c) => s + (c.count ?? 0), 0))
        setLive(true)
      } catch {
        if (!cancelled) setCells(buildFallback())
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  /* split flat list into weeks (columns) */
  const weeks = []
  for (let w = 0; w < WEEKS; w++) {
    weeks.push(cells.slice(w * DAYS, w * DAYS + DAYS))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="card-surface rounded-2xl p-5"
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
            GitHub Activity
          </p>
          {total !== null && (
            <p className="mt-0.5 text-sm font-semibold text-[var(--text)]">
              <span className="text-[var(--accent)]">{total.toLocaleString()}</span>
              &nbsp;contributions this year
            </p>
          )}
        </div>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3 py-1 text-[10px] font-medium text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          {live ? (
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" style={{ boxShadow: '0 0 6px var(--success)' }} />
          ) : (
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-muted)]" />
          )}
          @{GITHUB_USERNAME}
        </a>
      </div>

      {/* Grid */}
      <div className="relative overflow-x-auto">
        <div className="flex gap-[3px]" style={{ minWidth: 'max-content' }}>
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((cell, di) => (
                <div
                  key={di}
                  onMouseEnter={() => setHovered(cell)}
                  onMouseLeave={() => setHovered(null)}
                  className={`h-[10px] w-[10px] rounded-[2px] transition-all duration-150 cursor-default ${
                    LEVEL_STYLE[cell.level] ?? LEVEL_STYLE[0]
                  } ${hovered?.date === cell.date ? 'scale-125 ring-1 ring-[var(--accent)]' : ''}`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Tooltip */}
        {hovered && (
          <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[10px] text-[var(--text-muted)] shadow-lg">
            {hovered.date}
            {hovered.level > 0 && (
              <span className="ml-1 font-semibold text-[var(--accent)]">
                · level {hovered.level}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center gap-1.5 text-[10px] text-[var(--text-muted)]">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <div key={l} className={`h-[10px] w-[10px] rounded-[2px] ${LEVEL_STYLE[l]}`} />
        ))}
        <span>More</span>
      </div>
    </motion.div>
  )
}