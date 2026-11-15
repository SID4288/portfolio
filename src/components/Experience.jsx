import { motion } from 'framer-motion';

const timeline = [
  {
    role: '{{role / position}}',
    org: '{{organization}}',
    period: '{{period}}',
    description:
      'Brief description of responsibilities and achievements. Replace with real experience.',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
      <div className="section-wrapper">
        <div className="section-head">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-title"
          >
            Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[16px] text-muted-blue font-normal max-w-[520px] mx-auto"
          >
            Internships, research, and professional experience. Update this section as your career
            progresses.
          </motion.p>
        </div>

        <div className="relative max-w-[640px] mx-auto">
          <div className="absolute left-[30px] top-0 bottom-0 w-[1px] bg-navy/10" />

          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative mb-16 pl-[56px] last:mb-0"
            >
              <div className="absolute left-[27px] top-1.5 w-3 h-3 rounded-full bg-navy border border-white z-10" />

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

        <div className="mt-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
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
