import { motion } from 'framer-motion';

const timeline = [
  {
    // NOTE: Replace with real experience. Do not fabricate employers, positions, or dates.
    role: '{{role / position}}',
    org: '{{organization}}',
    period: '{{period}}',
    description:
      'Brief description of responsibilities and achievements. Replace with real experience.',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative pt-24 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
      <div className="section-wrapper">
        <div className="text-center mb-16 lg:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-[2.25rem] leading-tight text-navy font-normal mb-6 lg:text-[3rem]"
          >
            Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="body text-muted-blue font-normal max-w-[500px] mx-auto"
          >
            Internships, research, and professional experience. Update this section as your career
            progresses.
          </motion.p>
        </div>

        <div className="relative max-w-[620px] mx-auto">
          {/* Timeline line */}
          <div className="absolute left-[30px] top-0 bottom-0 w-[1px] bg-navy/20" />

          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative mb-14 pl-[56px] last:mb-0"
            >
              {/* Dot */}
              <div className="absolute left-[26px] top-2 w-4 h-4 rounded-full bg-navy border-2 border-white z-10" />

              <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-2">
                <span className="text-xs font-semibold text-royal uppercase tracking-wider md:w-[120px]">
                  {item.period}
                </span>
                <h4 className="font-serif text-lg leading-tight text-navy font-normal">
                  {item.role}
                </h4>
                <span className="text-xs font-medium text-muted-blue">{item.org}</span>
              </div>
              <p className="text-sm text-muted-blue font-normal leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-muted-blue font-normal italic"
          >
            Section awaiting real experience details — configure in src/components/Experience.jsx.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
