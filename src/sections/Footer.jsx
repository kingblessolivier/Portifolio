import { FiGithub, FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi'
import VisitCounter from '../components/VisitCounter'
import { socialLinks } from '../assets/data'

export default function Footer({ visitorsLabel }) {
  return (
    <footer className="border-t border-[var(--border)] py-12">
      <div className="container-shell flex flex-col items-center justify-between gap-4 text-sm text-[var(--text-muted)] sm:flex-row">
        <div>
          <VisitCounter label={visitorsLabel} />
          <p className="mt-4">© {new Date().getFullYear()} NSENGIMANA Olivier. All rights reserved.</p>
        </div>

        <div className="flex items-center gap-3 text-lg">
          {socialLinks.github && (
            <a href={socialLinks.github} target="_blank" rel="noreferrer" className="transition hover:text-[var(--accent)]" aria-label="GitHub">
              <FiGithub />
            </a>
          )}
          {socialLinks.linkedin && (
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="transition hover:text-[var(--accent)]" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
          )}
          {socialLinks.twitter && (
            <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="transition hover:text-[var(--accent)]" aria-label="Twitter">
              <FiTwitter />
            </a>
          )}
          {socialLinks.instagram && (
            <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="transition hover:text-[var(--accent)]" aria-label="Instagram">
              <FiInstagram />
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
