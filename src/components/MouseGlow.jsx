import { useEffect, useState } from 'react'

export default function MouseGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0, visible: false })

  useEffect(() => {
    const onMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY, visible: true })
    }

    const onLeave = () => {
      setPosition((prev) => ({ ...prev, visible: false }))
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className={`mouse-glow ${position.visible ? 'opacity-100' : 'opacity-0'}`}
      style={{ transform: `translate(${position.x - 120}px, ${position.y - 120}px)` }}
    />
  )
}
