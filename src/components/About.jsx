import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="relative pt-24 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
      <div className="section-wrapper">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: intro text */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="font-serif text-[2.25rem] leading-tight text-navy font-normal mb-4 lg:text-[3rem]">
                About me
              </h2>
              <p className="body text-text-body font-normal leading-relaxed mb-6 max-w-none">
                Computer Engineering graduate (final semester) at Kathmandu University, with a focus on
                machine learning, deep learning, computer vision, and intelligent systems. I turn satellite
                and sensor data into early-warning tools for flood and disaster resilience, bridging research
                and real-world deployment.
              </p>
              <p className="body text-text-body font-normal leading-relaxed mb-6 max-w-none">
                My work spans radar-based flood segmentation, facial authentication with anti-spoofing, and
                real-time body tracking — published as open source and presented in peer-reviewed research.
              </p>

              <div className="grid grid-cols-2 gap-6 lg:gap-8 mt-8">
                <div className="p-6 rounded-xl border border-navy/12 bg-white/50">
                  <h3 className="text-sm font-semibold text-navy mb-2">Education</h3>
                  <p className="text-sm text-muted-blue leading-relaxed">
                    Kathmandu University — Computer Engineering (final semester)
                  </p>
                </div>
                <div className="p-6 rounded-xl border border-navy/12 bg-white/50">
                  <h3 className="text-sm font-semibold text-navy mb-2">Research interests</h3>
                  <p className="text-sm text-muted-blue leading-relaxed">
                    Computer vision, remote sensing, deep learning, disaster resilience
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mt-12 flex flex-wrap gap-4"
            >
              <a
                href="https://github.com/SID4288"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-xl border border-navy/12 bg-white/80 text-navy font-medium text-sm transition-all hover:bg-white"
                aria-label="GitHub"
              >
                <Github size={18} strokeWidth={2} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/siddhanta-adhikari-773931182/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-xl border border-navy/12 bg-white/80 text-navy font-medium text-sm transition-all hover:bg-white"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} strokeWidth={2} /> LinkedIn
              </a>
            </motion.div>
          </div>

          {/* Right: directional statement */}
          <div className="lg:col-span-5 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="p-8 rounded-2xl border border-navy/12 bg-soft-white"
            >
              <h3 className="font-serif text-xl leading-tight text-navy font-normal mb-4">
                Technical direction
              </h3>
              <p className="text-sm text-muted-blue leading-relaxed mb-6">
                Building computer vision systems that move from satellite imagery to early-warning
                deployment — research that ships.
              </p>
              <ul className="space-y-3 text-sm text-text-body">
                <li className="flex items-start gap-2">
                  <span className="text-royal mt-0.5">▹</span>
                  Radar &amp; SAR segmentation
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-royal mt-0.5">▹</span>
                  Facial authentication &amp; anti-spoofing
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-royal mt-0.5">▹</span>
                  Real-time body tracking
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-royal mt-0.5">▹</span>
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
