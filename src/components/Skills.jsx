import { motion } from 'framer-motion';
import { skills } from '../data/skills';

export default function Skills() {
  return (
    <section id="skills" className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 bg-white">
      <div className="section-wrapper">
        <div className="section-head">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-title"
          >
            Skills
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skills.map((category) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-2xl border border-navy/12 bg-white"
            >
              <h3 className="text-xs font-semibold text-navy tracking-widest uppercase mb-5">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <span key={skill} className="skill-chip">
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
