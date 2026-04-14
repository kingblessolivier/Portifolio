import { useRef } from 'react'

export default function TiltCard({ className = '', children }) {
  const cardRef = useRef(null)

  const onMouseMove = (event) => {
    const element = cardRef.current
    if (!element) return

    const rect = element.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -4
    const rotateY = ((x - centerX) / centerX) * 4

    element.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`
  }

  const onMouseLeave = () => {
    const element = cardRef.current
    if (!element) return
    element.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <div ref={cardRef} className={`tilt-card ${className}`} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      {children}
    </div>
  )
}
