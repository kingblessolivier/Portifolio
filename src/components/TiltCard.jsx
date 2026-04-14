import { useRef, useState } from 'react'

/**
 * Enhanced 3-D tilt card.
 *  - Perspective tilt follows cursor
 *  - Inner glow highlight spot moves with cursor
 *  - Drop-shadow shifts away from light source
 *  - Smooth spring-like ease on mouse leave
 */
export default function TiltCard({ className = '', children, intensity = 5 }) {
  const cardRef = useRef(null)
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 })

  const onMouseMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2

    const rotX = ((y - cy) / cy) * -intensity
    const rotY = ((x - cx) / cx) * intensity

    // Shift shadow opposite to tilt
    const shadowX = ((x - cx) / cx) * -8
    const shadowY = ((y - cy) / cy) * -8

    el.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(1.015)`
    el.style.boxShadow = `${shadowX}px ${shadowY}px 32px -10px rgba(59,130,246,0.22), 0 20px 50px -20px rgba(0,0,0,0.15)`

    // Inner glow follows cursor
    setGlow({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    })
  }

  const onMouseLeave = () => {
    const el = cardRef.current
    if (!el) return
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
    el.style.boxShadow = ''
    setGlow((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <div
      ref={cardRef}
      className={`tilt-card relative overflow-hidden ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Moving inner glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: glow.opacity,
          background: `radial-gradient(160px circle at ${glow.x}% ${glow.y}%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%)`,
        }}
      />
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
