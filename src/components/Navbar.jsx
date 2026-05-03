import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CommandPalette from './CommandPalette'
import {
  FiHome, FiUser, FiFolder, FiCpu, FiZap,
  FiAward, FiImage, FiBriefcase, FiMail, FiGlobe,
  FiSun, FiMoon, FiX, FiMenu,
} from 'react-icons/fi'

const NAV_ITEMS = [
  { id: 'home',     icon: FiHome },
  { id: 'about',    icon: FiUser },
  { id: 'projects', icon: FiFolder },
  { id: 'systems',  icon: FiCpu },
  { id: 'skills',   icon: FiZap },
  { id: 'awards',   icon: FiAward },
  { id: 'gallery',  icon: FiImage },
  { id: 'work',     icon: FiBriefcase },
  { id: 'contact',  icon: FiMail },
]

export default function Navbar({ navLabels, language, setLanguage, toggleTheme, theme }) {
  const [open, setOpen]               = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled]       = useState(false)

  /* ── Shrink on scroll ── */
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20)
    handle()
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  /* ── Active section tracker ── */
  useEffect(() => {
    const observers = NAV_ITEMS
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean)
      .map((el) => {
        const obs = new IntersectionObserver(
          ([entry]) => { if (entry.isIntersecting) setActiveSection(el.id) },
          { threshold: 0.35 },
        )
        obs.observe(el)
        return obs
      })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setOpen(false)
  }

  const labelOf = (id) => navLabels[id] ?? id

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'navbar-glass navbar-border shadow-[0_8px_32px_-16px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        }`}
      >
        <div className={`container-shell flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-13' : 'h-16'}`}>

          {/* ── Logo ── */}
          <button
            onClick={() => scrollTo('home')}
            aria-label="Home"
            className="group flex items-center gap-2.5"
          >
            {/* Badge */}
            <div className="navbar-logo-badge">
              <span className="navbar-logo-text">N</span>
              <span className="navbar-logo-dot" />
            </div>
            {/* Name */}
            <div className="leading-none">
              <span className="block text-[13px] font-black tracking-tight text-[var(--text)] transition group-hover:text-[var(--accent)]">
                Olivier
              </span>
              <span className="block text-[9px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
                portfolio
              </span>
            </div>
          </button>

          {/* ── Desktop nav ── */}
          <nav className="hidden items-center gap-0.5 xl:flex" role="navigation">
            {NAV_ITEMS.map(({ id, icon: Icon }) => {
              const active = activeSection === id
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`navbar-link ${active ? 'navbar-link--active' : ''}`}
                >
                  {active && (
                    <motion.span
                      layoutId="navbar-pill"
                      className="navbar-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <Icon size={12} className="relative z-10 flex-shrink-0" />
                  <span className="relative z-10">{labelOf(id)}</span>
                </button>
              )
            })}
          </nav>

          {/* ── Desktop controls ── */}
          <div className="hidden items-center gap-2 xl:flex">
            {/* Command palette */}
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

            {/* Language switcher */}
            <div className="navbar-lang-switcher">
              <FiGlobe size={11} className="text-[var(--text-muted)]" />
              {['EN', 'KINY', 'FR'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`navbar-lang-btn ${language === lang ? 'navbar-lang-btn--active' : ''}`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="navbar-theme-btn"
            >
              <motion.span
                key={theme}
                initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 30, opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.22 }}
                className="flex items-center justify-center"
              >
                {theme === 'dark' ? <FiSun size={15} /> : <FiMoon size={15} />}
              </motion.span>
            </button>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setOpen((p) => !p)}
            aria-label="Toggle menu"
            className="navbar-hamburger xl:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'x' : 'menu'}
                initial={{ rotate: -20, opacity: 0 }}
                animate={{ rotate: 0,   opacity: 1 }}
                exit={{   rotate:  20, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="flex items-center justify-center"
              >
                {open ? <FiX size={20} /> : <FiMenu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1,  y: 0 }}
              exit={{   opacity: 0,  y: -12 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="mobile-menu-panel overflow-hidden border-t border-[var(--border)]"
            >
              <div className="container-shell py-4">
                {/* Nav items */}
                <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                  {NAV_ITEMS.map(({ id, icon: Icon }, i) => {
                    const active = activeSection === id
                    return (
                      <motion.button
                        key={id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.18, delay: i * 0.025 }}
                        onClick={() => scrollTo(id)}
                        className={`mobile-nav-item ${active ? 'mobile-nav-item--active' : ''}`}
                      >
                        <span className={`mobile-nav-icon ${active ? 'mobile-nav-icon--active' : ''}`}>
                          <Icon size={14} />
                        </span>
                        <span className="text-sm font-medium">{labelOf(id)}</span>
                        {active && (
                          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
                            style={{ boxShadow: '0 0 6px var(--accent)' }} />
                        )}
                      </motion.button>
                    )
                  })}
                </div>

                {/* Bottom controls */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.22 }}
                  className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-3"
                >
                  {/* Language */}
                  <div className="navbar-lang-switcher">
                    <FiGlobe size={11} className="text-[var(--text-muted)]" />
                    {['EN', 'KINY', 'FR'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`navbar-lang-btn ${language === lang ? 'navbar-lang-btn--active' : ''}`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>

                  {/* Theme */}
                  <button onClick={toggleTheme} className="navbar-theme-btn" aria-label="Toggle theme">
                    {theme === 'dark' ? <FiSun size={15} /> : <FiMoon size={15} />}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}