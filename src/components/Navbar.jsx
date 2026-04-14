import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CommandPalette from './CommandPalette'
import { FiGlobe } from 'react-icons/fi'
import { HiBars3BottomRight, HiXMark } from 'react-icons/hi2'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

const sectionIds = ['home', 'about', 'projects', 'systems', 'skills', 'awards', 'gallery', 'work', 'contact']

export default function Navbar({ navLabels, language, setLanguage, toggleTheme, theme }) {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isShrunk, setIsShrunk] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsShrunk(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)
      .map((element) => {
        const observer = new IntersectionObserver(
          ([entry]) => { if (entry.isIntersecting) setActiveSection(entry.target.id) },
          { threshold: 0.4 },
        )
        observer.observe(element)
        return observer
      })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollTo = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setOpen(false)
    }
  }

  const sectionLabelMap = {
    home: navLabels.home,
    about: navLabels.about,
    projects: navLabels.projects,
    systems: navLabels.systems,
    skills: navLabels.skills,
    awards: navLabels.awards,
    gallery: navLabels.gallery,
    work: navLabels.work,
    contact: navLabels.contact,
  }

  return (
    <header
      className={`glass-nav fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] transition-all duration-300 ${
        isShrunk ? 'shadow-[0_10px_40px_-24px_rgba(0,0,0,0.45)]' : ''
      }`}
    >
      <div className={`container-shell flex items-center justify-between transition-all duration-300 ${isShrunk ? 'h-12' : 'h-14'}`}>
        {/* Brand */}
        <button
          onClick={() => scrollTo('home')}
          className="group flex items-center gap-2 text-base font-bold tracking-tight"
          aria-label="Go to home"
        >
          <span
            className="flex h-6 w-6 items-center justify-center rounded-full transition group-hover:scale-110"
            style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-purple))' }}
          >
            <span className="h-2 w-2 rounded-full bg-white" />
          </span>
          <span>Olivier</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 xl:flex">
          {sectionIds.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`relative rounded-full px-3 py-1.5 text-xs font-medium transition ${
                activeSection === id ? 'text-[var(--text)]' : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              {activeSection === id && (
                <motion.span
                  layoutId="nav-pill"
                  className="nav-active-pill absolute inset-0 rounded-full"
                  style={{ zIndex: -1 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {sectionLabelMap[id]}
            </button>
          ))}
        </nav>

        {/* Desktop controls */}
        <div className="hidden items-center gap-2 xl:flex">
          <div className="hidden 2xl:block">
            <CommandPalette
              navLabels={navLabels}
              onNavigate={scrollTo}
              theme={theme}
              toggleTheme={toggleTheme}
              language={language}
              setLanguage={setLanguage}
            />
          </div>

          <div className="card-surface flex items-center gap-1 overflow-hidden rounded-full p-1 text-xs font-semibold">
            <FiGlobe className="ml-1.5 text-[var(--text-muted)]" size={13} />
            {['EN', 'KINY', 'FR'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`rounded-full px-2.5 py-1 transition ${
                  language === lang ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            className="card-surface rounded-full p-2 text-lg transition hover:scale-105"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <MdLightMode /> : <MdDarkMode />}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="card-surface rounded-lg p-2 text-xl xl:hidden"
          aria-label="Toggle menu"
        >
          {open ? <HiXMark /> : <HiBars3BottomRight />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[var(--border)]"
          >
            <div className="container-shell space-y-1 py-3">
              {sectionIds.map((id, index) => (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  onClick={() => scrollTo(id)}
                  className={`block w-full rounded-xl px-3 py-2.5 text-left text-sm transition ${
                    activeSection === id
                      ? 'bg-[color:color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--text)]'
                      : 'text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--text)]'
                  }`}
                >
                  {activeSection === id && (
                    <span
                      className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
                      style={{ boxShadow: '0 0 6px var(--accent)' }}
                    />
                  )}
                  {sectionLabelMap[id]}
                </motion.button>
              ))}

              <div className="flex items-center justify-between gap-3 pt-2 pb-1">
                <div className="card-surface flex overflow-hidden rounded-full p-1 text-xs font-semibold">
                  {['EN', 'KINY', 'FR'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`rounded-full px-3 py-1.5 transition ${
                        language === lang ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-muted)]'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
                <button
                  onClick={toggleTheme}
                  className="card-surface rounded-full p-2 text-xl"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <MdLightMode /> : <MdDarkMode />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
