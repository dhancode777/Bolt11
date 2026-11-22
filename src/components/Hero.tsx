import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Play, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';
import { HeroScene } from './HeroScene';

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-badge', { y: 24, opacity: 0, duration: 0.7, delay: 0.15 })
        .from('.hero-line', { y: 60, opacity: 0, duration: 0.9, stagger: 0.12 }, '-=0.35')
        .from('.hero-desc', { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
        .from('.hero-cta', { y: 24, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=0.45')
        .from('.hero-trust', { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 }, '-=0.4');
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative min-h-screen flex items-center overflow-hidden noise">
      {/* atmospheric background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 h-[480px] w-[480px] rounded-full bg-violet-glow/25 blur-[140px] animate-pulse-glow" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-cyan-neon/15 blur-[130px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 hero-fade" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 lg:grid-cols-2 items-center gap-12 px-6 pt-28 pb-20 lg:pt-20 lg:pb-0">
        <div>
          <div className="hero-badge inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium tracking-widest text-cyan-600 dark:text-cyan-300 uppercase">
            <Sparkles size={13} />
            Premium Digital Marketplace
          </div>

          <h1 className="mt-6 font-display font-bold text-heading leading-[1.05] text-5xl sm:text-6xl xl:text-7xl tracking-tight">
            <span className="hero-line block text-heading">Your Next Big</span>
            <span className="hero-line block text-heading">
              Idea <span className="text-gradient">Starts Here.</span>
            </span>
          </h1>

          <p className="hero-desc mt-6 max-w-md text-base sm:text-lg leading-relaxed text-muted">
            Discover premium websites, explore creative digital products, and bring
            your next big idea to life.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#products"
              className="hero-cta group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-glow to-cyan-neon px-7 py-3.5 font-medium text-white shadow-[0_0_32px_rgba(139,92,246,0.45)] hover:shadow-[0_0_48px_rgba(139,92,246,0.65)] hover:scale-[1.03] active:scale-[0.98] transition-all"
            >
              Explore Websites
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#how-it-works"
              className="hero-cta group inline-flex items-center gap-2.5 rounded-full glass px-6 py-3.5 text-content hover:border-cyan-neon/40 hover:text-heading transition-all"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-heading/10 group-hover:bg-cyan-neon/20 transition-colors">
                <Play size={11} className="ml-0.5 fill-current" />
              </span>
              See It in Action
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-faint">
            <span className="hero-trust inline-flex items-center gap-2">
              <CreditCard size={15} className="text-violet-400" />
              No credit card needed
            </span>
            <span className="hero-trust inline-flex items-center gap-2">
              <ShieldCheck size={15} className="text-cyan-400" />
              Secure checkout
            </span>
            <span className="hero-trust inline-flex items-center gap-2">
              <Sparkles size={15} className="text-fuchsia-400" />
              Built for creators
            </span>
          </div>
        </div>

        <div className="relative h-[380px] sm:h-[460px] lg:h-[620px]">
          <HeroScene />
        </div>
      </div>
    </section>
  );
}
