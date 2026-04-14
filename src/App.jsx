import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import MouseGlow from './components/MouseGlow'
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

function getInitialTheme() {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') {
    return stored
  }

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

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <ScrollProgress />
      <MouseGlow />

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 top-16 h-72 w-72 rounded-full bg-[color:color-mix(in_srgb,var(--accent)_14%,transparent)] blur-3xl" />
        <div className="absolute -right-20 top-52 h-72 w-72 rounded-full bg-[color:color-mix(in_srgb,var(--accent-purple)_14%,transparent)] blur-3xl" />
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
        <SystemDesignSection sectionText={sectionText} />
        <SectionConnector />
        <SkillsSection navLabels={navLabels} sectionText={sectionText} />
        <SectionConnector />
        <AwardsSection navLabels={navLabels} sectionText={sectionText} />
        <SectionConnector />
        <GallerySection navLabels={navLabels} sectionText={sectionText} />
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
