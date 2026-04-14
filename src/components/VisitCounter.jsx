import { useEffect, useState } from 'react'
import { animate } from 'framer-motion'
import { FiEye } from 'react-icons/fi'

const COUNTER_NAMESPACE = 'nsengimana-olivier-portfolio'
const COUNTER_KEY = 'visitors'
const VISITOR_FLAG_KEY = 'portfolio_visitor_counted_v1'

export default function VisitCounter({ label }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let controls

    const animateCount = (target) => {
      controls = animate(0, target, {
        duration: 0.9,
        onUpdate(value) {
          setCount(Math.floor(value))
        },
      })
    }

    const syncVisitorCount = async () => {
      try {
        const alreadyCounted = localStorage.getItem(VISITOR_FLAG_KEY) === 'true'
        const endpoint = alreadyCounted
          ? `https://api.countapi.xyz/get/${COUNTER_NAMESPACE}/${COUNTER_KEY}`
          : `https://api.countapi.xyz/hit/${COUNTER_NAMESPACE}/${COUNTER_KEY}`

        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error('Failed to load visitor count')
        }

        const payload = await response.json()
        const value = typeof payload.value === 'number' ? payload.value : 0
        animateCount(value)

        if (!alreadyCounted) {
          localStorage.setItem(VISITOR_FLAG_KEY, 'true')
        }
      } catch {
        const fallback = Number(localStorage.getItem('portfolio_local_visit_count') || '1')
        localStorage.setItem('portfolio_local_visit_count', String(fallback))
        animateCount(fallback)
      }
    }

    syncVisitorCount()

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
