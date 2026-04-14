import { useMemo, useState } from 'react'
import { FiMessageSquare, FiSend, FiX } from 'react-icons/fi'
import { portfolioData } from '../assets/data'

const BOT_NAME = 'Assistant'

function getResponse(input) {
  const text = input.trim().toLowerCase()

  if (!text) {
    return 'Please type something so I can help.'
  }

  if (text.includes('project') || text.includes('portfolio') || text.includes('work')) {
    const topProjects = portfolioData.projects.slice(0, 3).map((item) => item.name).join(', ')
    return `Top projects include ${topProjects}. I can also explain each case study if you ask about problem, solution, or architecture.`
  }

  if (text.includes('skill') || text.includes('tech') || text.includes('stack')) {
    const coreSkills = portfolioData.skills.frontend
      .slice(0, 2)
      .concat(portfolioData.skills.backend.slice(0, 2))
      .map((item) => item.name)
      .join(', ')
    return `Core technical skills include ${coreSkills}. I can also share AI/ML, database, and professional skills.`
  }

  if (text.includes('contact') || text.includes('email') || text.includes('phone')) {
    return `You can reach Olivier via email: ${portfolioData.personal.email}, phone: ${portfolioData.personal.phone}, or WhatsApp: ${portfolioData.personal.whatsapp}.`
  }

  if (text.includes('education') || text.includes('university') || text.includes('degree')) {
    const edu = portfolioData.education[0]
    return `${edu.degree.EN} at ${edu.institution.EN}, expected graduation ${edu.expectedGraduation}.`
  }

  if (text.includes('experience') || text.includes('intern')) {
    const roleList = portfolioData.workExperience.map((item) => `${item.role.EN} at ${item.company}`).join(' | ')
    return `Professional experience: ${roleList}.`
  }

  if (text.includes('hackathon') || text.includes('medlink')) {
    return 'MedLink was built during the HATANA Hackathon at the University of Rwanda to reduce hospital queue delays through digital appointment booking and nearby hospital discovery.'
  }

  return 'I can help with projects, skills, education, experience, and contact info. Try asking: "Tell me about MedLink" or "What are your top skills?"'
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      content: 'Hi, I am OlivierBot. Ask me about projects, skills, education, or contact details.',
    },
  ])

  const quickPrompts = useMemo(() => ['Top projects', 'Skills overview', 'Education background', 'Contact info'], [])

  const sendMessage = (value) => {
    const text = value.trim()
    if (!text) return

    const userMessage = { id: Date.now(), role: 'user', content: text }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setTyping(true)

    window.setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        role: 'bot',
        content: getResponse(text),
      }
      setMessages((prev) => [...prev, botMessage])
      setTyping(false)
    }, 520)
  }

  return (
    <div className="fixed bottom-5 right-5 z-[110]">
      {open && (
        <div className="card-surface mb-3 w-[min(92vw,360px)] overflow-hidden rounded-2xl border border-[var(--border)]">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
            <div>
              <p className="text-sm font-semibold">{BOT_NAME}</p>
              <p className="text-xs text-[var(--text-muted)]">Smart Portfolio Assistant</p>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-full p-1 text-[var(--text-muted)]" aria-label="Close chatbot">
              <FiX />
            </button>
          </div>

          <div className="max-h-80 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6 ${
                    message.role === 'user'
                      ? 'bg-[var(--accent)] text-white'
                      : 'border border-[var(--border)] bg-[var(--surface)] text-[var(--text)]'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {typing && (
              <div className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--text-muted)]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
                Assistant is typing...
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 border-t border-[var(--border)] px-3 py-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[11px] text-[var(--text-muted)]"
              >
                {prompt}
              </button>
            ))}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault()
              sendMessage(input)
            }}
            className="flex items-center gap-2 border-t border-[var(--border)] px-3 py-3"
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask something..."
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm outline-none"
            />
            <button type="submit" className="rounded-xl bg-[var(--accent)] p-2 text-white" aria-label="Send message">
              <FiSend size={14} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="glow-btn inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold"
        aria-label="Toggle chatbot"
      >
        <FiMessageSquare />
        Assistant
      </button>
    </div>
  )
}
