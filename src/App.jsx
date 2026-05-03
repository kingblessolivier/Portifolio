import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import ChatbotWidget from './components/ChatbotWidget'
import SectionConnector from './components/SectionConnector'
import ScrollProgress from './components/ScrollProgress'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import WorkExperienceSection from './sections/WorkExperienceSection'
import ProjectsSection from './sections/ProjectsSection'
import SystemDesignSection from './sections/SystemDesignSection'
import SkillsSection from './sections/SkillsSection'
import AwardsSection from './sections/AwardsSection'
import GallerySection from './sections/GallerySection'
import ContactSection from './sections/ContactSection'
import Footer from './sections/Footer'
import { labels, uiContent } from './assets/data'
import CursorTrail from './components/CursorTrail'

function getInitialTheme() {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [language, setLanguage] = useState('EN')

  const navLabels = useMemo(() => labels[language], [language])
  const sectionText = useMemo(() => uiContent[language], [language])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <CursorTrail />
      <ScrollProgress />

      {/* ── Ambient background orbs (fixed, full-page) ── */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="orb-float-1 absolute -left-32 top-16 h-96 w-96 rounded-full bg-[color:color-mix(in_srgb,var(--accent)_8%,transparent)] blur-3xl" />
        <div className="orb-float-2 absolute -right-20 top-48 h-96 w-96 rounded-full bg-[color:color-mix(in_srgb,var(--accent-purple)_8%,transparent)] blur-3xl" />
        <div className="orb-float-3 absolute left-1/4 top-[42vh] h-72 w-72 rounded-full bg-[color:color-mix(in_srgb,#10b981_5%,transparent)] blur-3xl" />
        <div className="orb-float-4 absolute right-1/4 top-[66vh] h-64 w-64 rounded-full bg-[color:color-mix(in_srgb,var(--accent)_6%,transparent)] blur-3xl" />
        <div className="orb-float-1 absolute -bottom-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[color:color-mix(in_srgb,var(--accent-purple)_7%,transparent)] blur-3xl" />
      </div>

      <Navbar
        navLabels={navLabels}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main>
        <HeroSection labels={navLabels} />
        <SectionConnector />
        <AboutSection language={language} setLanguage={setLanguage} navLabels={navLabels} sectionText={sectionText} />
        <SectionConnector />
        <ProjectsSection navLabels={navLabels} language={language} sectionText={sectionText} />
        <SectionConnector />
        <SystemDesignSection sectionText={sectionText} language={language} />
        <SectionConnector />
        <SkillsSection navLabels={navLabels} sectionText={sectionText} />
        <SectionConnector />
        <AwardsSection navLabels={navLabels} sectionText={sectionText} language={language} />
        <SectionConnector />
        <GallerySection navLabels={navLabels} sectionText={sectionText} language={language} />
        <SectionConnector />
        <WorkExperienceSection language={language} sectionText={sectionText} />
        <SectionConnector />
        <ContactSection navLabels={navLabels} sectionText={sectionText} />
      </main>

      <Footer visitorsLabel={navLabels.visitors} />
      <ChatbotWidget />
    </div>
  )
}
