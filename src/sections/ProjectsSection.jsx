import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiCpu, FiGithub, FiGlobe } from 'react-icons/fi'
import { HiXMark } from 'react-icons/hi2'
import SectionReveal from '../components/SectionReveal'
import TiltCard from '../components/TiltCard'
import { projects } from '../assets/data'

export default function ProjectsSection({ navLabels, language, sectionText }) {
  const [activeProject, setActiveProject] = useState(null)
  const text = sectionText.projects
  const categoryIcon = (category) => (category === 'AI' ? <FiCpu size={14} /> : <FiGlobe size={14} />)

  return (
    <SectionReveal id="projects" className="section-gap">
      <div className="container-shell">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">{text.sectionTag}</p>
            <h2 className="section-title text-3xl font-bold sm:text-4xl">{navLabels.projects}</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[var(--text-muted)]">{text.intro}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className=""
            >
              <TiltCard className="card-surface rounded-2xl p-6 transition hover:shadow-[0_24px_60px_-30px_rgba(59,130,246,0.45)]">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <span className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[10px] uppercase tracking-wide text-[var(--text-muted)]">
                    <span className="inline-flex items-center gap-1">
                      {categoryIcon(project.category)}
                      {project.category}
                    </span>
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{project.description[language]}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tag) => (
                    <span
                      key={`${project.name}-${tag}`}
                      className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--surface)] px-4 py-2 text-sm font-medium transition hover:scale-105"
                >
                  <FiGithub />
                  {text.github}
                </a>

                <button
                  onClick={() => setActiveProject(project)}
                  className="mt-3 inline-flex rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--text)]"
                >
                  {text.viewCaseStudy}
                </button>
              </TiltCard>
            </motion.article>
          ))}
        </div>

        <AnimatePresence>
          {activeProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90] bg-black/75 p-4 backdrop-blur-sm"
              onClick={() => setActiveProject(null)}
            >
              <motion.article
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                onClick={(event) => event.stopPropagation()}
                className="card-surface mx-auto mt-6 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl p-6 sm:p-8"
              >
              <div className="mb-6 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-2xl font-bold">{activeProject.name}</h3>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">{activeProject.description[language]}</p>
                </div>
                <button
                  onClick={() => setActiveProject(null)}
                  aria-label="Close case study"
                  className="rounded-full border border-[var(--border)] p-2 text-lg"
                >
                  <HiXMark />
                </button>
              </div>

              <div className="grid gap-4 text-sm leading-7 text-[var(--text-muted)]">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{text.problem}</p>
                  <p>{activeProject.caseStudy.problem[language]}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{text.solution}</p>
                  <p>{activeProject.caseStudy.solution[language]}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{text.role}</p>
                  <p>{activeProject.caseStudy.role[language]}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{text.architecture}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {activeProject.caseStudy.architecture.map((item) => (
                      <span key={item} className="rounded-full border border-[var(--border)] px-3 py-1 text-xs">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{text.challenges}</p>
                  <p>{activeProject.caseStudy.challenges[language]}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{text.impact}</p>
                  <p>{activeProject.caseStudy.impact[language]}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noreferrer"
                  className="glow-btn inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
                >
                  <FiGithub />
                  {text.github}
                </a>
                <button
                  onClick={() => setActiveProject(null)}
                  className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm"
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
