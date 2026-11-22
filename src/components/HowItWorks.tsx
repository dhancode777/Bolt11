import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, CreditCard, PackageOpen, MousePointer2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    icon: Search,
    title: 'Explore',
    desc: 'Discover premium ready-made websites created by talented developers.',
    accent: 'from-violet-glow/25 to-cyan-neon/20 text-violet-300',
  },
  {
    num: '02',
    icon: CreditCard,
    title: 'Purchase',
    desc: 'Choose your website and complete your purchase through secure checkout.',
    accent: 'from-fuchsia-500/25 to-violet-glow/20 text-fuchsia-300',
  },
  {
    num: '03',
    icon: PackageOpen,
    title: 'Receive',
    desc: 'Receive your purchased website source-code package after creator delivery.',
    accent: 'from-cyan-neon/25 to-violet-glow/20 text-cyan-300',
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const panels = gsap.utils.toArray<HTMLElement>('.hiw-panel');
      const dots = gsap.utils.toArray<HTMLElement>('.hiw-dot');

      gsap.set(panels.slice(1), { autoAlpha: 0, y: 60 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: '+=260%',
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          onUpdate: (self) => {
            const active = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
            dots.forEach((d, i) => d.classList.toggle('hiw-dot-active', i === active));
          },
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        tl.to(panels[i - 1], { autoAlpha: 0, y: -60, scale: 0.94, duration: 0.45, ease: 'power2.in' })
          .to(panels[i], { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out' }, '<0.1')
          .to({}, { duration: 0.35 });
      });
    });

    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.from('.hiw-panel', {
        scrollTrigger: { trigger: '.hiw-panels', start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8, stagger: 0.18, ease: 'power3.out',
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={ref} id="how-it-works" className="relative bg-surface/40">
      <div className="relative lg:h-screen lg:overflow-hidden">
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-6 py-24 lg:py-0">
          <div className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-600 dark:text-cyan-400">
            How It Works
          </div>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight text-heading">
            From Discovery <span className="text-gradient">to Download</span>
          </h2>
          <p className="mt-4 hidden lg:flex items-center gap-2 max-w-md text-muted">
            Your next website is just a few steps away.
            <MousePointer2 size={15} className="text-cyan-500 dark:text-cyan-400 animate-pulse" />
          </p>
          <p className="mt-4 max-w-md text-muted lg:hidden">
            Your next website is just a few steps away.
          </p>

          <div className="hiw-panels relative mt-12 space-y-16 lg:space-y-0 lg:flex-1">
            {steps.map(({ num, icon: Icon, title, desc, accent }, i) => (
              <div
                key={num}
                className="hiw-panel lg:absolute lg:inset-x-0 lg:inset-y-0 lg:my-auto"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                  <div>
                    <span className="font-display text-[7rem] sm:text-[10rem] lg:text-[13rem] leading-none font-bold bg-clip-text text-transparent bg-gradient-to-br from-heading/25 to-heading/5">
                      {num}
                    </span>
                    <h3 className="-mt-6 sm:-mt-10 font-display text-4xl sm:text-5xl font-bold tracking-tight text-heading">
                      {title}
                    </h3>
                    <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
                      {desc}
                    </p>
                  </div>
                  <div className="hidden lg:flex items-center justify-center">
                    <div className="relative flex h-64 w-64 items-center justify-center rounded-[2.5rem] glass-strong">
                      <div className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-br ${accent} opacity-40 blur-2xl`} />
                      <span className="relative flex h-32 w-32 items-center justify-center rounded-3xl bg-elevated border border-line/15 text-cyan-500 dark:text-cyan-300 shadow-[0_0_60px_rgba(139,92,246,0.35)]">
                        <Icon size={56} strokeWidth={1.2} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 hidden lg:flex items-center gap-3">
            {steps.map(({ num }) => (
              <div key={num} className="flex items-center gap-3">
                <span className="hiw-dot h-2 w-2 rounded-full bg-heading/15 transition-colors duration-300" />
                <span className="hidden sm:block text-xs tracking-[0.2em] text-faint uppercase">
                  {num}
                </span>
                <span className="h-px w-10 sm:w-16 bg-line/15" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
