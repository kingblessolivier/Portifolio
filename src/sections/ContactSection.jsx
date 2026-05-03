import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMail, FiMessageCircle, FiPhone, FiCheckCircle, FiCopy } from 'react-icons/fi'
import SectionReveal from '../components/SectionReveal'
import { contactInfo, portfolioData } from '../assets/data'

export default function ContactSection({ navLabels, sectionText }) {
  const text = sectionText.contact
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    })
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = text.errors.name
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = text.errors.email
    if (form.message.trim().length < 12) next.message = text.errors.message
    return next
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate()
    if (Object.keys(nextErrors).length > 0) { setErrors(nextErrors); return }
    setErrors({})
    setIsSubmitting(true)

    const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT

    try {
      if (formspreeEndpoint) {
        /* ── Primary: Formspree ── */
        const res = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            message: form.message,
            _replyto: form.email,
            _subject: `Portfolio message from ${form.name}`,
          }),
        })
        if (!res.ok) throw new Error('Formspree error')
      } else {
        /* ── Fallback: open email client pre-filled ── */
        const subject = encodeURIComponent(`Portfolio message from ${form.name}`)
        const body    = encodeURIComponent(
          `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
        )
        window.open(
          `mailto:${contactInfo.email}?subject=${subject}&body=${body}`,
          '_blank'
        )
      }

      setSubmitted(true)
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch {
      /* Formspree failed — still open mailto as last resort */
      const subject = encodeURIComponent(`Portfolio message from ${form.name}`)
      const body    = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
      )
      window.open(
        `mailto:${contactInfo.email}?subject=${subject}&body=${body}`,
        '_blank'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass = (field) =>
    `mt-2 w-full rounded-xl border bg-[var(--bg)] px-4 py-3 text-sm outline-none transition ${
      focusedField === field
        ? 'border-[var(--accent)] ring-2 ring-[color:color-mix(in_srgb,var(--accent)_22%,transparent)]'
        : errors[field]
        ? 'border-red-500 ring-2 ring-red-500/20'
        : 'border-[var(--border)]'
    }`

  return (
    <SectionReveal id="contact" className="section-gap">
      <div className="container-shell">
        <span className="section-tag mb-3 block w-fit">{text.sectionTag ?? 'Contact'}</span>
        <h2 className="section-title mb-12 text-3xl font-bold sm:text-4xl">{navLabels.contact}</h2>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Info panel */}
          <div className="card-surface relative overflow-hidden rounded-2xl p-6 lg:col-span-2">
            {/* Background glow */}
            <div
              className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-2xl"
              style={{ background: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}
            />

            <h3 className="relative mb-5 text-xl font-semibold">{text.directTitle}</h3>

            <div className="relative space-y-4 text-sm text-[var(--text-muted)]">
              {/* Email — clickable copy */}
              <button
                onClick={copyEmail}
                className="group flex w-full items-center gap-3 rounded-xl p-1 text-left transition hover:text-[var(--text)]"
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: 'color-mix(in srgb, var(--accent) 10%, var(--surface))',
                    color: 'var(--accent)',
                    border: '1px solid color-mix(in srgb, var(--accent) 18%, var(--border))',
                  }}
                >
                  {copied ? <FiCheckCircle size={14} className="text-emerald-400" /> : <FiMail size={14} />}
                </span>
                <span className="flex-1 truncate">{contactInfo.email}</span>
                <span className="opacity-0 transition group-hover:opacity-100">
                  {copied
                    ? <FiCheckCircle size={12} className="text-emerald-400" />
                    : <FiCopy size={12} />}
                </span>
              </button>

              {[
                { icon: FiPhone, value: contactInfo.phone },
                { icon: FiMessageCircle, value: contactInfo.whatsapp },
              ].map(({ icon: Icon, value }) => (
                <p key={value} className="flex items-center gap-3">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background: 'color-mix(in srgb, var(--accent) 10%, var(--surface))',
                      color: 'var(--accent)',
                      border: '1px solid color-mix(in srgb, var(--accent) 18%, var(--border))',
                    }}
                  >
                    <Icon size={14} />
                  </span>
                  {value}
                </p>
              ))}
            </div>

            <div className="relative mt-6 border-t border-[var(--border)] pt-5">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{text.profilesLabel}</p>
              <div className="space-y-2 text-sm">
                {portfolioData.professionalLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-[var(--text-muted)] transition hover:text-[var(--accent)]"
                  >
                    <span className="h-px flex-1 bg-[var(--border)]" />
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="card-surface rounded-2xl p-6 lg:col-span-3">
            <div className="grid gap-4">
              {[
                { field: 'name', label: text.name, type: 'text', placeholder: text.namePlaceholder },
                { field: 'email', label: text.email, type: 'email', placeholder: text.emailPlaceholder },
              ].map(({ field, label, type, placeholder }) => (
                <label key={field} className="text-sm font-medium">
                  {label}
                  <input
                    type={type}
                    value={form[field]}
                    onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))}
                    onFocus={() => setFocusedField(field)}
                    onBlur={() => setFocusedField(null)}
                    className={inputClass(field)}
                    placeholder={placeholder}
                  />
                  <AnimatePresence>
                    {errors[field] && (
                      <motion.span
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="mt-1.5 block text-xs text-red-500"
                      >
                        {errors[field]}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </label>
              ))}

              <label className="text-sm font-medium">
                {text.message}
                <textarea
                  rows="5"
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  className={inputClass('message')}
                  placeholder={text.messagePlaceholder}
                />
                <AnimatePresence>
                  {errors.message && (
                    <motion.span
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="mt-1.5 block text-xs text-red-500"
                    >
                      {errors.message}
                    </motion.span>
                  )}
                </AnimatePresence>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="glow-btn mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-75 active:scale-95"
            >
              {isSubmitting && (
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/90 border-t-transparent" />
              )}
              {isSubmitting ? text.sending : text.send}
            </button>

            {/* Copy toast */}
            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                  className="fixed bottom-6 left-6 z-[90] flex items-center gap-2.5 rounded-xl border border-sky-500/30 bg-sky-500/15 px-4 py-3 text-sm text-sky-400 shadow-2xl backdrop-blur"
                >
                  <FiCopy size={14} />
                  Email copied to clipboard
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success toast */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="fixed bottom-6 right-6 z-[90] flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/15 px-4 py-3 text-sm text-emerald-400 shadow-2xl backdrop-blur"
                >
                  <FiCheckCircle size={16} />
                  <div>
                    <p className="font-semibold">{text.success}</p>
                    <p className="text-xs opacity-70">Sent to nsengimanaolivier100@gmail.com</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </SectionReveal>
  )
}
