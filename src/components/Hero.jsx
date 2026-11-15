import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  // Subtle parallax on the mountain image (disabled on touch via media query logic in CSS)
  useEffect(() => {
    const handleMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = ((mouse.x - cx) / cx) * -1;
  const dy = ((mouse.y - cy) / cy) * -0.5;

  const scrollY = useScroll();
  const navOpacity = useTransform(scrollY.scrollY, [0, 120], [1, 0]);

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[720px] w-full overflow-hidden bg-soft-white"
      aria-labelledby="hero-heading"
    >
      {/* Mountain photograph - right side, blending into light left side */}
      <div className="absolute inset-0 z-0">
        <img
          ref={imageRef}
          src="/assets/machhapuchre.jpg"
          alt="Machapuchare mountain"
          className="w-full h-full object-cover"
          style={{
            objectPosition: 'right 10% top',
            filter: 'grayscale(0%)',
            transform: `translate(${dx * 14}px, ${dy * 10}px)`,
          }}
          loading="eager"
          decoding="async"
          aria-hidden="true"
        />
        {/* Blend gradient: light on left for text, transparent on right for photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-soft-white via-soft-white/55 to-transparent z-10 pointer-events-none" />
        {/* Soft edge glow on the right side of the text zone */}
        <div
          className="absolute top-0 left-[40%] bottom-0 w-[120px] bg-gradient-to-l from-white/60 to-transparent z-15 pointer-events-none"
          style={{ filter: 'blur(40px)' }}
        />
      </div>

      {/* Content - left side, vertically centered */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-20 flex flex-col justify-center px-6 pt-20 pb-32 max-w-[560px] mx-auto lg:mx-0 lg:pl-0 lg:pr-12 lg:max-w-[600px]"
      >
        {/* Role badge */}
        <div className="role-pill mb-8 inline-flex items-center gap-2">
          <span className="role-dot" aria-hidden="true"></span>
          <span>Machine Learning Engineer &middot; Kathmandu, Nepal</span>
        </div>

        {/* Name */}
        <motion.h1
          id="hero-heading"
          className="font-serif text-[4rem] leading-[0.95] tracking-tight text-navy font-normal mb-4 lg:text-[5rem] lg:mb-6"
          style={{ transform: `translate(${dx * 6}px, ${dy * 4}px)` }}
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
        >
          Siddhanta
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal via-#3a72f0 to-#5b8def">
            Adhikari
          </span>
        </motion.h1>

        {/* Devanagari */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="font-devanagari text-2xl text-muted-blue tracking-wider mb-2 lg:text-[24px] lg:mb-3"
        >
          सिद्धान्त अधिकारी
        </motion.div>
        <div className="devanagari-underline mb-8 lg:mb-10" />

        {/* Hero statement */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="h2 text-navy font-semibold text-balance mb-8 lg:mb-10 leading-tight"
          style={{ transform: `translate(${dx * 4}px, ${dy * 3}px)` }}
        >
          I build computer vision systems for flood and disaster resilience.
        </motion.h2>

        {/* Supporting statement */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="body text-text-body font-normal text-pretty mb-10 lg:mb-12 leading-relaxed max-w-[500px]"
          style={{ transform: `translate(${dx * 3}px, ${dy * 2}px)` }}
        >
          Turning research into real-world impact through machine learning, remote sensing and intelligent
          systems.
        </motion.p>

        {/* Button row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mb-12 lg:mb-16"
          style={{ transform: `translate(${dx * 2}px, ${dy * 2}px)` }}
        >
          <a
            href="#projects"
            className="btn-pill-primary"
            onClick={() => {
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore My Work <ArrowRightIcon size={16} strokeWidth={2} />
          </a>
          <a
            href="#about"
            className="btn-pill-secondary"
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            About Me
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="flex flex-col items-center gap-2 text-muted-blue text-xs font-normal"
          style={{ transform: `translate(${dx * 2}px, ${dy * 2}px)` }}
        >
          <span>Scroll to explore</span>
          <div className="relative w-6 h-10 rounded-full border border-navy mb-1">
            <div
              className="absolute left-1/2 top-[25%] w-[3px] h-[3px] bg-navy rounded-full -translate-x-1/2"
              style={{ animation: 'scrollDot 2s ease-in-out infinite' }}
            />
          </div>
          <div className="w-24 h-[1px] bg-navy/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function ArrowRightIcon({ size = 16, strokeWidth = 2 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
