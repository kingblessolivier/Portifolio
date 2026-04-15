import { useEffect, useState } from 'react'
import { animate } from 'framer-motion'
import { FiEye } from 'react-icons/fi'

const STORAGE_KEY = 'portfolio_visit_count_v2'
const SESSION_KEY = 'portfolio_visit_counted_session'

export default function VisitCounter({ label }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let controls

    // Read stored total
    const stored = Number(localStorage.getItem(STORAGE_KEY) || '0')

    // Only increment once per browser session (tab open)
    const alreadyCountedThisSession = sessionStorage.getItem(SESSION_KEY) === 'true'
    const newCount = alreadyCountedThisSession ? stored : stored + 1

    if (!alreadyCountedThisSession) {
      localStorage.setItem(STORAGE_KEY, String(newCount))
      sessionStorage.setItem(SESSION_KEY, 'true')
    }

    controls = animate(0, newCount, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(value) {
        setCount(Math.floor(value))
      },
    })

    return () => controls?.stop()
  }, [])

  return (
    <div className="card-surface mt-10 inline-flex items-center rounded-full px-4 py-2 text-sm shadow-sm">
      <FiEye className="mr-2 text-[var(--text-muted)]" />
      <span className="text-[var(--text-muted)]">{label}: </span>
      <span className="ml-2 font-bold text-[var(--accent)]">{count.toLocaleString()}</span>
    </div>
  )
}
