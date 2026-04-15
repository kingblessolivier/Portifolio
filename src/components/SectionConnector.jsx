import { motion } from 'framer-motion'

export default function SectionConnector() {
  return (
    <div className="pointer-events-none relative z-10 mx-auto flex h-12 w-full max-w-[1200px] items-center justify-center">

      {/* Left branch line */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        style={{ transformOrigin: 'right center' }}
        className="absolute left-1/2 top-1/2 h-px w-28 -translate-x-[calc(100%+6px)] -translate-y-1/2 bg-gradient-to-l from-[color:color-mix(in_srgb,var(--accent)_38%,transparent)] to-transparent"
      />

      {/* Right branch line */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        style={{ transformOrigin: 'left center' }}
        className="absolute left-1/2 top-1/2 h-px w-28 translate-x-[6px] -translate-y-1/2 bg-gradient-to-r from-[color:color-mix(in_srgb,var(--accent)_38%,transparent)] to-transparent"
      />

      {/* Left end dot */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: 0.75 }}
        className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-[calc(112px+3px)] -translate-y-1/2 rounded-full bg-[var(--accent)] opacity-50"
      />

      {/* Right end dot */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: 0.75 }}
        className="absolute left-1/2 top-1/2 h-1.5 w-1.5 translate-x-[109px] -translate-y-1/2 rounded-full bg-[var(--accent-purple)] opacity-50"
      />

      {/* Main vertical line */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        whileInView={{ opacity: 1, scaleY: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'top center' }}
        className="connector-line relative h-8 w-px"
      >
        {/* Primary traveling dot */}
        <motion.span
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          className="connector-dot absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full"
        />
        {/* Secondary traveling dot (opposite phase) */}
        <motion.span
          animate={{ y: [20, 0, 20] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
          className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full opacity-50"
          style={{
            background: 'var(--accent-purple)',
            boxShadow: '0 0 12px color-mix(in srgb, var(--accent-purple) 70%, transparent)',
          }}
        />
      </motion.div>

      {/* Center glow ring */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'linear-gradient(135deg, var(--accent), var(--accent-purple))',
          boxShadow: '0 0 18px color-mix(in srgb, var(--accent) 65%, transparent)',
        }}
      >
        {/* Expanding pulse */}
        <motion.span
          animate={{ scale: [1, 2.6, 1], opacity: [0.65, 0, 0.65] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full"
          style={{ background: 'var(--accent)' }}
        />
      </motion.div>
    </div>
  )
}
