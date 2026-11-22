import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star, Sparkle } from 'lucide-react';
import type { Product } from '../lib/supabase';

gsap.registerPlugin(ScrollTrigger);

function ProductCard({ product }: { product: Product }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -6;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 6;
    gsap.to(card, { rotateX: rx, rotateY: ry, transformPerspective: 900, duration: 0.4, ease: 'power2.out' });
  };

  const onLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' });
    }
  };

  return (
    <a
      ref={cardRef}
      href="#products"
      onClick={(e) => e.preventDefault()}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="product-card group relative flex w-[78vw] sm:w-[24rem] shrink-0 flex-col overflow-hidden rounded-2xl bg-ink-800/70 border border-white/[0.06] transition-colors duration-500 hover:border-violet-glow/40 hover:shadow-[0_20px_60px_-20px_rgba(139,92,246,0.35)]"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-ink-700 to-night-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-800 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          {product.is_featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-violet-glow/90 px-2.5 py-1 text-[11px] font-semibold text-white shadow-lg">
              <Star size={10} className="fill-current" /> Featured
            </span>
          )}
          {product.is_new && (
            <span className="inline-flex items-center gap-1 rounded-full bg-cyan-neon/90 px-2.5 py-1 text-[11px] font-semibold text-night-950 shadow-lg">
              <Sparkle size={10} className="fill-current" /> New
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          {product.category?.name && (
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-400">
              {product.category.name}
            </span>
          )}
          {product.creator_name && (
            <span className="truncate text-xs text-slate-500">by {product.creator_name}</span>
          )}
        </div>
        <h3 className="mt-2.5 font-display text-xl font-semibold tracking-tight text-white group-hover:text-violet-300 transition-colors">
          {product.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400 line-clamp-2 flex-1">
          {product.description}
        </p>
        <div className="mt-5 flex items-center justify-between">
          <span className="font-display text-2xl font-bold text-white">
            ${Number(product.price).toFixed(0)}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 group-hover:border-transparent group-hover:bg-gradient-to-r group-hover:from-violet-glow group-hover:to-cyan-neon group-hover:text-white transition-all duration-300">
            View Product
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </a>
  );
}

export function Products({ products }: { products: Product[] }) {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      const track = trackRef.current;

      if (isDesktop && track) {
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 96);
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: () => `+=${distance() + window.innerHeight * 0.4}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      }

      gsap.from('.product-card', {
        scrollTrigger: { trigger: track, start: 'top 82%' },
        y: 56, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
      });
    }, ref);
    return () => ctx.revert();
  }, [products]);

  return (
    <section ref={ref} id="products" className="relative overflow-hidden">
      <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-violet-glow/[0.07] blur-[160px] pointer-events-none" />
      <div className="lg:h-screen lg:flex lg:flex-col lg:justify-center">
        <div className="mx-auto w-full max-w-7xl px-6 pt-24 lg:pt-0">
          <div className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-400">
            Featured Products
          </div>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Discover <span className="text-gradient">Exceptional</span> Websites
            </h2>
            <p className="hidden lg:flex items-center gap-2 text-sm text-slate-500">
              Keep scrolling to browse
              <ArrowRight size={15} className="text-violet-400 animate-pulse" />
            </p>
          </div>
          <p className="mt-4 max-w-md text-slate-400">
            Handpicked digital products ready for your next big idea.
          </p>
        </div>

        <div className="mt-12 lg:mt-14 overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6 px-6 pb-8 lg:pb-0 lg:w-max lg:mx-0 lg:px-[max(1.5rem,calc((100vw-80rem)/2))]"
          >
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
