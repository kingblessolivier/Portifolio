import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiCpu, FiGithub, FiGlobe } from 'react-icons/fi'
import { HiXMark } from 'react-icons/hi2'
import SectionReveal from '../components/SectionReveal'
import TiltCard from '../components/TiltCard'
import { projects } from '../assets/data'

function SpotlightCard({ children, className }) {
  const cardRef = useRef(null)
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, show: false })

  const handleMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setSpotlight({ x, y, show: true })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setSpotlight((s) => ({ ...s, show: false }))}
      className={`relative overflow-hidden ${className}`}
      style={{
        '--sx': `${spotlight.x}%`,
        '--sy': `${spotlight.y}%`,
      }}
    >
      {/* Spotlight overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: spotlight.show ? 1 : 0,
          background: `radial-gradient(180px circle at ${spotlight.x}% ${spotlight.y}%, color-mix(in srgb, var(--accent) 8%, transparent), transparent 80%)`,
        }}
      />
      {children}
    </div>
  )
}

export default function ProjectsSection({ navLabels, language, sectionText }) {
  const [activeProject, setActiveProject] = useState(null)
  const text = sectionText.projects
  const categoryIcon = (category) => (category === 'AI' ? <FiCpu size={13} /> : <FiGlobe size={13} />)

  return (
    <SectionReveal id="projects" className="section-gap">
      <div className="container-shell">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="section-tag mb-3 block w-fit">{text.sectionTag}</span>
            <h2 className="section-title text-3xl font-bold sm:text-4xl">{navLabels.projects}</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[var(--text-muted)]">{text.intro}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              whileHover={{ y: -8 }}
            >
              <SpotlightCard className="card-surface card-shimmer h-full rounded-2xl">
                <TiltCard className="relative z-10 h-full rounded-2xl p-6 transition hover:shadow-[0_24px_60px_-30px_rgba(59,130,246,0.42)]">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <h3 className="text-base font-semibold">{project.name}</h3>
                    <span className="shrink-0 rounded-full border border-[var(--border)] px-2.5 py-1 text-[10px] uppercase tracking-wide text-[var(--text-muted)]">
                      <span className="inline-flex items-center gap-1">
                        {categoryIcon(project.category)}
                        {project.category}
                      </span>
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                    {project.description[language]}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((tag) => (
                      <span
                        key={`${project.name}-${tag}`}
                        className="skill-tag rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[var(--surface)] px-4 py-2 text-sm font-medium transition hover:scale-105 hover:bg-[color:color-mix(in_srgb,var(--accent)_12%,var(--surface))]"
                    >
                      <FiGithub size={13} />
                      {text.github}
                    </a>
                    <button
                      onClick={() => setActiveProject(project)}
                      className="inline-flex items-center rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--text)]"
                    >
                      {text.viewCaseStudy}
                    </button>
                  </div>

                  {/* Bottom gradient accent */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-0.5 rounded-b-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-purple))' }}
                  />
                </TiltCard>
              </SpotlightCard>
            </motion.article>
          ))}
        </div>

        {/* Case study modal */}
        <AnimatePresence>
          {activeProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[90] bg-black/75 p-4 backdrop-blur-sm"
              onClick={() => setActiveProject(null)}
            >
              <motion.article
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.97 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="card-surface mx-auto mt-6 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl p-6 sm:p-8"
              >
                <div className="mb-6 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-bold">{activeProject.name}</h3>
                    <p className="mt-2 text-sm text-[var(--text-muted)]">
                      {activeProject.description[language]}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveProject(null)}
                    aria-label="Close case study"
                    className="rounded-full border border-[var(--border)] p-2 text-lg transition hover:border-[var(--accent)]"
                  >
                    <HiXMark />
                  </button>
                </div>

                {/* Divider accent */}
                <div
                  className="mb-6 h-0.5 rounded-full"
                  style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-purple), transparent)' }}
                />

                <div className="grid gap-5 text-sm leading-7 text-[var(--text-muted)]">
                  {[
                    { label: text.problem, value: activeProject.caseStudy.problem[language] },
                    { label: text.solution, value: activeProject.caseStudy.solution[language] },
                    { label: text.role, value: activeProject.caseStudy.role[language] },
                    { label: text.challenges, value: activeProject.caseStudy.challenges[language] },
                    { label: text.impact, value: activeProject.caseStudy.impact[language] },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text)]">{label}</p>
                      <p>{value}</p>
                    </div>
                  ))}
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text)]">{text.architecture}</p>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.caseStudy.architecture.map((item) => (
                        <span
                          key={item}
                          className="skill-tag rounded-full border border-[var(--border)] px-3 py-1 text-xs"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-7 flex items-center gap-3">
                  <a
                    href={activeProject.link}
                    target="_blank"
                    rel="noreferrer"
                    className="glow-btn inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition hover:scale-105"
                  >
                    <FiGithub size={13} />
                    {text.github}
                  </a>
                  <button
                    onClick={() => setActiveProject(null)}
                    className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm transition hover:border-[var(--accent)]"
                  >
                    {text.close}
                  </button>
                </div>
              </motion.article>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionReveal>
  )
}
