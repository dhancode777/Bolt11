import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Category {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
}

export interface Product {
  id: string;
  title: string;
  category_id: string | null;
  description: string | null;
  price: number;
  image_url: string | null;
  creator_name: string | null;
  is_featured: boolean;
  is_new: boolean;
  category?: { name: string } | null;
}
