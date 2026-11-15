import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const links = [
  { id: 'home', label: 'Home', href: '#hero' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'research', label: 'Research', href: '#research' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -60% 0%', threshold: 0.1 },
    );

    links.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setOpen(false);
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/70 backdrop-blur-[16px] -webkit-backdrop-blur-[16px] border-b border-navy/12'
          : 'bg-transparent'
      }`}
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between px-6 py-4 lg:px-12 lg:h-[88px]">
        <a
          href="#hero"
          onClick={() => scrollTo('hero')}
          className="font-serif text-navy text-[32px] font-normal tracking-tight"
          aria-label="Siddhanta Adhikari, back to top"
        >
          SA
        </a>

        <div className="hidden lg:flex items-center gap-10">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.id);
              }}
              className={`text-navy font-medium text-sm transition-colors duration-200 ${
                active === link.id ? 'font-semibold' : ''
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          onClick={() => scrollTo('contact')}
          className="hidden lg:flex items-center gap-2 h-12 px-7 rounded-full border border-navy bg-transparent text-navy font-medium text-sm transition-all duration-200 hover:bg-white/90"
        >
          Let's Talk <ArrowRight size={14} strokeWidth={2} />
        </a>

        <button
          className="lg:hidden p-2 text-navy"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute inset-x-0 top-full bg-white/80 backdrop-blur-[20px] -webkit-backdrop-blur-[20px] border-b border-navy/12 z-50 flex flex-col"
          >
            <div className="px-6 py-6">
              <div className="flex items-center justify-between mb-8">
                <a
                  href="#hero"
                  onClick={() => scrollTo('hero')}
                  className="font-serif text-navy text-[24px] font-normal tracking-tight"
                >
                  SA
                </a>
                <a
                  href="#contact"
                  onClick={() => scrollTo('contact')}
                  className="h-11 px-6 rounded-full border border-navy text-navy font-medium text-xs transition-all hover:bg-white/90"
                >
                  Let's Talk →
                </a>
              </div>
              <nav className="space-y-1">
                {links.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => scrollTo(link.id)}
                    className={`block px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                      active === link.id
                        ? 'bg-navy/10 text-navy font-semibold'
                        : 'text-navy/70 hover:bg-navy/5'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
