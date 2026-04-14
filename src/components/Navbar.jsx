import { useEffect, useState } from 'react'
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
    const onScroll = () => {
      setIsShrunk(window.scrollY > 24)
    }

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
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id)
            }
          },
          { threshold: 0.45 },
        )

        observer.observe(element)
        return observer
      })

    return () => observers.forEach((observer) => observer.disconnect())
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
      className={`glass-nav fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] transition-all ${
        isShrunk ? 'shadow-[0_10px_40px_-24px_rgba(0,0,0,0.55)]' : ''
      }`}
    >
      <div className={`container-shell flex items-center justify-between transition-all ${isShrunk ? 'h-12' : 'h-14'}`}>
        <button
          onClick={() => scrollTo('home')}
          className="group flex items-center gap-1.5 text-base font-semibold tracking-tight"
          aria-label="Go to home"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] transition group-hover:scale-125" />
          <span>Olivier</span>
        </button>

        <nav className="hidden items-center gap-2 xl:flex">
          {sectionIds.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
                activeSection === id
                  ? 'bg-[color:color-mix(in_srgb,var(--accent)_22%,transparent)] text-[var(--text)] shadow-[0_10px_24px_-18px_rgba(59,130,246,0.65)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              {sectionLabelMap[id]}
            </button>
          ))}
        </nav>

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
            <FiGlobe className="ml-1.5 text-[var(--text-muted)]" />
            {['EN', 'KINY', 'FR'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`rounded-full px-2.5 py-1 transition ${
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

        <button
          onClick={() => setOpen((prev) => !prev)}
          className="card-surface rounded-lg p-2 text-2xl xl:hidden"
          aria-label="Toggle menu"
        >
          {open ? <HiXMark /> : <HiBars3BottomRight />}
        </button>
      </div>

      {open && (
        <div className="container-shell space-y-4 border-t border-[var(--border)] py-4 xl:hidden">
          <div className="grid gap-2">
            {sectionIds.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`rounded-lg px-3 py-2 text-left text-sm transition ${
                  activeSection === id
                    ? 'bg-[color:color-mix(in_srgb,var(--accent)_24%,transparent)] text-[var(--text)]'
                    : 'text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--text)]'
                }`}
              >
                {sectionLabelMap[id]}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3">
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
      )}
    </header>
  )
}
