import { motion } from 'framer-motion';
import { skills } from '../data/skills';

export default function Skills() {
  return (
    <section id="skills" className="relative pt-24 pb-32 lg:pt-32 lg:pb-40 bg-white">
      <div className="section-wrapper">
        <div className="text-center mb-16 lg:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-[2.25rem] leading-tight text-navy font-normal mb-6 lg:text-[3rem]"
          >
            Skills
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skills.map((category) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-2xl border border-navy/12 bg-white"
            >
              <h3 className="text-sm font-semibold text-navy tracking-wider uppercase mb-4">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded border border-navy/12 bg-white text-navy text-sm font-medium transition-colors hover:bg-navy/5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
