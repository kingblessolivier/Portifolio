import { motion } from 'framer-motion'
import { FiGithub, FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi'
import VisitCounter from '../components/VisitCounter'
import { socialLinks } from '../assets/data'

const socials = [
  { key: 'github', icon: FiGithub, label: 'GitHub', href: socialLinks.github },
  { key: 'linkedin', icon: FiLinkedin, label: 'LinkedIn', href: socialLinks.linkedin },
  { key: 'twitter', icon: FiTwitter, label: 'Twitter', href: socialLinks.twitter },
  { key: 'instagram', icon: FiInstagram, label: 'Instagram', href: socialLinks.instagram },
].filter((s) => s.href)

export default function Footer({ visitorsLabel }) {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--border)] py-14">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at 50% 120%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 65%)',
        }}
      />

      <div className="container-shell relative z-10 flex flex-col items-center justify-between gap-6 text-sm text-[var(--text-muted)] sm:flex-row">
        <div className="text-center sm:text-left">
          <VisitCounter label={visitorsLabel} />
          <p className="mt-3 text-xs">
            © {new Date().getFullYear()}{' '}
            <span className="footer-brand">NSENGIMANA Olivier</span>
            . All rights reserved.
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)] opacity-60">
            Designed &amp; built with care
          </p>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-4 text-xl">
          {socials.map(({ key, icon: Icon, label, href }, index) => (
            <motion.a
              key={key}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.07 }}
              whileHover={{ y: -3, scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              className="social-link"
            >
              <Icon />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute inset-x-0 bottom-0 h-0.5 opacity-40"
        style={{ background: 'linear-gradient(90deg, transparent, var(--accent), var(--accent-purple), transparent)' }}
      />
    </footer>
  )
}
