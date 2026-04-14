import { motion } from 'framer-motion'

/**
 * Splits text into words, each word slides up from below with stagger.
 *
 * Props:
 *   text      – the string to animate
 *   className – class applied to the outer span wrapper
 *   delay     – initial delay in seconds (default 0)
 *   stagger   – per-word delay in seconds (default 0.055)
 *   duration  – per-word transition duration (default 0.55)
 *   once      – viewport trigger fires once (default true)
 */
export default function SplitText({
  text = '',
  className = '',
  delay = 0,
  stagger = 0.055,
  duration = 0.55,
  once = true,
}) {
  const words = text.split(' ')

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden"
          style={{ verticalAlign: 'bottom' }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: '105%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once }}
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
          {/* space after each word except last */}
          {i < words.length - 1 && '\u00a0'}
        </span>
      ))}
    </span>
  )
}
