import { useEffect, useMemo, useState, useRef } from "react";
import { ArrowUpRight, ChevronDown, Circle, ExternalLink, Github, Mail, MapPin, MoveUpRight, Radio, Sparkles, Download } from "lucide-react";

/**
 * Signal Atlas direction: editorial brutalism + technical field notes.
 * This page uses graphite, warm ivory, signal orange, asymmetric composition,
 * index-rail navigation, and restrained scan-like motion.
 */

type Project = {
  number: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  featured?: boolean;
  evidence: string;
  image?: string;
};

const projects: Project[] = [
  { number: "01", title: "Aquila", description: "SAR flood detection pipeline leveraging deep satellite radar imagery for automated geospatial hazard tracking.", tags: ["Python", "Earth Engine", "PyTorch"], href: "https://github.com/SID4288", featured: true, evidence: "METHOD / SAR + DEEP SEGMENTATION", image: "/images/aquila.png" },
  { number: "02", title: "SFaceX", description: "Biometric face verification engine paired with continuous convolutional neural anti-spoofing protection filters.", tags: ["OpenCV", "TensorFlow", "C++"], href: "https://github.com/SID4288", evidence: "CONSTRAINT / ANTI-SPOOFING", image: "/images/sfacex.png" },
  { number: "03", title: "StyleMe", description: "Real-time modular body tracking runtime providing automatic virtual apparel sizing and framework configurations.", tags: ["MediaPipe", "Python", "React"], href: "https://github.com/DikshitBhatta/StyleMe", evidence: "INPUT / LIVE BODY LANDMARKS", image: "/images/styleme.png" },
  { number: "04", title: "CookeryKaa", description: "Full-stack culinary curation application serving optimized parameter matching across large recipe schemas.", tags: ["Django", "PostgreSQL", "JavaScript"], href: "https://github.com/DikshitBhatta/CookeryKaa-Project", evidence: "STACK / DJANGO + POSTGRESQL", image: "/images/cookerykaa.png" },
  { number: "05", title: "Cadence", description: "Developer operations metrics console tracking performance patterns, live container logs, and repository speeds.", tags: ["Jupyter", "Deep Learning", "Data"], href: "https://github.com/SID4288/Cadence", evidence: "SIGNAL / REPO PERFORMANCE",image: "/images/cadence.png"  },
  { number: "06", title: "Zero Trust Sandbox", description: "Isolated runtime micro-kernel cluster built to observe, profile, and safely isolate arbitrary script executions.", tags: ["Python", "Docker", "Linux"], href: "https://github.com/SID4288/zero-trust-agent-sandbox", evidence: "BOUNDARY / ISOLATED EXECUTION", image: "/images/zero-trust.png" },
  { number: "07", title: "Aanubadh", description: "Translation tool built for the KU Information and Language Processing Research Lab Hackathon.", tags: ["JavaScript", "Rust", "Docker"], href: "https://github.com/BipulLamsal/Aanubadh", evidence: "LAB / LANGUAGE ACCESS", image: "/images/aanubadh.png" },
  { number: "08", title: "Flow", description: "Grid-based crowd simulation modelling pedestrians moving through obstacles with A* pathfinding.", tags: ["Python", "PyGame", "Algorithms"], href: "https://github.com/CodeAauDeshBachau/AI-Mini-Project", evidence: "MODEL / A* PATHFINDING", image: "/images/flow.png" },
  { number: "09", title: "MemoryPalace", description: "Immersive 3D spatial learning application that transforms study materials into an interactive virtual memory palace.", tags: ["JavaScript", "Three.js", "CSS"], href: "https://github.com/aShishir0/MemoryPalace", evidence: "SPACE / 3D MEMORY SYSTEM", image: "/images/memory-palace.png" },
];

const research = [
  { status: "ACTIVE RESEARCH • 2026", title: "Spatio-Temporal Flood Prediction", text: "Investigating graph neural sequence mechanisms to map historical geospatial flood extents against live cloud-penetrating arrays dynamically." },
  { status: "UNDER REVIEW • 2026", title: "Deep Learning Based Flood Detection Using Sentinel-1 SAR Imagery", text: "Developing deep radar segmentation pipelines engineered to identify precise water-body expansions under heavy cloud covers." },
];

const skills = ["Python", "PyTorch", "TensorFlow", "OpenCV", "Django", "React", "PostgreSQL", "Docker", "Google Earth Engine", "Git", "C++"];

