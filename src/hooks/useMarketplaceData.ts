import { useEffect, useState } from 'react';
import { supabase, type Category, type Product } from '../lib/supabase';

export function useMarketplaceData() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const [catResult, prodResult] = await Promise.all([
        supabase.from('categories').select('*').order('sort_order'),
        supabase
          .from('products')
          .select('*, category:categories(name)')
          .order('created_at', { ascending: false }),
      ]);

      if (cancelled) return;

      if (catResult.error || prodResult.error) {
        setError('Could not load the marketplace catalog. Please try again later.');
        setLoading(false);
        return;
      }

      setCategories(catResult.data ?? []);
      setProducts(prodResult.data ?? []);
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { categories, products, loading, error };
}
