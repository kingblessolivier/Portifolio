import { motion } from 'framer-motion'

export default function SectionConnector() {
  return (
    <div className="pointer-events-none relative z-10 mx-auto flex h-20 w-full max-w-[1200px] items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scaleY: 0.5 }}
        whileInView={{ opacity: 1, scaleY: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="connector-line relative h-16 w-px"
      >
        <motion.span
          animate={{ y: [0, 42, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          className="connector-dot absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full"
        />
      </motion.div>
    </div>
  )
}
