import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useMouseParallax } from '../hooks/useMouseParallax';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const imageRef = useRef(null);
  useMouseParallax(imageRef, { strength: 12, ease: 0.1, enabled: true });

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[700px] w-full overflow-hidden bg-white"
      aria-labelledby="hero-heading"
    >
      {/* Decorative top glow for premium editorial feel */}
      <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] bg-royal/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Mountain photograph - right-anchored, blends into light left side */}
      <div className="absolute inset-0 z-0">
        <img
          ref={imageRef}
          src="/assets/machhapuchre.jpg"
          alt="Machapuchare mountain"
          className="w-full h-full object-cover"
          style={{
            objectPosition: '82% 0%',
            willChange: 'transform',
          }}
          loading="eager"
          decoding="async"
          aria-hidden="true"
          data-parallax
        />
        {/* Left-side blend gradient keeps text readable over the photo */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent z-10 pointer-events-none"
          style={{ maskImage: 'linear-gradient(to right, black 60%, transparent)' }}
        />
      </div>

      {/* Content column - left side */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-20 flex flex-col justify-center px-6 pt-24 pb-36 max-w-[640px] mx-auto lg:mx-0 lg:pl-0 lg:pr-14 lg:max-w-[700px]"
      >
        {/* Role badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 h-[38px] px-4 rounded-full bg-white/80 backdrop-blur-sm border border-navy/10 text-navy text-xs font-medium leading-none mb-10 lg:mb-14"
        >
          <span className="w-[8px] h-[8px] rounded-full bg-crimson" aria-hidden="true"></span>
          <span>Machine Learning Engineer &middot; Kathmandu, Nepal</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="font-serif text-[4rem] leading-[0.92] tracking-tight text-navy font-normal mb-5 lg:text-[5.5rem] lg:mb-7"
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
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-devanagari text-[20px] text-muted-blue tracking-[0.05em] mb-3 lg:text-[24px] lg:mb-4"
        >
          सिद्धान्त अधिकारी
        </motion.div>
        <div className="w-[48px] h-[1.5px] bg-crimson mb-10 lg:mb-14" />

        {/* Hero statement */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-[26px] leading-[1.25] text-navy font-semibold text-balance mb-8 lg:text-[32px] lg:mb-10 lg:leading-tight"
        >
          I build computer vision systems for flood and disaster resilience.
        </motion.h2>

        {/* Supporting statement */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-[17px] leading-relaxed text-muted-blue font-normal text-pretty mb-12 lg:mb-16 max-w-[520px]"
        >
          Turning research into real-world impact through machine learning, remote sensing and intelligent
          systems.
        </motion.p>

        {/* Button row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-5 mb-16 lg:mb-20"
        >
          <a
            href="#projects"
            onClick={() => {
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-pill-primary"
          >
            Explore My Work <ArrowRight size={16} strokeWidth={2} />
          </a>
          <a
            href="#about"
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-pill-secondary"
          >
            About Me
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col items-center gap-2.5 text-muted-blue text-[11px] font-medium uppercase tracking-widest"
        >
          <span>Scroll to explore</span>
          <div className="relative w-5 h-8 rounded-full border border-navy mb-[2px]">
            <div
              className="absolute left-1/2 top-[20%] w-[2.5px] h-[2.5px] bg-navy rounded-full -translate-x-1/2"
              style={({ custom }) => ({
                animation: `scrollDot 2s ease-in-out infinite`,
                animationDelay: custom,
              })}
              custom="0s"
            />
          </div>
          <div className="w-20 h-[1px] bg-navy/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
