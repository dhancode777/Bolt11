import { useEffect, useState } from 'react';
import { Search, Menu, X } from 'lucide-react';

const links = [
  { label: 'Categories', href: '#categories' },
  { label: 'Products', href: '#products' },
  { label: 'Offers', href: '#products' },
  { label: 'Creators', href: '#creators' },
  { label: 'How It Works', href: '#how-it-works' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-night-950/80 backdrop-blur-xl border-b border-white/[0.06] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-glow to-cyan-neon text-night-950 font-display font-bold text-lg group-hover:scale-105 transition-transform">
            M
            <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-glow to-cyan-neon opacity-50 blur-md -z-10 group-hover:opacity-80 transition-opacity" />
          </span>
          <span className="font-display font-semibold text-lg tracking-tight text-white">
            Market<span className="text-gradient">Palce</span>
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="relative text-sm text-slate-300 hover:text-white transition-colors after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-0 after:bg-gradient-to-r after:from-violet-glow after:to-cyan-neon after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <button
            aria-label="Search"
            className="h-10 w-10 flex items-center justify-center rounded-full glass text-slate-300 hover:text-white hover:border-violet-glow/40 transition-all"
          >
            <Search size={17} />
          </button>
          <a
            href="#"
            className="text-sm text-slate-300 hover:text-white px-3 py-2 transition-colors"
          >
            Login
          </a>
          <a
            href="#products"
            className="text-sm font-medium rounded-full bg-gradient-to-r from-violet-glow to-cyan-neon px-5 py-2.5 text-white shadow-[0_0_24px_rgba(139,92,246,0.4)] hover:shadow-[0_0_36px_rgba(139,92,246,0.6)] hover:scale-[1.03] transition-all"
          >
            Get Started
          </a>
        </div>

        <button
          className="lg:hidden text-slate-200"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden mx-4 mt-2 rounded-2xl glass-strong p-5 space-y-1">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-slate-200 hover:bg-white/5 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="flex gap-3 pt-3 border-t border-white/10">
            <a href="#" className="flex-1 text-center rounded-full border border-white/15 px-4 py-2.5 text-sm text-slate-200">
              Login
            </a>
            <a
              href="#products"
              onClick={() => setOpen(false)}
              className="flex-1 text-center rounded-full bg-gradient-to-r from-violet-glow to-cyan-neon px-4 py-2.5 text-sm font-medium text-white"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
