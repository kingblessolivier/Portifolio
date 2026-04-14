import { useState } from 'react'
import { FiMail, FiMessageCircle, FiPhone } from 'react-icons/fi'
import SectionReveal from '../components/SectionReveal'
import { contactInfo, portfolioData } from '../assets/data'

export default function ContactSection({ navLabels, sectionText }) {
  const text = sectionText.contact
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setSubmitted(false)
      return
    }

    setErrors({})
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 850))
    setIsSubmitting(false)
    setSubmitted(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitted(false), 2200)
  }

  return (
    <SectionReveal id="contact" className="section-gap">
      <div className="container-shell">
        <h2 className="section-title mb-12 text-3xl font-bold sm:text-4xl">{navLabels.contact}</h2>

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="card-surface rounded-2xl p-6 lg:col-span-2">
            <h3 className="mb-5 text-xl font-semibold">{text.directTitle}</h3>

            <div className="space-y-4 text-sm text-[var(--text-muted)]">
              <p className="flex items-center gap-3">
                <FiMail className="text-[var(--accent)]" />
                {contactInfo.email}
              </p>
              <p className="flex items-center gap-3">
                <FiPhone className="text-[var(--accent)]" />
                {contactInfo.phone}
              </p>
              <p className="flex items-center gap-3">
                <FiMessageCircle className="text-[var(--accent)]" />
                {contactInfo.whatsapp}
              </p>
            </div>

            <div className="mt-6 border-t border-[var(--border)] pt-5">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{text.profilesLabel}</p>
              <div className="space-y-2 text-sm">
                {portfolioData.professionalLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-[var(--text-muted)] transition hover:text-[var(--accent)]"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="card-surface rounded-2xl p-6 lg:col-span-3">
            <div className="grid gap-4">
              <label className="text-sm font-medium">
                {text.name}
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none ring-[var(--accent)] transition focus:ring-2"
                  placeholder={text.namePlaceholder}
                />
                {errors.name && <span className="mt-2 block text-xs text-red-500">{errors.name}</span>}
              </label>

              <label className="text-sm font-medium">
                {text.email}
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none ring-[var(--accent)] transition focus:ring-2"
                  placeholder={text.emailPlaceholder}
                />
                {errors.email && <span className="mt-2 block text-xs text-red-500">{errors.email}</span>}
              </label>

              <label className="text-sm font-medium">
                {text.message}
                <textarea
                  rows="5"
                  value={form.message}
                  onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 outline-none ring-[var(--accent)] transition focus:ring-2"
                  placeholder={text.messagePlaceholder}
                />
                {errors.message && <span className="mt-2 block text-xs text-red-500">{errors.message}</span>}
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="glow-btn mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-75"
            >
              {isSubmitting && <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/90 border-t-transparent" />}
              {isSubmitting ? text.sending : text.send}
            </button>

            {submitted && (
              <div className="fixed bottom-5 right-5 z-[90] rounded-xl border border-emerald-600/35 bg-emerald-500/15 px-4 py-3 text-sm text-emerald-500 shadow-2xl backdrop-blur">
                {text.success}
              </div>
            )}
          </form>
        </div>
      </div>
    </SectionReveal>
  )
}
