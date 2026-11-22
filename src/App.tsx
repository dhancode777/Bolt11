import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useMarketplaceData } from './hooks/useMarketplaceData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { Categories } from './components/Categories';
import { Products } from './components/Products';
import { HowItWorks } from './components/HowItWorks';
import { CreatorSection } from './components/CreatorSection';
import { PromoCTA } from './components/PromoCTA';
import { Footer } from './components/Footer';

export default function App() {
  useSmoothScroll();
  const { categories, products, loading, error } = useMarketplaceData();

  return (
    <div className="min-h-screen bg-night-950 text-slate-200">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Categories categories={categories} />
        <Products products={products} />

        {loading && (
          <div className="py-16 text-center text-sm text-slate-500">
            Loading the marketplace…
          </div>
        )}
        {error && (
          <div className="mx-auto max-w-md px-6 py-10 text-center">
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-4 text-sm text-red-300">
              {error}
            </div>
          </div>
        )}

        <HowItWorks />
        <CreatorSection />
        <PromoCTA />
      </main>
      <Footer />
    </div>
  );
}
