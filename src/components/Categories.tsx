import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Briefcase, ShoppingBag, Server, Rocket, Palette, ArrowUpRight } from 'lucide-react';
import type { Category } from '../lib/supabase';

const icons: Record<string, typeof Briefcase> = {
  briefcase: Briefcase,
  'shopping-bag': ShoppingBag,
  server: Server,
  rocket: Rocket,
  palette: Palette,
};

export function Categories({ categories }: { categories: Category[] }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.from('.cat-head', {
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        y: 36, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
      });
      gsap.from('.cat-card', {
        scrollTrigger: { trigger: '.cat-grid', start: 'top 80%' },
        y: 48, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="categories" className="relative py-24 sm:py-32">
      <div className="absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-violet-glow/10 blur-[140px] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="cat-head text-xs font-medium uppercase tracking-[0.25em] text-cyan-400">
          Categories
        </div>
        <h2 className="cat-head mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white">
          Explore the <span className="text-gradient">Digital Universe</span>
        </h2>
        <p className="cat-head mt-4 max-w-md text-slate-400">
          Find the perfect digital foundation for your next project.
        </p>

        <div className="cat-grid mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => {
            const Icon = icons[cat.icon ?? ''] ?? Briefcase;
            return (
              <a
                key={cat.id}
                href="#products"
                className={`cat-card animated-border group rounded-2xl bg-ink-800/60 border border-white/[0.06] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-violet-glow/30 ${
                  i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="rounded-xl bg-ink-900/80 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-glow/25 to-cyan-neon/25 text-violet-300 group-hover:text-cyan-300 group-hover:scale-110 transition-all duration-500">
                    <Icon size={22} strokeWidth={1.6} />
                  </div>
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold text-white tracking-tight">
                  {cat.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400 min-h-[2.5rem]">
                  {cat.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-violet-300 group-hover:text-cyan-300 transition-colors">
                  Browse
                  <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-violet-glow/40 via-cyan-neon/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
