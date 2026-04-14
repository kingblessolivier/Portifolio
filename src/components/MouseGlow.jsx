import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Dual-layer mouse glow:
 *  - Outer soft blob  → spring-lagged (adds dreamy trailing feel)
 *  - Inner tight spot → slightly faster spring
 */
export default function MouseGlow() {
  const [visible, setVisible] = useState(false)

  const rawX = useMotionValue(-400)
  const rawY = useMotionValue(-400)

  // Outer blob — slow drag
  const outerX = useSpring(rawX, { stiffness: 60, damping: 18, mass: 1 })
  const outerY = useSpring(rawY, { stiffness: 60, damping: 18, mass: 1 })

  // Inner spot — faster
  const innerX = useSpring(rawX, { stiffness: 120, damping: 22 })
  const innerY = useSpring(rawY, { stiffness: 120, damping: 22 })

  useEffect(() => {
    const onMove = (e) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [rawX, rawY, visible])

  return (
    <>
      {/* Outer large blob */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-[15]"
        style={{
          x: outerX,
          y: outerY,
          translateX: '-50%',
          translateY: '-50%',
          width: 420,
          height: 420,
          borderRadius: '50%',
          background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 9%, transparent), transparent 70%)',
          filter: 'blur(16px)',
        }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Inner tight spot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-[16]"
        style={{
          x: innerX,
          y: innerY,
          translateX: '-50%',
          translateY: '-50%',
          width: 140,
          height: 140,
          borderRadius: '50%',
          background: 'radial-gradient(circle, color-mix(in srgb, var(--accent-purple) 16%, transparent), transparent 65%)',
          filter: 'blur(4px)',
        }}
        animate={{ opacity: visible ? 0.7 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </>
  )
}
