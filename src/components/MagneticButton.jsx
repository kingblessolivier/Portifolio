import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Wraps any children in a button that magnetically drifts toward the cursor
 * when the mouse is within the element's bounds.
 *
 * Props:
 *   strength  – how far (in px fraction) it pulls. Default 0.38
 *   className – button classes
 *   onClick   – click handler
 *   as        – 'button' | 'a' | 'div'  (default 'button')
 */
export default function MagneticButton({
  children,
  className = '',
  onClick,
  strength = 0.38,
  as: Tag = 'button',
  href,
  target,
  rel,
  type,
}) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setPos({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    })
  }

  const onLeave = () => {
    setPos({ x: 0, y: 0 })
  }

  const springTransition = { type: 'spring', stiffness: 220, damping: 18 }

  if (Tag === 'a') {
    return (
      <motion.a
        ref={ref}
        animate={{ x: pos.x, y: pos.y }}
        transition={springTransition}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        href={href}
        target={target}
        rel={rel}
        className={className}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref}
      animate={{ x: pos.x, y: pos.y }}
      transition={springTransition}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      type={type ?? 'button'}
      className={className}
    >
      {children}
    </motion.button>
  )
}
