import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowDown, FiMapPin } from 'react-icons/fi'
import { personalInfo, portfolioData } from '../assets/data'
import ParticleCanvas from '../components/ParticleCanvas'
import MagneticButton from '../components/MagneticButton'
import TerminalWidget from '../components/TerminalWidget'
import TechMarquee from '../components/TechMarquee'

/* ── Count-up hook ───────────────────────────── */
function useCountUp(target, duration = 1200, start = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(eased * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, start])
  return value
}

function StatBadge({ target, label, delay = 0 }) {
  const [started, setStarted] = useState(false)
  const count = useCountUp(target, 1100, started)
  return (
    <motion.span
      initial={{ opacity: 0, y: 14, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      onAnimationComplete={() => setStarted(true)}
      className="card-surface inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs"
    >
      <span className="text-sm font-bold text-[var(--text)]">{count}+</span>
      <span className="text-[var(--text-muted)]">{label}</span>
    </motion.span>
  )
}

export default function HeroSection({ labels }) {
  const heroPhoto = '/olivier_image.jpeg'
  const [typedRole, setTypedRole] = useState('')

  useEffect(() => {
    const [firstLine, secondLine] = labels.roleLines
    let timeoutId
    let phaseIndex = 0
    let cursor = 0
    let mode = 'type'
    const phases = [firstLine, secondLine]
    const tick = () => {
      const phase = phases[phaseIndex]
      if (mode === 'type') {
        cursor += 1
        setTypedRole(phase.slice(0, cursor))
        if (cursor >= phase.length) {
          mode = 'pause-before-delete'
          timeoutId = setTimeout(() => { mode = 'delete'; tick() }, 1400)
          return
        }
        timeoutId = setTimeout(tick, 88)
        return
      }
      if (mode === 'delete') {
        cursor -= 1
        setTypedRole(phase.slice(0, Math.max(0, cursor)))
        if (cursor <= 0) {
          mode = 'pause-before-next'
          cursor = 0
          phaseIndex = (phaseIndex + 1) % phases.length
          timeoutId = setTimeout(() => { mode = 'type'; tick() }, 480)
          return
        }
        timeoutId = setTimeout(tick, 52)
      }
    }
    setTypedRole('')
    timeoutId = setTimeout(tick, 300)
    return () => clearTimeout(timeoutId)
  }, [labels.roleLines])

  const jumpTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="home" className="mesh-bg relative flex min-h-screen items-center overflow-hidden pt-16">

      {/* ── Particle constellation background ── */}
      <ParticleCanvas count={70} />

      {/* ── Animated dot grid ── */}
      <div className="dot-grid opacity-[0.06]" />

      {/* ── Soft gradient blobs ── */}
      <div className="hero-bg" />

      {/* ── Floating ambient orbs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="orb-float-1 absolute -left-24 top-16  h-[28rem] w-[28rem] rounded-full bg-[color:color-mix(in_srgb,var(--accent)_18%,transparent)] blur-[80px]" />
        <div className="orb-float-2 absolute -right-20 top-24 h-[32rem] w-[32rem] rounded-full bg-[color:color-mix(in_srgb,var(--accent-purple)_16%,transparent)] blur-[90px]" />
        <div className="orb-float-3 absolute bottom-16 left-1/3 h-[22rem] w-[22rem] rounded-full bg-[color:color-mix(in_srgb,#06b6d4_12%,transparent)] blur-[70px]" />
        <div className="orb-float-4 absolute right-1/4 top-1/2 h-[18rem] w-[18rem] rounded-full bg-[color:color-mix(in_srgb,#10b981_8%,transparent)] blur-[60px]" />
      </div>

      <div className="container-shell relative z-10 grid items-center gap-10 py-20 lg:grid-cols-2">

        {/* ── Left column ── */}
        <div>
          {/* Pill tag */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-5 flex items-center gap-3"
          >
            <span className="section-tag">Portfolio</span>
            <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
              <FiMapPin size={11} className="text-[var(--accent)]" />
              Rwanda
            </span>
          </motion.div>

          {/* Name — split text reveal */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-4xl text-5xl font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl"
          >
            {personalInfo.name}
          </motion.h1>

          {/* Typing role */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-4 inline-flex min-h-[2.4rem] min-w-[24ch] items-center overflow-hidden whitespace-nowrap text-lg font-semibold text-[var(--accent)] sm:text-xl"
          >
            {typedRole}
            <span className="typing-caret" aria-hidden="true" />
          </motion.p>

          {/* Bio */}
          <motion.p
            key={labels.heroHeadline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-6 max-w-2xl text-base leading-8 text-[var(--text-muted)] sm:text-lg"
          >
            {labels.heroHeadline}
          </motion.p>

          {/* Magnetic CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              onClick={() => jumpTo('projects')}
              className="glow-btn rounded-full px-7 py-3 text-sm font-semibold active:scale-95"
            >
              {labels.viewProjects}
            </MagneticButton>

            <MagneticButton
              onClick={() => jumpTo('contact')}
              className="card-surface rounded-full px-7 py-3 text-sm font-semibold active:scale-95 hover:border-[var(--accent)]"
            >
              {labels.contactMe}
            </MagneticButton>
          </motion.div>

          {/* Mobile photo */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="card-surface mt-8 block w-fit overflow-hidden rounded-3xl lg:hidden"
          >
            <img
              src={heroPhoto}
              alt="NSENGIMANA Olivier"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              sizes="(max-width: 1024px) 192px, 0px"
              className="hero-clean-image h-56 w-48 object-cover"
            />
          </motion.div>

          {/* Stats with count-up */}
          <div className="mt-10 flex flex-wrap gap-3">
            <StatBadge target={portfolioData.stats.projects} label={labels.projectsLabel} delay={0.65} />
            <StatBadge target={portfolioData.stats.systemsBuilt} label={labels.systemsLabel} delay={0.75} />
            <StatBadge target={portfolioData.stats.certificates} label={labels.certificatesLabel} delay={0.85} />
          </div>
        </div>

        {/* ── Right column — photo + terminal ── */}
        <div className="relative hidden lg:flex lg:flex-col lg:gap-5 lg:items-center">

          {/* Photo card */}
          <div className="relative w-fit">
            {/* Radial glow blob */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute left-1/2 top-1/2 h-80 w-64 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 30% 30%, color-mix(in srgb, var(--accent) 42%, transparent), transparent 60%), radial-gradient(ellipse at 70% 70%, color-mix(in srgb, var(--accent-purple) 38%, transparent), transparent 60%)',
                filter: 'blur(3px)',
                borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
              }}
            />

            {/* Rotating conic gradient border */}
            <div
              className="conic-border absolute left-1/2 top-1/2 h-[20rem] w-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-[2.5rem]"
              aria-hidden="true"
            />

            {/* Dashed orbit ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
              style={{ border: '1px dashed color-mix(in srgb, var(--accent) 24%, var(--border))' }}
            />

            {/* Profile photo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="profile-frame card-surface relative z-10 h-[18rem] w-[14rem] overflow-hidden rounded-[2rem]"
            >
              <img
                src={heroPhoto}
                alt="NSENGIMANA Olivier"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                sizes="224px"
                className="hero-clean-image h-full w-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit]"
                style={{
                  background: 'linear-gradient(180deg, transparent 55%, color-mix(in srgb, var(--accent) 18%, transparent) 100%)',
                }}
              />
            </motion.div>

            {/* Floating card — Core focus */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              className="card-surface absolute -right-16 top-4 z-20 w-[170px] overflow-hidden rounded-2xl border border-white/10 bg-[color:color-mix(in_srgb,var(--bg)_75%,transparent)] p-3.5 backdrop-blur-md"
              style={{ boxShadow: '0 20px 48px -18px rgba(59,130,246,0.3)' }}
            >
              <div className="mb-1.5 h-0.5 w-6 rounded-full" style={{ background: 'linear-gradient(90deg, var(--accent), transparent)' }} />
              <p className="text-[9px] uppercase tracking-[0.22em] text-[var(--text-muted)]">{labels.coreFocusLabel}</p>
              <p className="mt-1 text-xs font-semibold leading-5 text-[var(--text)]">{labels.coreFocusValue}</p>
            </motion.div>

            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.0, type: 'spring', stiffness: 280 }}
              className="absolute -left-4 bottom-6 z-20 flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-1.5 text-xs font-medium backdrop-blur"
            >
              <span className="h-2 w-2 rounded-full bg-[var(--success)] pulse-dot" style={{ boxShadow: '0 0 8px var(--success)' }} />
              {labels.availableForWork}
            </motion.div>
          </div>

          {/* ── Terminal widget ── */}
          <TerminalWidget className="w-full max-w-[420px]" />
        </div>
      </div>

      {/* ── Tech marquee banner ── */}
      <div className="absolute bottom-16 left-0 right-0">
        <TechMarquee />
      </div>

    </section>
  )
}
