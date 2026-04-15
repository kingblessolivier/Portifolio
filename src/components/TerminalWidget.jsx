import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Terminal sessions that cycle automatically ──────────── */
const SESSIONS = [
  {
    lines: [
      { type: 'cmd',    text: 'git clone https://github.com/olivier/ai-system.git' },
      { type: 'output', text: "Cloning into 'ai-system'..." },
      { type: 'output', text: '✓ Received 847 objects. Done.' },
      { type: 'cmd',    text: 'cd ai-system && npm install' },
      { type: 'output', text: 'added 312 packages in 4.1s' },
      { type: 'cmd',    text: 'npm run dev' },
      { type: 'output', text: '→  Local:   http://localhost:5173/' },
      { type: 'success', text: '✓ ready in 392ms' },
    ],
  },
  {
    lines: [
      { type: 'cmd',    text: 'python train_model.py --epochs 50' },
      { type: 'output', text: 'Loading dataset... 12,540 samples' },
      { type: 'output', text: 'Epoch 50/50 ━━━━━━━━━━ 100%' },
      { type: 'success', text: 'accuracy: 94.7%  |  loss: 0.142' },
      { type: 'cmd',    text: 'python deploy.py --env production' },
      { type: 'output', text: 'Building Docker image...' },
      { type: 'success', text: '✓ Deployed to api.olivier.dev' },
    ],
  },
  {
    lines: [
      { type: 'cmd',    text: 'docker build -t portfolio-api:latest .' },
      { type: 'output', text: '[1/4] FROM node:20-alpine' },
      { type: 'output', text: '[4/4] RUN npm run build' },
      { type: 'success', text: '✓ Successfully built 3f9a2b1c' },
      { type: 'cmd',    text: 'kubectl apply -f k8s/deployment.yaml' },
      { type: 'output', text: 'deployment.apps/api configured' },
      { type: 'success', text: '✓ 3/3 pods running' },
    ],
  },
]

const CHAR_DELAY = 38      // ms per character
const LINE_PAUSE = 420     // ms after each line
const SESSION_PAUSE = 2200 // ms before cycling to next session

export default function TerminalWidget({ className = '' }) {
  const [sessionIdx, setSessionIdx] = useState(0)
  const [visibleLines, setVisibleLines] = useState([])  // { type, text, done }
  const [currentLineIdx, setCurrentLineIdx] = useState(0)
  const [typedChars, setTypedChars] = useState(0)
  const [phase, setPhase] = useState('typing') // 'typing' | 'pause' | 'done'
  const timerRef = useRef(null)
  const bodyRef = useRef(null)

  const session = SESSIONS[sessionIdx]

  /* ── Reset when session changes ── */
  useEffect(() => {
    setVisibleLines([])
    setCurrentLineIdx(0)
    setTypedChars(0)
    setPhase('typing')
  }, [sessionIdx])

  /* ── Core animation engine ── */
  useEffect(() => {
    clearTimeout(timerRef.current)

    if (phase === 'done') {
      timerRef.current = setTimeout(() => {
        setSessionIdx((idx) => (idx + 1) % SESSIONS.length)
      }, SESSION_PAUSE)
      return
    }

    if (currentLineIdx >= session.lines.length) {
      setPhase('done')
      return
    }

    const line = session.lines[currentLineIdx]
    const isCmd = line.type === 'cmd'

    if (phase === 'typing') {
      if (isCmd) {
        // type character by character
        if (typedChars < line.text.length) {
          timerRef.current = setTimeout(() => {
            setTypedChars((n) => n + 1)
          }, CHAR_DELAY)
        } else {
          // finished typing — push line and pause
          setVisibleLines((prev) => [...prev, { ...line, done: true }])
          setTypedChars(0)
          setPhase('pause')
        }
      } else {
        // output lines appear instantly after a short pause
        setVisibleLines((prev) => [...prev, { ...line, done: true }])
        timerRef.current = setTimeout(() => {
          setCurrentLineIdx((n) => n + 1)
        }, LINE_PAUSE)
      }
    }

    if (phase === 'pause') {
      timerRef.current = setTimeout(() => {
        setCurrentLineIdx((n) => n + 1)
        setPhase('typing')
      }, LINE_PAUSE)
    }

    return () => clearTimeout(timerRef.current)
  }, [phase, currentLineIdx, typedChars, session])

  /* ── Auto-scroll terminal body (NOT the page) ── */
  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [visibleLines, typedChars])

  const currentCmd =
    phase === 'typing' &&
    currentLineIdx < session.lines.length &&
    session.lines[currentLineIdx].type === 'cmd'
      ? session.lines[currentLineIdx].text.slice(0, typedChars)
      : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`terminal-window ${className}`}
    >
      {/* ── Title bar ── */}
      <div className="terminal-titlebar">
        <div className="flex items-center gap-1.5">
          <span className="terminal-dot terminal-dot--red" />
          <span className="terminal-dot terminal-dot--yellow" />
          <span className="terminal-dot terminal-dot--green" />
        </div>
        <span className="terminal-title">olivier@portfolio: ~</span>
        <div className="flex items-center gap-1 opacity-50">
          <span className="terminal-badge">zsh</span>
        </div>
      </div>

      {/* ── Body ── */}
      <div ref={bodyRef} className="terminal-body">
        <AnimatePresence>
          {visibleLines.map((line, i) => (
            <motion.div
              key={`${sessionIdx}-${i}`}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.18 }}
              className="terminal-line"
            >
              {line.type === 'cmd' && (
                <>
                  <span className="terminal-prompt">❯</span>
                  <span className="terminal-cmd">{line.text}</span>
                </>
              )}
              {line.type === 'output' && (
                <span className="terminal-output">{line.text}</span>
              )}
              {line.type === 'success' && (
                <span className="terminal-success">{line.text}</span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Currently-typing command */}
        {currentCmd !== null && (
          <div className="terminal-line">
            <span className="terminal-prompt">❯</span>
            <span className="terminal-cmd">{currentCmd}</span>
            <span className="terminal-caret" />
          </div>
        )}

      </div>

      {/* ── Session dots ── */}
      <div className="terminal-footer">
        <div className="flex gap-1.5">
          {SESSIONS.map((_, i) => (
            <button
              key={i}
              onClick={() => setSessionIdx(i)}
              aria-label={`Session ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === sessionIdx
                  ? 'w-5 bg-[var(--terminal-green)]'
                  : 'w-1.5 bg-[var(--terminal-muted)]'
              }`}
            />
          ))}
        </div>
        <span className="terminal-status-text">live session</span>
      </div>
    </motion.div>
  )
}
