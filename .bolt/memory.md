# Project memory

## Product intent & audience

- Digital marketplace where creators sell digital products/assets.
- Core flows: Explore → Purchase → Receive (buyer); Upload → Package → Approval → Sale → Earnings (creator).
- Audience: creators/designers buying and selling digital goods; homepage must convey premium, immersive marketplace value.
- Homepage sections include Featured Products, How It Works, and Creator Journey as primary storytelling anchors.

## Brand personality & voice

- Futuristic, premium, cinematic.
- Sophisticated and immersive over utilitarian; aims for production-quality, non-cookie-cutter presentation.

## Visual design & UX direction

- Premium neon aesthetic with large cinematic typography.
- Sophisticated visual transitions and interactive product previews.
- Pinned scroll experiences: horizontal product glide, crossfading/scaled numbered step typography, sequential milestone lighting with progress bars/dots.
- Responsive: desktop uses ScrollTrigger pinning; mobile falls back to natural swipe/stacked layouts without pinning.
- Reduce-motion users get static, non-pinned sections.
- Uses Vite + React + JSX + Tailwind + Lucide React; `@/` path alias for `src/` imports. No extra UI/icon packages.

## Decisions, constraints & rationale

- GSAP ScrollTrigger with `pin: true` and `scrub` for scroll-linked, reversible animations on selected sections only.
- Pinning scoped to Featured Products, How It Works, Creator Journey; natural vertical scrolling preserved everywhere else (no global scroll hijacking).
- Avoid nested scroll containers; calculate scroll distances per pinned section.
- Lenis smooth scrolling must stay synchronized with ScrollTrigger.
- ScrollTriggers cleaned up on component unmount.
- Reduced-motion preferences respected (skip pinning).
- Three.js and GSAP/Lenis chosen to deliver immersive, futuristic homepage; keep performance and cleanup in mind.

## Open questions & assumptions

- Exact neon color palette and typography scale not yet fixed.
- Marketplace product categories/types unspecified.
- Creator dashboard details beyond milestones not defined.
- Three.js visuals assumed integrated (likely hero/ambient) — placement to be confirmed.
- Payment/auth integration out of current scope (homepage redesign only).