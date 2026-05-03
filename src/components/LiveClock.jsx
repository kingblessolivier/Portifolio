import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiMapPin } from 'react-icons/fi'

const TZ = 'Africa/Kigali'

function getTime() {
  return new Date().toLocaleTimeString('en-GB', {
    timeZone: TZ,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

function getDate() {
  return new Date().toLocaleDateString('en-GB', {
    timeZone: TZ,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

export default function LiveClock() {
  const [time, setTime] = useState(getTime)
  const [date, setDate] = useState(getDate)

  useEffect(() => {
    const id = setInterval(() => {
      setTime(getTime())
      setDate(getDate())
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const [hh, mm, ss] = time.split(':')

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.94 }}
      animate={{ opacity: 1, y: [-4, 4, -4], scale: 1 }}
      transition={{ opacity: { duration: 0.5, delay: 0.9 }, y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }, scale: { duration: 0.5, delay: 0.9 } }}
      className="card-surface inline-flex flex-col gap-1 overflow-hidden rounded-2xl border border-[var(--border)] bg-[color:color-mix(in_srgb,var(--bg)_80%,transparent)] px-4 py-3 backdrop-blur-md"
      style={{ boxShadow: '0 16px 40px -16px color-mix(in srgb, var(--accent) 22%, transparent)' }}
    >
      {/* Location */}
      <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" style={{ boxShadow: '0 0 6px var(--success)' }} />
        <FiMapPin size={9} />
        Kigali, Rwanda
      </div>

      {/* Clock digits */}
      <div className="flex items-baseline gap-0.5 font-mono text-xl font-bold tracking-tight text-[var(--text)]">
        <span>{hh}</span>
        <span className="animate-[blinkCaret_1s_step-end_infinite] text-[var(--accent)]">:</span>
        <span>{mm}</span>
        <span className="animate-[blinkCaret_1s_step-end_infinite] text-[var(--accent)]">:</span>
        <span className="text-sm font-normal text-[var(--text-muted)]">{ss}</span>
      </div>

      {/* Date */}
      <p className="text-[10px] text-[var(--text-muted)]">{date} · UTC+2</p>
    </motion.div>
  )
}