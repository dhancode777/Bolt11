import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Upload, FileArchive, BadgeCheck, ShoppingBag, Wallet } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const flow = [
  { icon: Upload, label: 'Website Upload', hint: 'Submit your project in minutes' },
  { icon: FileArchive, label: 'ZIP Package', hint: 'Source code bundled and versioned' },
  { icon: BadgeCheck, label: 'Admin Approval', hint: 'Quality review by the Marketplace team' },
  { icon: ShoppingBag, label: 'New Purchase', hint: 'A buyer checks out your work' },
  { icon: Wallet, label: 'Creator Earnings', hint: 'Payouts land in your account' },
];

export function CreatorSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const nodes = gsap.utils.toArray<HTMLElement>('.flow-node');
      const barFills = gsap.utils.toArray<HTMLElement>('.flow-fill');
      const copy = ref.current?.querySelector('.creator-copy');

      if (copy) {
        gsap.from(copy.children, {
          scrollTrigger: { trigger: ref.current, start: 'top 70%' },
          y: 36, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        });
      }

      gsap.set(nodes, { opacity: 0.15, scale: 0.96 });
      gsap.set(barFills, { scaleX: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: '+=220%',
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
        },
      });

      tl.to('.flow-panel', { autoAlpha: 1, duration: 0.05 });
      flow.forEach((_, i) => {
        tl.to(nodes[i], { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' })
          .to(
            barFills[i],
            { scaleX: [85, 70, 95, 60, 45][i] / 100, duration: 0.35, ease: 'power2.out' },
            '<'
          )
          .to({}, { duration: 0.3 });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="creators" className="relative overflow-hidden noise bg-night-950">
      <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-[150px] pointer-events-none" />
      <div className="relative lg:h-screen lg:flex lg:items-center">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 lg:grid-cols-2 items-center gap-14 px-6 py-24 lg:py-0">
          <div className="creator-copy">
            <div className="text-xs font-medium uppercase tracking-[0.25em] text-fuchsia-400">
              For Creators
            </div>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.1]">
              Create Something Great.
              <br />
              <span className="text-gradient">Get Paid for It.</span>
            </h2>
            <p className="mt-5 max-w-md text-slate-400 leading-relaxed">
              Turn your website projects into opportunities. Upload your creations,
              reach new buyers and earn from your work.
            </p>
            <a
              href="#"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-glow px-7 py-3.5 font-medium text-white shadow-[0_0_32px_rgba(217,70,239,0.35)] hover:shadow-[0_0_48px_rgba(217,70,239,0.55)] hover:scale-[1.03] transition-all"
            >
              Start Selling
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="flow-panel relative rounded-3xl glass-strong p-8 sm:p-10 overflow-hidden">
            <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-violet-glow/20 blur-[80px]" />
            <div className="relative">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Creator Dashboard — Scroll to replay the journey
              </div>
              <div className="relative mt-8 space-y-0">
                <div className="flow-connector absolute left-[1.35rem] top-4 bottom-4 w-px bg-gradient-to-b from-violet-glow via-fuchsia-400 to-cyan-neon opacity-60" />
                {flow.map(({ icon: Icon, label, hint }) => (
                  <div key={label} className="flow-node relative flex items-center gap-4 py-3.5">
                    <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-ink-700 text-violet-300">
                      <Icon size={18} strokeWidth={1.7} />
                    </span>
                    <div className="flex-1 rounded-xl bg-ink-800/80 border border-white/[0.05] px-4 py-3">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-sm font-medium text-slate-200">{label}</span>
                        <span className="hidden sm:block text-[11px] text-slate-500">{hint}</span>
                      </div>
                      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                        <div className="flow-fill h-full w-full origin-left rounded-full bg-gradient-to-r from-violet-glow to-cyan-neon" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
