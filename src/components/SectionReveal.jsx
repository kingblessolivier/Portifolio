import { motion } from 'framer-motion'

export default function SectionReveal({ id, children, className = '' }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 56, scale: 0.985, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  )
}
