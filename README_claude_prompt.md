# Backend Prompt

Build the React frontend at apps/frontend/src for a product catalog +
wishlist UI against http://localhost:3005/api. Match this exactly.

Take any guidance from the requirement document @README.md

STRUCTURE
apps/frontend/src/
constants/api-urls.ts ENDPOINTS
types/
hooks/ one file per FEATURE
useStoreName.ts
useProducts.ts
useWishlist.ts  
 it merges query + mutations: useWishlistQuery() and
useWishlistActions() -> { error, add, remove }

    useDebounced.ts

components/
app/  
 products/  
 ("Add to Wishlist", "Remove from Wishlist" button in product card - type, search input text filters)
ProductCard, ProductList, Products files
wishlist/
Wishlist file only (will use ProductCard)

tests folder in each component feature folder

RULES

- .env for api endpoint
- tankstack for api calls
- hooks - feature based hooks for apis
  e.g: useProducts
  hooks should return { data, isError }

- accessiblity for all compoents (WCAG AA, aria labels, alt for image etc.)
- key prop for loops in components
- useDebounce, useMemo, useCallback where possilbe
- small components, use composition as possible,
- use generics in api response
- Products.tsx / Wishlist.tsx: guard-clause pattern — if `error`, return
  early with just an <Alert>
- Avoid props drilling, use SRP (single responsibility principle) for components
- Dont over engineer the architecture

TESTS
Tests in a `tests/` subfolder next to the component, cover critical paths, happy and unhappy paths.

Finish with lint, tests run.

---

# Frontend Prompt

Build the React frontend at apps/frontend/src for a product catalog +
wishlist UI against http://localhost:3005/api. Match this exactly.

Take any guidance from the requirement document @README.md

STRUCTURE
apps/frontend/src/
constants/api-urls.ts ENDPOINTS
types/
hooks/ one file per FEATURE
useStoreName.ts
useProducts.ts
useWishlist.ts  
 it merges query + mutations: useWishlistQuery() and
useWishlistActions() -> { error, add, remove }

    useDebounced.ts

components/
app/  
 products/  
 ("Add to Wishlist", "Remove from Wishlist" button in product card - type, search input text filters)
ProductCard, ProductList, Products files
wishlist/
Wishlist file only (will use ProductCard)

tests folder in each component feature folder

RULES

- .env for api endpoint
- tankstack for api calls
- hooks - feature based hooks for apis
  e.g: useProducts
  hooks should return { data, isError }

- accessiblity for all compoents (WCAG AA, aria labels, alt for image etc.)
- key prop for loops in components
- useDebounce, useMemo, useCallback where possilbe
- small components, use composition as possible,
- use generics in api response
- Products.tsx / Wishlist.tsx: guard-clause pattern — if `error`, return
  early with just an <Alert>
- Avoid props drilling, use SRP (single responsibility principle) for components
- Dont over engineer the architecture
- Scope discipline — implement only the props/components/behavior explicitly
  listed above. Do not add extra props, flags, or defensive UX (e.g. a
  pending/disabled state during mutations, loading skeletons,
  updates) unless requested. If you spot a real UX gap, name it as a
  suggestion after finishing the requested scope — don't build it in silently.

TESTS
Tests in a `tests/` subfolder next to the component, cover critical paths, happy and unhappy paths.

Finish with lint, tests run.