function SectionLabel({ number, eyebrow, title }: { number: string; eyebrow: string; title: string }) {
  return (
    <div className="section-heading observe-me">
      <div className="section-heading__meta">
        <span className="mask-container block">
          <span className="mask-content block">{number}</span>
        </span>
        <span className="mask-container block">
          <span className="mask-content block" style={{ animationDelay: '0.1s' }}>{eyebrow}</span>
        </span>
      </div>
      <h2>
        <span className="mask-container block">
          <span className="mask-content block" style={{ animationDelay: '0.2s' }}>{title}</span>
        </span>
      </h2>
      <div className="heading-rule reveal-up" style={{ animationDelay: '0.3s' }} />
    </div>
  );
}

const certificates = [
  { year: "2024", title: "CS50's Introduction to AI with Python", issuer: "Harvard University", note: "", href: "https://certificates.cs50.io/0276cbf6-d6a4-4f6b-8c26-4663b2582987.pdf" },
  { year: "2024", title: "AWS AI Practitioner Challenge", issuer: "Udacity", note: "", href: "https://www.udacity.com/certificate/e/0ccf2aae-39ab-11f1-ad7c-6bb623888a3e" },
  { year: "2023", title: "Intro to Machine Learning", issuer: "Kaggle", note: "", href: "https://www.kaggle.com/learn/certification/siddhanta98/intro-to-machine-learning" },
  { year: "2023", title: "Pandas", issuer: "Kaggle", note: "", href: "https://www.kaggle.com/learn/certification/siddhanta98/pandas" },
  { year: "2023", title: "Scientific Computing with Python", issuer: "freeCodeCamp", note: "", href: "https://www.freecodecamp.org/certification/fcc-656888bb-fcf0-44ef-9340-bcee6d3434c4/python-v9" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("top");
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const navItems = useMemo(() => [
    ["top", "Overview"], ["projects", "Selected work"], ["research", "Research"], ["certificates", "Certificates"], ["spotlight", "Profile"], ["connect", "Connect"],
  ], []);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
      
      if (previewRef.current) {
        previewRef.current.style.left = event.clientX + 'px';
        previewRef.current.style.top = event.clientY + 'px';
      }
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: "-30% 0px -55% 0px", threshold: 0 });
    document.querySelectorAll("section[id], main[id]").forEach((section) => observer.observe(section));

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0 });
    document.querySelectorAll(".observe-me, .hero__copy, .hero__instrument").forEach((el) => revealObserver.observe(el));

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      observer.disconnect();
      revealObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const headerOffset = window.innerWidth <= 760 ? 74 : 88;
    const start = window.scrollY;
    const destination = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset);
    const distance = destination - start;
    const duration = Math.min(1550, Math.max(850, Math.abs(distance) * 0.72));
    let startTime = 0;
    let frame = 0;
    const easeInOut = (value: number) => value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min(1, (time - startTime) / duration);
      window.scrollTo(0, start + distance * easeInOut(progress));
      if (progress < 1) frame = window.requestAnimationFrame(animate);
    };
    window.cancelAnimationFrame(frame);
    window.requestAnimationFrame(animate);
    setActiveSection(id);
    setMenuOpen(false);
  };

  return (
    <div className="site-shell">
      <div className="interactive-field" aria-hidden="true"><span className="field-node field-node--one" /><span className="field-node field-node--two" /><span className="field-node field-node--three" /></div>
      <div className="grain" aria-hidden="true" />
      <div className="ambient ambient--one" aria-hidden="true" />
      <div className="ambient ambient--two" aria-hidden="true" />

      <header className="topbar">
        <button className="brand-lockup" onClick={() => scrollTo("top")} aria-label="Back to top">
          <img src="/images/logo.png" alt="" />
          <span>/sid/</span>
        </button>
        <div className="topbar__status"><span className="status-dot" /> Available for thoughtful builds</div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation"><span /><span /></button>
        <nav className={menuOpen ? "topnav topnav--open" : "topnav"} aria-label="Primary navigation">
          {navItems.map(([id, label]) => <button key={id} className={activeSection === id ? "active" : ""} onClick={() => scrollTo(id)}>{label}</button>)}
          <a href="https://github.com/SID4288" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a>
        </nav>
      </header>

      <aside className="index-rail" aria-label="Page index">
        <span className="rail-mark">S_</span>
        <div className="rail-line"><span style={{ height: `${Math.max(5, progress * 100)}%` }} /></div>
        <span className="rail-caption">SCROLL / INDEX</span>
      </aside>

      <main id="top">
        <section className="hero container-wide">
          <div className="hero__copy">
            <div className="kicker">
              <span className="mask-container block">
                <span className="mask-content flex items-center gap-[0.55rem]" style={{ animationDelay: '0s' }}>
                  <Radio size={14} /> COMPUTER ENGINEER · KATHMANDU, NEPAL
                </span>
              </span>
            </div>
            <p className="hero__overline">
              <span className="mask-container block">
                <span className="mask-content block" style={{ animationDelay: '0.1s' }}>
                  A field report on building useful intelligence.
                </span>
              </span>
            </p>
            <h1 className="hero__name">
              <span className="mask-container block">
                <span className="mask-content block" style={{ animationDelay: '0.2s' }}>
                  <span>Siddhanta</span>
                </span>
              </span>
              <span className="mask-container block">
                <span className="mask-content block" style={{ animationDelay: '0.3s' }}>
                  <em>Adhikari</em>
                </span>
              </span>
            </h1>
            <div className="hero__name-meta">
              <span className="mask-container block">
                <span className="mask-content flex items-center gap-[0.7rem]" style={{ animationDelay: '0.4s' }}>
                  <span>IDENTITY / 001</span><i /> computer engineer / researcher
                </span>
              </span>
            </div>
            <h2 className="hero__slogan">
              <span className="mask-container block">
                <span className="mask-content block" style={{ animationDelay: '0.5s' }}>
                  Systems <em>with a point</em> of view.
                </span>
              </span>
            </h2>
            <p className="hero__intro">
              <span className="mask-container block">
                <span className="mask-content block whitespace-normal" style={{ animationDelay: '0.6s' }}>
                  I’m Siddhanta Adhikari — a final-year computer engineering student building machine learning and full-stack systems for messy, real-world problems.
                </span>
              </span>
            </p>
            <div className="hero__actions mt-[2.25rem] observe-me reveal-up" style={{ animationDelay: '0.7s' }}>
              <button className="button button--orange" onClick={() => scrollTo("projects")}>Inspect the work <MoveUpRight size={16} /></button>
              <a className="button button--quiet" href="mailto:siddhanta2adhikari@gmail.com"><Mail size={15} /> Ping me</a>
              <a className="button button--quiet" href="/Siddhanta_Adhikari_CV.pdf" download="Siddhanta_Adhikari_CV.pdf"><Download size={15} /> Resume</a>
            </div>
          </div>
          <div className="hero__instrument reveal-up reveal-up--delay">
            <div className="hero__instrument-stack">
              <div className="orbital orbital--one" aria-hidden="true" />
              <div className="orbital orbital--two" aria-hidden="true" />
              <div className="floating-orb" aria-hidden="true"><span>SID / 01</span><strong>↗</strong></div>
              <div className="instrument-card">
                <div className="instrument-card__top"><span>FIELD NOTE / 001</span><span>2026</span></div>
                <div className="instrument-art"><img src="/images/landingpage.webp" alt="Abstract contour map and signal traces" /><div className="scan-line" /></div>
                <div className="instrument-card__bottom"><span>38° 12′ N / 85° 19′ E</span><span>online</span></div>
              </div>
              <div className="hero__aside-note"><span>01</span><p>Translating complex inputs into systems people can actually use.</p></div>
            </div>
          </div>
          <div className="hero__footnote"><span>↓</span> Keep scrolling to open the archive</div>
        </section>

        <section className="ticker" aria-label="Technical skills">
          <div className="ticker__viewport"><div className="ticker__track">{[...skills, ...skills].map((skill, index) => <span className="skill-chip" key={`${skill}-${index}`}><b>{String(index % skills.length + 1).padStart(2, "0")}</b>{skill}<Circle size={6} fill="currentColor" /></span>)}</div><div className="ticker__scan" aria-hidden="true" /></div>
        </section>

        <section id="projects" className="content-section container-narrow">
          <SectionLabel number="01" eyebrow="ARCHIVE / BUILDS" title="Selected work" />
          <div className="section-intro observe-me reveal-up"><p>Projects that sit at the intersection of perception, computation, and a strong bias toward making things tangible.</p><a href="https://github.com/SID4288?tab=repositories" target="_blank" rel="noreferrer">View repository index <ArrowUpRight size={15} /></a></div>
          <div className="projects-grid">
            {projects.map((project, i) => (
              <a 
                data-cursor="view" 
                className={`observe-me reveal-up ${project.featured ? "project-card project-card--featured" : "project-card"}`} 
                style={{ animationDelay: `${i * 0.1}s` }} 
                href={project.href} 
                target="_blank" 
                rel="noreferrer" 
                key={project.title}
                onMouseEnter={() => {
                  if (project.image) setHoveredImage(project.image);
                }}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <span className="project-card__number">{project.number}</span>
                <span className="project-card__stamp">SIGNAL RECORD</span>
                <div className="project-card__icon"><Github size={17} /></div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span className="project-card__evidence">{project.evidence}</span>
                <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <span className="card-arrow"><ExternalLink size={15} /></span>
              </a>
            ))}
            <a data-cursor="view" className="project-card project-card--graveyard observe-me reveal-up" style={{ animationDelay: `${projects.length * 0.1}s` }} href="https://github.com/SID4288?tab=repositories" target="_blank" rel="noreferrer"><span className="project-card__number">++</span><span className="project-card__stamp">UNRESOLVED</span><div className="project-card__icon">✳</div><h3>~/the-graveyard</h3><p>Where abandoned prototypes, multi-threading benchmarks, and structural refactors go to rest.</p><div className="tag-row"><span>Git stash</span><span>Untracked</span><span>Error: 404</span></div></a>
          </div>
        </section>

        <section id="research" className="research-section">
          <div className="research-deco-circle" style={{ width: '400px', height: '400px', top: '-100px', right: '-150px' }} aria-hidden="true" />
          <div className="research-deco-circle" style={{ width: '600px', height: '600px', bottom: '-200px', left: '-200px', opacity: 0.5 }} aria-hidden="true" />
          <div className="research-section__image observe-me reveal-up"><img src="/images/research.webp" alt="Orbital scan inspired research diagram" /><div className="research-section__image-label">OBSERVATION / 02</div></div>
          <div className="container-narrow research-section__content">
            <SectionLabel number="02" eyebrow="FIELD NOTES / INQUIRY" title="Research" />
            <div className="research-list">
              {research.map((item, i) => (
                <article className="research-item observe-me reveal-up" style={{ animationDelay: `${i * 0.1}s` }} key={item.title}>
                  <div className="research-deco-line" aria-hidden="true" />
                  <span>{item.status}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="certificates" className="certificate-section">
          <div className="container-narrow">
            <SectionLabel number="03" eyebrow="ARCHIVE / CREDENTIALS" title="Certificates" />
            <div className="certificate-grid">{certificates.map((certificate, i) => <a href={certificate.href} target="_blank" rel="noreferrer" className="certificate-card observe-me reveal-up" style={{ animationDelay: `${i * 0.1}s`, display: 'grid' }} key={certificate.title}><span className="certificate-year">{certificate.year}</span><div><h3>{certificate.title}</h3><p>{certificate.issuer}</p>{certificate.note && <small>{certificate.note}</small>}</div><ArrowUpRight size={17} /></a>)}</div>
          </div>
        </section>

        <section id="spotlight" className="content-section container-narrow">
          <SectionLabel number="04" eyebrow="PROFILE / CONTEXT" title="The operator" />
          <div className="spotlight-grid"><div className="spotlight-statement observe-me reveal-up"><Sparkles size={19} /><p>“The interesting part isn’t making a model work once. It’s designing the surrounding system so that it keeps making sense.”</p></div><div className="spotlight-copy observe-me reveal-up" style={{ animationDelay: '0.2s' }}><p>My work moves between research and implementation: from geospatial forecasting and computer vision to secure authentication and developer tooling. I care about the connective tissue — the interfaces, data flows, and decisions that turn a technical idea into a dependable experience.</p><div className="profile-facts"><div><span>Based in</span><strong><MapPin size={14} /> Kathmandu, Nepal</strong></div><div><span>Studying</span><strong>Computer Engineering</strong></div><div><span>Now exploring</span><strong>Graph neural systems</strong></div></div></div></div>
        </section>

        <section id="connect" className="connect-section">
          <div className="connect-section__inner container-narrow">
            <div className="observe-me reveal-up">
              <span className="kicker">05 / OPEN CHANNEL</span>
              <h2>Have a problem<br /><em>worth solving?</em></h2>
            </div>
            <div className="connect-section__copy observe-me reveal-up" style={{ animationDelay: '0.2s' }}>
              <p>Whether you’re working on a research question, an intelligent product, or a system that needs a second pair of eyes — I’d like to hear about it.</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                <a className="button button--orange" href="mailto:siddhanta2adhikari@gmail.com">Send an email <ArrowUpRight size={16} /></a>
                <a className="button button--quiet" style={{ border: '1px solid var(--hairline)' }} href="https://linkedin.com/in/siddhanta-adhikari-773931182/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={16} /></a>
                <a className="button button--quiet" style={{ border: '1px solid var(--hairline)' }} href="https://github.com/SID4288" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16} /></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer container-wide"><span>© 2026 Siddhanta Adhikari</span><span>Built between research notes and late-night commits.</span><a href="#top" onClick={(e) => { e.preventDefault(); scrollTo("top"); }}>Back to top ↑</a></footer>
      
      <div 
        ref={previewRef} 
        className={`project-preview ${hoveredImage ? 'active' : ''}`}
      >
        {hoveredImage && <img src={hoveredImage} alt="Project Preview" />}
      </div>
    </div>
  );
}
