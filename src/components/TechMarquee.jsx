import { FiCode, FiDatabase, FiCpu, FiCloud, FiGitBranch, FiTerminal } from 'react-icons/fi'

const TECH = [
  { label: 'React',       icon: <FiCode size={13} /> },
  { label: 'Python',      icon: <FiTerminal size={13} /> },
  { label: 'Django',      icon: <FiCode size={13} /> },
  { label: 'PostgreSQL',  icon: <FiDatabase size={13} /> },
  { label: 'TensorFlow',  icon: <FiCpu size={13} /> },
  { label: 'Docker',      icon: <FiCloud size={13} /> },
  { label: 'Git',         icon: <FiGitBranch size={13} /> },
  { label: 'TypeScript',  icon: <FiCode size={13} /> },
  { label: 'Node.js',     icon: <FiTerminal size={13} /> },
  { label: 'MySQL',       icon: <FiDatabase size={13} /> },
  { label: 'REST APIs',   icon: <FiCode size={13} /> },
  { label: 'Tailwind',    icon: <FiCode size={13} /> },
  { label: 'Kubernetes',  icon: <FiCloud size={13} /> },
  { label: 'scikit-learn',icon: <FiCpu size={13} /> },
]

/* Double the array so the seamless-loop CSS works */
const ITEMS = [...TECH, ...TECH]

export default function TechMarquee() {
  return (
    <div className="marquee-shell" aria-hidden="true">
      <div className="marquee-track">
        {ITEMS.map((tech, i) => (
          <span key={i} className="marquee-chip">
            <span className="marquee-chip-icon">{tech.icon}</span>
            {tech.label}
          </span>
        ))}
      </div>
    </div>
  )
}
