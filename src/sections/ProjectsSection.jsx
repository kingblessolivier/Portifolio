import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiCpu, FiGithub, FiGlobe, FiArrowUpRight } from 'react-icons/fi'
import { HiXMark } from 'react-icons/hi2'
import SectionReveal from '../components/SectionReveal'
import SectionHeader from '../components/SectionHeader'
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
        <div className="mb-2 flex flex-wrap items-start justify-between gap-6">
          <SectionHeader tag={text.sectionTag} title={navLabels.projects} subtitle={text.intro} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <SpotlightCard className="card-surface card-shimmer group h-full rounded-2xl border border-[var(--border)] transition-all duration-300 hover:-translate-y-2 hover:border-[color:color-mix(in_srgb,var(--accent)_30%,var(--border))] hover:shadow-[0_24px_60px_-24px_color-mix(in_srgb,var(--accent)_30%,rgba(0,0,0,0.2))]">
                <TiltCard className="relative z-10 flex h-full flex-col rounded-2xl p-6">

                  {/* Project number watermark */}
                  <span className="project-number">{String(index + 1).padStart(2, '0')}</span>

                  {/* Top row */}
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide"
                      style={{
                        background: project.category === 'AI'
                          ? 'color-mix(in srgb, var(--accent-purple) 14%, transparent)'
                          : 'color-mix(in srgb, var(--accent) 12%, transparent)',
                        color: project.category === 'AI' ? 'var(--accent-purple)' : 'var(--accent)',
                        border: `1px solid ${project.category === 'AI' ? 'color-mix(in srgb,var(--accent-purple) 25%,transparent)' : 'color-mix(in srgb,var(--accent) 22%,transparent)'}`,
                      }}
                    >
                      {categoryIcon(project.category)}
                      {project.category}
                    </span>

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    >
                      <FiGithub size={13} />
                    </a>
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-base font-bold leading-snug text-[var(--text)]">{project.name}</h3>

                  {/* Description */}
                  <p className="flex-1 text-sm leading-[1.8] text-[var(--text-muted)]">
                    {project.description[language]}
                  </p>

                  {/* Tech tags */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.tech.map((tag) => (
                      <span
                        key={`${project.name}-${tag}`}
                        className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-0.5 text-[10px] font-medium text-[var(--text-muted)] transition hover:border-[color:color-mix(in_srgb,var(--accent)_40%,var(--border))] hover:text-[var(--text)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Case study button */}
                  <button
                    onClick={() => setActiveProject(project)}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] py-2.5 text-xs font-semibold text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:bg-[color:color-mix(in_srgb,var(--accent)_8%,transparent)] hover:text-[var(--text)]"
                  >
                    {text.viewCaseStudy}
                    <FiArrowUpRight size={13} />
                  </button>

                  {/* Bottom glow line on hover */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-[2px] rounded-b-2xl opacity-0 transition-all duration-300 group-hover:opacity-100"
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
