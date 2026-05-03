import { useEffect, useRef } from 'react'

const TRAIL_LENGTH = 10
const COLORS = ['var(--accent)', 'var(--accent-purple)', 'var(--accent)']

export default function CursorTrail() {
  const canvasRef = useRef(null)
  const points = useRef([])
  const mouse = useRef({ x: -200, y: -200 })
  const rafRef = useRef(null)

  useEffect(() => {
    /* Skip on touch devices */
    if (window.matchMedia('(hover: none)').matches) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      /* Push current mouse pos */
      points.current.unshift({ ...mouse.current })
      if (points.current.length > TRAIL_LENGTH) points.current.pop()

      points.current.forEach((p, i) => {
        const alpha = (1 - i / TRAIL_LENGTH) * 0.55
        const size = (1 - i / TRAIL_LENGTH) * 7 + 2
        const color = COLORS[i % COLORS.length]

        /* Resolve CSS var to actual color */
        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(96, 165, 250, ${alpha})`

        if (color.includes('purple')) {
          ctx.fillStyle = `rgba(167, 139, 250, ${alpha})`
        }

        ctx.fill()
      })

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    />
  )
}