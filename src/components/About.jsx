import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
      {/* Top decorative element */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-navy/10" />

      <div className="section-wrapper">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left column: intro + details */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8 max-w-none"
            >
              <div className="section-head">
                <h2 className="section-title">About me</h2>
              </div>

              <p className="text-[17px] leading-relaxed text-text-body font-normal max-w-none">
                Computer Engineering graduate at Kathmandu University, focused on machine learning,
                deep learning, computer vision, and intelligent systems. I turn satellite and sensor
                data into early-warning tools for flood and disaster resilience — bridging research
                and real-world deployment.
              </p>

              <p className="text-[17px] leading-relaxed text-text-body font-normal max-w-none">
                My work spans radar-based flood segmentation, facial authentication with anti-spoofing,
                and real-time body tracking — published as open source and presented in peer-reviewed
                research.
              </p>

              <div className="grid grid-cols-2 gap-6 lg:gap-8 mt-4">
                <div className="p-6 rounded-2xl border border-navy/12 bg-white/50">
                  <h3 className="text-sm font-semibold text-navy tracking-tight mb-2">Education</h3>
                  <p className="text-sm text-muted-blue leading-relaxed">
                    Kathmandu University — Computer Engineering
                  </p>
                </div>
                <div className="p-6 rounded-2xl border border-navy/12 bg-white/50">
                  <h3 className="text-sm font-semibold text-navy tracking-tight mb-2">Research interests</h3>
                  <p className="text-sm text-muted-blue leading-relaxed">
                    Computer vision · Remote sensing · Deep learning · Disaster resilience
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mt-12 flex flex-wrap gap-4"
            >
              <a
                href="https://github.com/SID4288"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl border border-navy/12 bg-white/90 text-navy font-medium text-sm transition-all hover:bg-white hover:shadow-sm"
                aria-label="GitHub"
              >
                <Github size={18} strokeWidth={2} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/siddhanta-adhikari-773931182/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl border border-navy/12 bg-white/90 text-navy font-medium text-sm transition-all hover:bg-white hover:shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} strokeWidth={2} /> LinkedIn
              </a>
            </motion.div>
          </div>

          {/* Right column: directional statement */}
          <div className="lg:col-span-5 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="p-8 rounded-2xl border border-navy/12 bg-soft-white"
            >
              <h3 className="font-serif text-xl leading-tight text-navy font-normal mb-5">
                Technical direction
              </h3>
              <p className="text-sm text-muted-blue leading-relaxed mb-8">
                Building computer vision systems that move from satellite imagery to early-warning
                deployment — research that ships.
              </p>
              <ul className="space-y-3.5 text-sm text-text-body">
                <li className="flex items-start gap-2.5">
                  <span className="text-royal mt-0.5 shrink-0">▹</span>
                  Radar &amp; SAR segmentation
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-royal mt-0.5 shrink-0">▹</span>
                  Facial authentication &amp; anti-spoofing
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-royal mt-0.5 shrink-0">▹</span>
                  Real-time body tracking
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-royal mt-0.5 shrink-0">▹</span>
                  Flood prediction &amp; resilience
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
