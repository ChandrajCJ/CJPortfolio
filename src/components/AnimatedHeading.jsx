import { motion, useReducedMotion } from 'framer-motion'

/** Reveals a headline word by word. Screen readers still read one string. */
export default function AnimatedHeading({ text, as: Tag = 'h2', className = '', delay = 0 }) {
  const reduced = useReducedMotion()
  const MotionTag = motion[Tag] ?? motion.h2

  if (reduced) return <Tag className={className}>{text}</Tag>

  const words = text.split(' ')

  return (
    <MotionTag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ staggerChildren: 0.055, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true" className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%', opacity: 0 },
              show: { y: '0%', opacity: 1 },
            }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}
