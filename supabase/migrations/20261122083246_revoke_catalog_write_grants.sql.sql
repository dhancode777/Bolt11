/*
# Tighten marketplace catalog grants to read-only

1. Modified Tables
- `categories`: revoke INSERT/UPDATE/DELETE from anon and authenticated.
- `products`: revoke INSERT/UPDATE/DELETE from anon and authenticated.

2. Security
- The storefront is browse-only from the browser. The previous migration
  followed the default template grants, which exposed full CRUD. Only SELECT
  is needed by the Data API; writes stay server-side only.
- RLS and the public SELECT policies remain unchanged.
*/

REVOKE INSERT, UPDATE, DELETE ON categories FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON products FROM anon, authenticated;
