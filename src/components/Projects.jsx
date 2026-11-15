import { motion } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';
import { projects } from '../data/projects';

export default function Projects() {
  return (
    <section id="projects" className="relative pt-24 pb-32 lg:pt-32 lg:pb-40 bg-white">
      <div className="section-wrapper">
        <div className="text-center mb-16 lg:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-[2.25rem] leading-tight text-navy font-normal mb-6 lg:text-[3rem]"
          >
            Selected work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="body text-muted-blue font-normal max-w-[500px] mx-auto"
          >
            Open source projects spanning computer vision, remote sensing, and intelligent systems.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group relative p-8 rounded-2xl border border-navy/12 bg-white hover:border-navy/25 transition-colors duration-300"
            >
              <div className="mb-6">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-royal/10 text-royal text-xs font-medium mb-3">
                  {project.tagline}
                </span>
                <h3 className="font-serif text-xl leading-tight text-navy font-normal group-hover:text-royal transition-colors">
                  {project.title}
                </h3>
              </div>

              <p className="text-sm text-text-body font-normal leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded border border-navy/12 bg-white text-navy text-[11px] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-navy/12">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-navy font-medium text-sm transition-colors hover:text-royal"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  View on GitHub <Github size={16} strokeWidth={2} />
                </a>
                <a
                  href="#"
                  className="flex items-center gap-1 text-royal font-medium text-sm transition-colors hover:underline"
                  aria-label={`Read ${project.title} case study`}
                >
                  Case study <ArrowRight size={16} strokeWidth={2} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
