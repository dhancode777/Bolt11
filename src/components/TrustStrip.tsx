import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Layers, ShieldCheck, BadgeCheck, Zap } from 'lucide-react';

const items = [
  { icon: Layers, label: 'Curated Digital Products' },
  { icon: ShieldCheck, label: 'Secure Payments' },
  { icon: BadgeCheck, label: 'Verified Creators' },
  { icon: Zap, label: 'Instant Access After Delivery' },
];

export function TrustStrip() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.from('.trust-item', {
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative border-y border-white/[0.06] bg-night-900/60">
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4 gap-y-6 px-6 py-8">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="trust-item flex items-center justify-center gap-3 px-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-glow/20 to-cyan-neon/20 text-cyan-300">
              <Icon size={17} />
            </span>
            <span className="text-sm text-slate-300 font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
