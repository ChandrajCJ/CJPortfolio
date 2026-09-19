import { lazy, Suspense, useRef } from 'react'
import { FiArrowDown, FiDownload } from 'react-icons/fi'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { profile } from '../data/profile'
import SocialLinks from '../components/SocialLinks'
import Magnetic from '../components/Magnetic'
import Hero3DFallback from '../components/three/Hero3DFallback'

// three + drei is ~160KB gzip: kept out of the initial bundle entirely.
const Hero3D = lazy(() => import('../components/three/Hero3D'))

export default function Hero() {
  const reduced = useReducedMotion()
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Hero recedes as the next section rises over it.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, 90])
  const blur = useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(7px)'])

  const scrollStyle = reduced ? undefined : { scale, opacity, y, filter: blur }

  const enter = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      }

  return (
    <section id="home" ref={ref} className="relative overflow-hidden px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-gradFrom/20 to-gradTo/20 blur-3xl"
      />

      <motion.div style={scrollStyle} className="relative mx-auto grid max-w-content items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <motion.div {...enter}>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1 text-xs font-medium text-muted backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {profile.role} at {profile.company}
          </p>

          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl">
            <span className="gradient-text">Hello, I&apos;m {profile.shortName}</span>
          </h1>

          <p className="mt-3 text-2xl font-semibold text-fg md:text-4xl" aria-label={profile.role}>
            {reduced ? (
              profile.roles[0]
            ) : (
              <TypeAnimation
                sequence={profile.roles.flatMap((r) => [r, 1800])}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                cursor
              />
            )}
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">{profile.tagline}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href={profile.cv}
                download
                className="gradient-bg inline-flex h-12 items-center gap-2 rounded-full px-7 font-medium text-white shadow-lg shadow-gradTo/20 transition-opacity hover:opacity-90"
              >
                Download CV <FiDownload aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-line bg-surface px-7 font-medium text-fg transition-colors hover:bg-elevated"
              >
                Get in touch
              </a>
            </Magnetic>
          </div>

          <SocialLinks className="mt-9" size="lg" />
        </motion.div>

        <motion.div
          {...(reduced ? {} : { ...enter, transition: { ...enter.transition, delay: 0.15 } })}
          className="relative mx-auto w-full max-w-md md:max-w-none"
        >
          <Suspense fallback={<Hero3DFallback />}>
            <Hero3D />
          </Suspense>
        </motion.div>
      </motion.div>

      <a
        href="#about"
        className="relative mx-auto mt-14 flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
      >
        <FiArrowDown aria-hidden="true" className="motion-safe:animate-bounce" />
        Scroll to explore
      </a>
    </section>
  )
}
