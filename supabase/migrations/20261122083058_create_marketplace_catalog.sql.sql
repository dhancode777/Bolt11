/*
# Marketplace catalog: categories and products

1. New Tables
- `categories`: marketplace website categories
  - `id` (uuid, primary key)
  - `name` (text, not null, unique) — display name, e.g. "Business"
  - `description` (text) — short blurb shown on the category card
  - `icon` (text) — semantic icon key for the frontend
  - `sort_order` (integer) — display ordering
- `products`: ready-made websites listed for sale
  - `id` (uuid, primary key)
  - `title` (text, not null) — product name
  - `category_id` (uuid, references categories) — one category per product
  - `description` (text) — short product description
  - `price` (numeric, not null) — display price in USD
  - `image_url` (text) — product preview screenshot
  - `creator_name` (text) — independent creator who built it
  - `is_featured` (boolean, default false) — featured badge
  - `is_new` (boolean, default false) — new badge
  - `created_at` (timestamptz)

2. Security
- Enable RLS on both tables.
- This is a public storefront with no sign-in: grant SELECT on both tables to
  `anon` + `authenticated` and add public read policies (USING (true)).
- Writes are not granted to browser roles; catalog is managed via the server.

3. Notes
- Seeded with the five marketplace categories and a starter product catalog.
- Seeded rows reference each other by title, never by generated id.
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  icon text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  description text,
  price numeric(10,2) NOT NULL DEFAULT 0,
  image_url text,
  creator_name text,
  is_featured boolean NOT NULL DEFAULT false,
  is_new boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS products_category_idx ON products(category_id);
CREATE INDEX IF NOT EXISTS products_created_at_idx ON products(created_at DESC);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON categories TO anon, authenticated;
GRANT SELECT ON products TO anon, authenticated;

DROP POLICY IF EXISTS "public_read_categories" ON categories;
CREATE POLICY "public_read_categories"
ON categories FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "public_read_products" ON products;
CREATE POLICY "public_read_products"
ON products FOR SELECT
TO anon, authenticated
USING (true);

INSERT INTO categories (name, description, icon, sort_order) VALUES
  ('Business', 'Complete company sites with dashboards, booking and lead funnels.', 'briefcase', 1),
  ('E-commerce', 'Storefronts with carts, checkout flows and order management.', 'shopping-bag', 2),
  ('Enterprise Tech', 'SaaS platforms, admin panels and internal tooling.', 'server', 3),
  ('Landing Pages', 'High-conversion one-pagers for launches and campaigns.', 'rocket', 4),
  ('Portfolio', 'Personal brands and creative showcases with attitude.', 'palette', 5)
ON CONFLICT (name) DO NOTHING;

INSERT INTO products (title, category_id, description, price, image_url, creator_name, is_featured, is_new) VALUES
  ('Nexora SaaS Platform', (SELECT id FROM categories WHERE name = 'Enterprise Tech'), 'Multi-tenant SaaS starter with auth, billing pages, admin console and analytics dashboard.', 249.00, 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Aria Chen', true, false),
  ('Aurora Commerce', (SELECT id FROM categories WHERE name = 'E-commerce'), 'Headless storefront with cart, product filtering, Stripe-ready checkout and CMS panels.', 189.00, 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Marco Silva', true, false),
  ('Fable Portfolio', (SELECT id FROM categories WHERE name = 'Portfolio'), 'Editorial portfolio with case-study layouts, scroll reveals and a lightweight CMS.', 79.00, 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Yuki Tanaka', false, true),
  ('Launchpad One', (SELECT id FROM categories WHERE name = 'Landing Pages'), 'Conversion-focused landing page with A/B ready sections, waitlist form and analytics.', 49.00, 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Sofia Reyes', false, true),
  ('Meridian Business', (SELECT id FROM categories WHERE name = 'Business'), 'Corporate site with services catalog, booking funnel, blog and multi-language support.', 149.00, 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Daniel Weber', true, false),
  ('Orbit Dashboard', (SELECT id FROM categories WHERE name = 'Enterprise Tech'), 'Internal ops dashboard with role-based views, realtime charts and export tooling.', 219.00, 'https://images.pexels.com/photos/39284/pexels-photo-39284.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Aria Chen', false, false),
  ('Velvet Storefront', (SELECT id FROM categories WHERE name = 'E-commerce'), 'Fashion-forward boutique theme with lookbook grids, wishlist and quick-view modals.', 169.00, 'https://images.pexels.com/photos/188458/pexels-photo-188458.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Emma Laurent', false, true),
  ('Studio North', (SELECT id FROM categories WHERE name = 'Portfolio'), 'Agency-style studio site with project reels, team grid and client intake flow.', 99.00, 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Marco Silva', false, false)
ON CONFLICT DO NOTHING;
