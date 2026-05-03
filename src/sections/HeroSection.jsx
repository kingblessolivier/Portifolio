import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight, FiMapPin, FiDownload } from 'react-icons/fi'
import { personalInfo, portfolioData } from '../assets/data'
import ParticleCanvas from '../components/ParticleCanvas'
import MagneticButton from '../components/MagneticButton'
import TerminalWidget from '../components/TerminalWidget'
import TechMarquee from '../components/TechMarquee'
import LiveClock from '../components/LiveClock'

/* ── Count-up hook ─────────────────────────────────── */
function useCountUp(target, duration = 1200, start = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1)
      setValue(Math.round((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, start])
  return value
}

/* ── Bold metric card ──────────────────────────────── */
function StatMetric({ target, label, suffix = '+', delay = 0 }) {
  const [started, setStarted] = useState(false)
  const count = useCountUp(target, 1000, started)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onAnimationComplete={() => setStarted(true)}
      className="relative flex flex-col gap-1 rounded-2xl border border-[var(--border)] bg-[color:color-mix(in_srgb,var(--surface)_70%,transparent)] px-5 py-4 backdrop-blur"
    >
      {/* Top accent line */}
      <div className="absolute left-0 top-0 h-0.5 w-12 rounded-full" style={{ background: 'linear-gradient(90deg, var(--accent), transparent)' }} />
      <span className="text-3xl font-black tracking-tight text-[var(--text)]">
        {count}<span className="text-xl text-[var(--accent)]">{suffix}</span>
      </span>
      <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">{label}</span>
    </motion.div>
  )
}

