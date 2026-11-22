const columns = [
  {
    title: 'Marketplace',
    links: [
      { label: 'Categories', href: '#categories' },
      { label: 'Products', href: '#products' },
      { label: 'Offers', href: '#products' },
      { label: 'Creators', href: '#creators' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Login', href: '#' },
      { label: 'Register', href: '#' },
      { label: 'My Account', href: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-night-900/60">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-glow to-cyan-neon text-night-950 font-display font-bold text-lg">
                M
              </span>
              <span className="font-display font-semibold text-lg text-white">
                Market<span className="text-gradient">Palce</span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              A premium marketplace connecting talented creators with people
              looking for exceptional ready-made websites.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="inline-block text-sm text-slate-400 transition-all duration-300 hover:text-cyan-300 hover:translate-x-1"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <span>&copy; {new Date().getFullYear()} MarketPalce. All rights reserved.</span>
          <span>Crafted with care for creators and buyers worldwide.</span>
        </div>
      </div>
    </footer>
  );
}
