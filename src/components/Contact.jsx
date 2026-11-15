import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';

// NOTE: Configure your form endpoint (e.g., Formspree, Netlify Forms, or your own API).
const FORM_ENDPOINT = 'https://formspree.io/f/{{your-form-id}}'; // placeholder

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Name is required.';
    if (!formData.email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = 'Enter a valid email address.';
    }
    if (!formData.message.trim()) e.message = 'Message is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setStatus(null);
    try {
      // TODO: Replace FORM_ENDPOINT with your real form handler.
      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative pt-24 pb-32 lg:pt-32 lg:pb-40 bg-white">
      <div className="section-wrapper">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: intro + contact links */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <h2 className="font-serif text-[2.25rem] leading-tight text-navy font-normal lg:text-[3rem]">
                Get in touch
              </h2>
              <p className="body text-text-body font-normal leading-relaxed">
                Open to conversation on research and engineering opportunities. Reach out by email or
                connect below.
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:siddhanta2adhikari@gmail.com"
                  className="flex items-center gap-3 text-navy font-medium text-sm hover:text-royal transition-colors"
                >
                  <Mail size={20} strokeWidth={2} />
                  <span>siddhanta2adhikari@gmail.com</span>
                </a>
                <a
                  href="https://github.com/SID4288"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-navy font-medium text-sm hover:text-royal transition-colors"
                >
                  <Github size={20} strokeWidth={2} />
                  <span>github.com/SID4288</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/siddhanta-adhikari-773931182/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-navy font-medium text-sm hover:text-royal transition-colors"
                >
                  <Linkedin size={20} strokeWidth={2} />
                  <span>linkedin.com/in/siddhanta-adhikari-773931182</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl border border-navy/12 bg-white"
            >
              {status === 'success' ? (
                <div className="text-center py-10">
                  <div className="w-10 h-10 rounded-full bg-royal/10 text-royal flex items-center justify-center mx-auto mb-4">
                    <Send size={20} strokeWidth={2} />
                  </div>
                  <h3 className="font-semibold text-navy mb-2">Message sent.</h3>
                  <p className="text-sm text-muted-blue">Thank you — I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-navy">Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 rounded border ${errors.name ? 'border-red-500' : 'border-navy/12'} focus:border-royal focus:ring-1 focus:ring-royal text-sm text-navy`}
                        placeholder="Your name"
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-600">{errors.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-navy">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded border ${errors.email ? 'border-red-500' : 'border-navy/12'} focus:border-royal focus:ring-1 focus:ring-royal text-sm text-navy`}
                        placeholder="you@example.com"
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-navy">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className={`w-full px-4 py-3 rounded border ${errors.message ? 'border-red-500' : 'border-navy/12'} focus:border-royal focus:ring-1 focus:ring-royal text-sm text-navy`}
                      placeholder="What would you like to discuss?"
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && <p className="text-xs text-red-600">{errors.message}</p>}
                  </div>
                  {status === 'error' && (
                    <p className="text-xs text-red-600">
                      Something went wrong. Please try emailing directly.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-pill-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Sending...' : 'Send message'}
                  </button>
                  <p className="text-xs text-muted-blue text-center">
                    NOTE: Configure FORM_ENDPOINT in src/components/Contact.jsx to enable submissions.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