/* ── Main component ────────────────────────────────── */
export default function HeroSection({ labels }) {
  const heroPhoto = '/olivier_image.jpeg'
  const [typedRole, setTypedRole] = useState('')

  useEffect(() => {
    const phases = labels.roleLines
    let timeoutId, phaseIdx = 0, cursor = 0, mode = 'type'
    const tick = () => {
      const phase = phases[phaseIdx]
      if (mode === 'type') {
        setTypedRole(phase.slice(0, ++cursor))
        if (cursor >= phase.length) {
          mode = 'pause'
          timeoutId = setTimeout(() => { mode = 'delete'; tick() }, 1600)
          return
        }
        timeoutId = setTimeout(tick, 80)
      } else if (mode === 'delete') {
        setTypedRole(phase.slice(0, --cursor))
        if (cursor <= 0) {
          phaseIdx = (phaseIdx + 1) % phases.length
          mode = 'type'
          timeoutId = setTimeout(tick, 500)
          return
        }
        timeoutId = setTimeout(tick, 45)
      }
    }
    setTypedRole('')
    timeoutId = setTimeout(tick, 400)
    return () => clearTimeout(timeoutId)
  }, [labels.roleLines])

  const jumpTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section id="home" className="mesh-bg relative flex min-h-screen items-center overflow-hidden pt-16">

      {/* ── Background layers ── */}
      <ParticleCanvas count={55} />
      <div className="dot-grid opacity-[0.07]" />
      <div className="hero-bg" />

      {/* ── Ambient orbs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="orb-float-1 absolute -left-32 top-10  h-[32rem] w-[32rem] rounded-full bg-[color:color-mix(in_srgb,var(--accent)_16%,transparent)] blur-[100px]" />
        <div className="orb-float-2 absolute -right-24 top-16 h-[36rem] w-[36rem] rounded-full bg-[color:color-mix(in_srgb,var(--accent-purple)_14%,transparent)] blur-[110px]" />
        <div className="orb-float-3 absolute bottom-0 left-1/3  h-[24rem] w-[24rem] rounded-full bg-[color:color-mix(in_srgb,#06b6d4_10%,transparent)] blur-[80px]" />
      </div>

      {/* ══════════════ CONTENT GRID ══════════════ */}
      <div className="container-shell relative z-10 grid items-center gap-16 py-24 lg:grid-cols-[1.15fr_0.85fr]">

        {/* ────────── LEFT COLUMN ────────── */}
        <div className="flex flex-col">

          {/* Greeting row */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mb-6 flex items-center gap-4"
          >
            <span className="section-tag">Hello, I'm</span>
            <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
              <FiMapPin size={11} className="text-[var(--accent)]" />
              Kigali, Rwanda
            </span>
          </motion.div>

          {/* Name — two lines */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="font-black leading-[0.92] tracking-[-0.03em]"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              <span className="block text-[clamp(2.8rem,7vw,5.5rem)] text-[var(--text)]">
                NSENGIMANA
              </span>
              <span
                className="block text-[clamp(2.8rem,7vw,5.5rem)] gradient-text"
              >
                Olivier
              </span>
            </motion.h1>
          </div>

          {/* Role — terminal prompt style */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.38 }}
            className="mt-5 flex items-center gap-2"
          >
            <span className="font-mono text-sm text-[var(--text-muted)] opacity-70 select-none">
              ~/dev<span className="text-[var(--accent)]">$</span>
            </span>
            <span className="font-mono text-base font-semibold text-[var(--accent)] sm:text-lg">
              {typedRole}
            </span>
            <span className="typing-caret" aria-hidden="true" />
          </motion.div>

          {/* Separator */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 h-px w-20 rounded-full"
            aria-hidden="true"
            style={{ transformOrigin: 'left', background: 'linear-gradient(90deg, var(--accent), var(--accent-purple), transparent)' }}
          />

          {/* Bio */}
          <motion.p
            key={labels.heroHeadline}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.52 }}
            className="mt-5 max-w-[52ch] text-base leading-[1.85] text-[var(--text-muted)]"
          >
            {labels.heroHeadline}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.62 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <MagneticButton
              onClick={() => jumpTo('projects')}
              className="glow-btn flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold active:scale-95"
            >
              {labels.viewProjects}
              <FiArrowRight size={15} />
            </MagneticButton>

            <MagneticButton
              onClick={() => jumpTo('contact')}
              className="card-surface flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold active:scale-95 hover:border-[var(--accent)]"
            >
              {labels.contactMe}
            </MagneticButton>
          </motion.div>

          {/* Mobile photo */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 block w-fit overflow-hidden rounded-3xl lg:hidden"
            style={{ border: '1px solid color-mix(in srgb, var(--accent) 22%, var(--border))' }}
          >
            <img
              src={heroPhoto}
              alt="NSENGIMANA Olivier"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="hero-clean-image h-56 w-44 object-cover"
            />
          </motion.div>

          {/* Stats strip */}
          <div className="mt-10 grid grid-cols-3 gap-3">
            <StatMetric target={portfolioData.stats.projects}     label={labels.projectsLabel}     delay={0.7} />
            <StatMetric target={portfolioData.stats.systemsBuilt} label={labels.systemsLabel}      delay={0.8} />
            <StatMetric target={portfolioData.stats.certificates} label={labels.certificatesLabel} delay={0.9} />
          </div>
        </div>

        {/* ────────── RIGHT COLUMN — layered composition ────────── */}
        <div className="relative hidden h-[600px] lg:block">

          {/* Deep glow behind photo */}
          <div
            className="pointer-events-none absolute left-1/2 top-8 h-72 w-56 -translate-x-1/2 rounded-[3rem]"
            style={{
              background: 'radial-gradient(ellipse at 40% 40%, color-mix(in srgb, var(--accent) 40%, transparent), color-mix(in srgb, var(--accent-purple) 30%, transparent) 60%, transparent 80%)',
              filter: 'blur(18px)',
            }}
          />

          {/* Rotating conic ring */}
          <div
            className="conic-border pointer-events-none absolute left-1/2 top-8 h-[22rem] w-[17rem] -translate-x-1/2 rounded-[2.8rem]"
            aria-hidden="true"
          />

          {/* Counter-rotate ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
            className="pointer-events-none absolute left-1/2 top-8 h-[25rem] w-[20rem] -translate-x-1/2 rounded-[3.5rem]"
            style={{ border: '1px solid color-mix(in srgb, var(--accent-purple) 12%, var(--border))' }}
          />

          {/* ── Profile photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="profile-frame absolute left-1/2 top-8 z-10 h-[21rem] w-[16rem] -translate-x-1/2 overflow-hidden rounded-[2.6rem]"
          >
            <img
              src={heroPhoto}
              alt="NSENGIMANA Olivier"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              sizes="256px"
              className="hero-clean-image h-full w-full object-cover"
            />
            {/* Bottom gradient fade into terminal */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[inherit]"
              style={{ background: 'linear-gradient(180deg, transparent 50%, color-mix(in srgb, var(--bg) 55%, transparent) 100%)' }}
            />
          </motion.div>

          {/* ── Floating: Live clock — top right ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="absolute right-0 top-6 z-20"
          >
            <LiveClock />
          </motion.div>

          {/* ── Floating card: Core focus — left ── */}
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="card-surface absolute -left-4 top-24 z-20 w-[160px] rounded-2xl border border-white/10 bg-[color:color-mix(in_srgb,var(--bg)_78%,transparent)] p-3.5 backdrop-blur-md"
            style={{ boxShadow: '0 16px 40px -14px rgba(59,130,246,0.28)' }}
          >
            <div className="mb-1.5 h-0.5 w-5 rounded-full" style={{ background: 'linear-gradient(90deg, var(--accent), transparent)' }} />
            <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)]">{labels.coreFocusLabel}</p>
            <p className="mt-1 text-[11px] font-semibold leading-5 text-[var(--text)]">{labels.coreFocusValue}</p>
          </motion.div>

          {/* ── Available badge — right of photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1.1, type: 'spring', stiffness: 300 }}
            className="absolute right-0 top-[15rem] z-20 flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-1.5 text-xs font-medium backdrop-blur"
          >
            <span className="pulse-dot h-2 w-2 rounded-full bg-[var(--success)]" style={{ boxShadow: '0 0 8px var(--success)' }} />
            {labels.availableForWork}
          </motion.div>

          {/* ── Terminal widget — bottom ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-0 right-0 z-20"
          >
            <TerminalWidget />
          </motion.div>
        </div>
      </div>

      {/* ── Tech marquee ── */}
      <div className="absolute bottom-4 left-0 right-0">
        <TechMarquee />
      </div>

    </section>
  )
}