import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Custom cursor:
 *  - Inner dot  → instant, accent-filled circle
 *  - Outer ring → spring-lagged, expands on hover over interactive elements
 *
 * Hidden on touch devices via CSS (pointer: coarse).
 */
export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const [isText, setIsText] = useState(false)

  // Raw mouse positions for the inner dot (no spring)
  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)

  // Spring-lagged positions for the outer ring
  const springCfg = { stiffness: 180, damping: 22, mass: 0.6 }
  const ringX = useSpring(rawX, springCfg)
  const ringY = useSpring(rawY, springCfg)

  useEffect(() => {
    // Don't show on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    const onOver = (e) => {
      const el = e.target
      const interactive = el.closest('a, button, [role="button"], label, input, textarea, select, [tabindex]')
      const textEl = el.closest('p, h1, h2, h3, h4, h5, h6, span, li')
      setIsPointer(!!interactive)
      setIsText(!!textEl && !interactive)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseover', onOver)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover', onOver)
    }
  }, [rawX, rawY, visible])

  return (
    <>
      {/* Outer ring — spring lag */}
      <motion.div
        aria-hidden="true"
        className="custom-cursor-ring pointer-events-none fixed z-[999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isPointer ? 44 : isText ? 3 : 32,
          height: isPointer ? 44 : isText ? 28 : 32,
          borderRadius: isText ? '2px' : '999px',
          opacity: visible ? 1 : 0,
          borderColor: isPointer
            ? 'var(--accent-purple)'
            : 'var(--accent)',
          scale: isPointer ? 1 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Inner dot — instant */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-[1000] h-1.5 w-1.5 rounded-full"
        style={{
          x: rawX,
          y: rawY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'var(--accent)',
        }}
        animate={{
          scale: isPointer ? 0 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.12 }}
      />
    </>
  )
}
