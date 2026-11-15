export default function Footer() {
  return (
    <footer className="border-t border-navy/12 bg-white py-8">
      <div className="section-wrapper flex flex-col items-center justify-between gap-4 lg:flex-row lg:items-center">
        <p className="text-xs text-muted-blue font-normal">
          © {new Date().getFullYear()} Siddhanta Adhikari
        </p>
        <div className="flex items-center gap-6 text-xs text-muted-blue font-normal">
          <a
            href="#hero"
            className="hover:text-navy transition-colors"
            onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Back to top
          </a>
          <a href="mailto:siddhanta2adhikari@gmail.com" className="hover:text-navy transition-colors">
            siddhanta2adhikari@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
