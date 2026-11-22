import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';

export function PromoCTA() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.from('.promo-inner > *', {
        scrollTrigger: { trigger: ref.current, start: 'top 72%' },
        y: 40, opacity: 0, duration: 0.9, stagger: 0.14, ease: 'power3.out',
      });
      gsap.to('.promo-orb', {
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        y: -70,
        ease: 'none',
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative px-6 py-16 sm:py-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-glow/15 via-fuchsia-500/10 to-base border border-line/10 noise">
        <div className="promo-orb absolute -top-24 right-[15%] h-72 w-72 rounded-full bg-violet-glow/30 blur-[100px]" />
        <div className="promo-orb absolute -bottom-28 left-[10%] h-80 w-80 rounded-full bg-cyan-neon/20 blur-[110px]" />

        {/* floating geometric accents */}
        <div className="absolute top-12 left-[8%] hidden md:block h-10 w-10 rounded-xl border border-cyan-neon/30 rotate-12 animate-float" />
        <div className="absolute bottom-16 right-[12%] hidden md:block h-14 w-14 rounded-full border border-violet-glow/30 animate-float" style={{ animationDelay: '1.4s' }} />
        <div className="absolute top-1/3 right-[28%] hidden md:block h-5 w-5 rounded-sm bg-fuchsia-400/30 rotate-45 animate-float" style={{ animationDelay: '2.6s' }} />

        <div className="promo-inner relative z-10 mx-auto max-w-3xl px-8 py-20 sm:py-28 text-center">
          <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-heading leading-[1.08]">
            Your Next Digital Product
            <br />
            <span className="text-gradient">Is Waiting.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted text-base sm:text-lg leading-relaxed">
            Explore exceptional websites and find the perfect starting point for
            your next project.
          </p>
          <a
            href="#products"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-medium text-night-950 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] hover:scale-[1.04] transition-all"
          >
            Explore Marketplace
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
