import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const DOI = '10.2166/hydro.2026.185';
const DOI_URL = `https://doi.org/${DOI}`;

export default function Research() {
  return (
    <section id="research" className="relative pt-24 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
      <div className="section-wrapper">
        <div className="text-center mb-16 lg:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-[2.25rem] leading-tight text-navy font-normal mb-6 lg:text-[3rem]"
          >
            Research
          </motion.h2>
        </div>

        <div className="max-w-[700px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-2xl border border-navy/12 bg-white"
          >
            <div className="mb-4">
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-light-blue text-navy text-xs font-medium">
                Published · 2026
              </span>
            </div>
            <h3 className="font-serif text-2xl leading-tight text-navy font-normal mb-4 lg:text-[1.75rem]">
              Global flood extent mapping from Sentinel-1 SAR imagery using a UNet++ deep learning
              framework with permanent-water-augmented input: evaluation across geographically diverse
              flood events.
            </h3>
            <p className="body text-text-body font-normal leading-relaxed mb-6">
              This research presents a UNet++ deep learning framework for mapping flood extents from
              Sentinel-1 SAR satellite imagery, with permanent-water-augmented input evaluated across
              geographically diverse flood events.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <span className="shrink-0 text-sm font-semibold text-navy mt-0.5">DOI</span>
                <p className="text-sm text-muted-blue font-normal">{DOI}</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="shrink-0 text-sm font-semibold text-navy mt-0.5">Contribution</span>
                <p className="text-sm text-muted-blue font-normal">
                  Model design, UNet++ implementation, SAR preprocessing, and cross-region evaluation.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="shrink-0 text-sm font-semibold text-navy mt-0.5">Methodology</span>
                <p className="text-sm text-muted-blue font-normal">
                  Deep radar segmentation with permanent-water augmentation; training and validation
                  across geographically diverse flood events.
                </p>
              </div>
            </div>

            <a
              href={DOI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-royal font-semibold text-sm transition-colors hover:underline"
              aria-label="Open publication via DOI"
            >
              Open publication <ExternalLink size={16} strokeWidth={2} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
