import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { personalInfo, portfolioData } from '../assets/data'

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
          timeoutId = setTimeout(() => {
            mode = 'delete'
            tick()
          }, 1400)
          return
        }

        timeoutId = setTimeout(tick, 90)
        return
      }

      if (mode === 'delete') {
        cursor -= 1
        setTypedRole(phase.slice(0, Math.max(0, cursor)))

        if (cursor <= 0) {
          mode = 'pause-before-next'
          cursor = 0
          phaseIndex = (phaseIndex + 1) % phases.length
          timeoutId = setTimeout(() => {
            mode = 'type'
            tick()
          }, 500)
          return
        }

        timeoutId = setTimeout(tick, 55)
      }
    }

    setTypedRole('')
    timeoutId = setTimeout(tick, 250)

    return () => clearTimeout(timeoutId)
  }, [labels.roleLines])

  const jumpTo = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="home" className="mesh-bg relative flex min-h-screen items-center overflow-hidden pt-16">
      <div className="hero-bg" />
      <div className="container-shell relative z-10 grid items-center gap-10 py-20 lg:grid-cols-2">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-4xl text-5xl font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl"
          >
            {personalInfo.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 inline-flex min-h-[2.4rem] min-w-[24ch] items-center whitespace-nowrap overflow-hidden text-lg font-semibold text-[var(--accent)] sm:text-xl"
          >
            {typedRole}
            <span className="typing-caret" aria-hidden="true" />
          </motion.p>

          <motion.p
            key={labels.heroHeadline}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-2xl text-base leading-8 text-[var(--text-muted)] sm:text-lg"
          >
            {labels.heroHeadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => jumpTo('projects')}
              className="glow-btn rounded-full px-7 py-3 text-sm font-semibold shadow-lg shadow-blue-500/30 transition hover:scale-105"
            >
              {labels.viewProjects}
            </button>
            <button
              onClick={() => jumpTo('contact')}
              className="card-surface rounded-full px-7 py-3 text-sm font-semibold transition hover:scale-105"
            >
              {labels.contactMe}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
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

          <div className="mt-10 flex flex-wrap gap-3">
            <span className="card-surface rounded-full px-4 py-2 text-xs text-[var(--text-muted)]">
              {portfolioData.stats.projects}+ {labels.projectsLabel}
            </span>
            <span className="card-surface rounded-full px-4 py-2 text-xs text-[var(--text-muted)]">
              {portfolioData.stats.systemsBuilt}+ {labels.systemsLabel}
            </span>
            <span className="card-surface rounded-full px-4 py-2 text-xs text-[var(--text-muted)]">
              {portfolioData.stats.certificates}+ {labels.certificatesLabel}
            </span>
          </div>

        </div>

        <div className="relative hidden min-h-[460px] lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_30%_30%,color-mix(in_srgb,var(--accent)_55%,transparent),transparent_62%),radial-gradient(circle_at_70%_70%,color-mix(in_srgb,var(--accent-purple)_50%,transparent),transparent_62%)] blur-sm"
          />

          <div className="luxury-ring absolute left-1/2 top-1/2 h-[26rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-[2.5rem]" />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="profile-frame card-surface absolute left-1/2 top-1/2 h-[24rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[2.3rem]"
          >
            <img
              src={heroPhoto}
              alt="NSENGIMANA Olivier"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              sizes="(max-width: 1279px) 0px, 288px"
              className="hero-clean-image h-full w-full object-cover"
            />
          </motion.div>

          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="card-surface absolute -right-2 top-10 z-20 w-[205px] rounded-3xl border border-white/10 bg-[color:color-mix(in_srgb,var(--bg)_72%,transparent)] p-4 text-[var(--text)] backdrop-blur-md"
          >
            <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--text-muted)]">{labels.coreFocusLabel}</p>
            <p className="mt-2 text-sm font-semibold leading-5 text-[var(--text)]">{labels.coreFocusValue}</p>
          </motion.div>

          <motion.div
            animate={{ y: [10, -8, 10] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="card-surface absolute -left-4 bottom-12 z-20 w-[300px] rounded-3xl border border-white/10 bg-[color:color-mix(in_srgb,var(--bg)_72%,transparent)] p-4 text-[var(--text)] backdrop-blur-md"
          >
            <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--text-muted)]">{labels.visionLabel}</p>
            <p className="mt-2 text-sm font-medium leading-6 text-[var(--text)]">{portfolioData.vision.statement}</p>
          </motion.div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:color-mix(in_srgb,var(--accent)_40%,var(--border))]"
          />
        </div>
      </div>
    </section>
  )
}
