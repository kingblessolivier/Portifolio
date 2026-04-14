import { useEffect, useMemo, useState } from 'react'
import { FiCheck, FiCommand, FiMoon, FiSearch, FiSun } from 'react-icons/fi'

export default function CommandPalette({ navLabels, onNavigate, theme, toggleTheme, language, setLanguage }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const commands = useMemo(
    () => [
      { id: 'home', label: navLabels.home, group: 'Navigate', action: () => onNavigate('home') },
      { id: 'about', label: navLabels.about, group: 'Navigate', action: () => onNavigate('about') },
      { id: 'work', label: navLabels.work, group: 'Navigate', action: () => onNavigate('work') },
      { id: 'projects', label: navLabels.projects, group: 'Navigate', action: () => onNavigate('projects') },
      { id: 'systems', label: navLabels.systems, group: 'Navigate', action: () => onNavigate('systems') },
      { id: 'skills', label: navLabels.skills, group: 'Navigate', action: () => onNavigate('skills') },
      { id: 'awards', label: navLabels.awards, group: 'Navigate', action: () => onNavigate('awards') },
      { id: 'gallery', label: navLabels.gallery, group: 'Navigate', action: () => onNavigate('gallery') },
      { id: 'contact', label: navLabels.contact, group: 'Navigate', action: () => onNavigate('contact') },
      {
        id: 'theme',
        label: theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme',
        group: 'Appearance',
        action: toggleTheme,
      },
      { id: 'lang-en', label: 'Language: English', group: 'Language', action: () => setLanguage('EN') },
      { id: 'lang-k', label: 'Language: Kinyarwanda', group: 'Language', action: () => setLanguage('KINY') },
      { id: 'lang-fr', label: 'Language: French', group: 'Language', action: () => setLanguage('FR') },
    ],
    [language, navLabels, onNavigate, setLanguage, theme, toggleTheme],
  )

  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase()
    if (!text) return commands
    return commands.filter((item) => `${item.label} ${item.group}`.toLowerCase().includes(text))
  }, [commands, query])

  useEffect(() => {
    const onKeyDown = (event) => {
      const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'
      if (isShortcut) {
        event.preventDefault()
        setOpen((prev) => !prev)
      }

      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!open) {
      setQuery('')
    }
  }, [open])

  const runCommand = (command) => {
    command.action()
    setOpen(false)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="command-palette-trigger card-surface hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold md:inline-flex"
      >
        <FiCommand size={13} />
        <span>Quick Actions</span>
        <span className="command-kbd">Ctrl K</span>
      </button>

      {open && (
        <div className="command-palette-backdrop" onClick={() => setOpen(false)}>
          <div className="command-palette-panel" onClick={(event) => event.stopPropagation()}>
            <div className="command-palette-head">
              <FiSearch className="text-[var(--text-muted)]" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search commands..."
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>

            <div className="command-palette-list">
              {filtered.map((item) => (
                <button key={item.id} onClick={() => runCommand(item)} className="command-palette-item">
                  <span className="inline-flex items-center gap-2">
                    {item.id === 'theme' ? theme === 'dark' ? <FiSun size={14} /> : <FiMoon size={14} /> : <FiCommand size={14} />}
                    {item.label}
                  </span>
                  {(item.id === `lang-${language.toLowerCase()}` || (item.id === 'lang-k' && language === 'KINY')) && (
                    <FiCheck size={14} className="text-[var(--accent)]" />
                  )}
                </button>
              ))}
              {filtered.length === 0 && <p className="px-3 py-4 text-xs text-[var(--text-muted)]">No command found.</p>}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
