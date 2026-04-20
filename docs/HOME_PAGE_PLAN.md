# Electronics Store Home Page Plan

## Overview

Create a production-ready, codeless home page for the electronics store template that fetches all content from the database.

## Home Page Structure

```
┌─────────────────────────────────────────────────────┐
│  Header (Navbar)                                       │
│    - Logo + Store Name                                  │
│    - Categories from database (NavbarContent)            │
│    - Cart, Account links (NavbarEnd)                    │
├─────────────────────────────────────────────────────┤
│  Hero Section                                          │
│    - Fetches from heroes table via HeroRoot             │
│    - HeroItem with background, title, CTA             │
├─────────────────────────────────────────────────────┤
│  Featured Categories                                   │
│    - Fetches L1 categories from database                │
│    - CategoryList with Category cards                   │
├─────────────────────────────────────────────────────┤
│  New Arrivals                                          │
│    - Recommendations type="newest"                      │
│    - Product grid with cards                           │
├─────────────────────────────────────────────────────┤
│  Popular Products                                      │
│    - Recommendations type="popular"                     │
│    - Product grid with cards                           │
├─────────────────────────────────────────────────────┤
│  Footer                                                │
│    - Codeless footer with links                       │
└─────────────────────────────────────────────────────┘
```

## Components to Use

### Header/Navigation
| Component | Purpose |
|-----------|---------|
| `Navbar` | Main header wrapper |
| `NavbarBrand` | Logo and store name |
| `NavbarContent` | Navigation links (categories from DB) |
| `NavbarEnd` | Cart, account buttons |

### Hero Section
| Component | Purpose |
|-----------|---------|
| `HeroRoot` | Fetches hero data from heroes table |
| `HeroItem` | Individual hero slide |
| `HeroBackground` | Background image/color |
| `HeroContent` | Content positioning |
| `HeroTitle` | Hero title text |
| `HeroSubtitle` | Hero subtitle text |
| `HeroDescription` | Hero description |
| `HeroCtaPrimary` | Call to action button |

### Categories
| Component | Purpose |
|-----------|---------|
| `CategoryList` | Fetches categories from database |
| `CategoryListView` | Layout wrapper for categories |
| `Category` | Individual category card |
| `CategoryImage` | Category image |
| `CategoryName` | Category name |
| `CategorySlug` | Category slug (for href) |

### Products
| Component | Purpose |
|-----------|---------|
| `RecommendationsRoot` | Fetches newest/popular products |
| `RecommendationsItems` | Product list wrapper |
| `Product` | Individual product card |
| `ProductImage` | Product image |
| `ProductName` | Product name |
| `ProductPrice` | Product price |
| `ProductStockBadge` | Stock status indicator |
| `ProductAddToCartTrigger` | Add to cart button |

### Layout
| Component | Purpose |
|-----------|---------|
| `Grid` | CSS Grid layout |
| `Flex` | Flexbox layout |
| `Section` | Section wrapper with title |

## Demo Data Requirements

### Existing Demo Data
| File | Content | Status |
|------|---------|--------|
| `categories.sql` | 20 categories (L1 + L2) | ✅ Ready |
| `products.sql` | 40 products | ✅ Ready |
| `hero.sql` | 5 hero slides | ✅ Ready |
| `category-products.sql` | Category-product mappings | ✅ Ready |

### Required Additions
| File | Content | Priority |
|------|---------|----------|
| `product-media.sql` | 3+ images for flagship products | High |

### Recommended Products for Media
- Samsung Galaxy S24 Ultra
- iPhone 15 Pro Max
- MacBook Pro 14
- Sony WH-1000XM5
- Samsung Galaxy Watch

## Implementation Steps

### Step 1: Update zclint Allowed Imports
Add `A` to allowed imports in `@solidjs/router`:
```json
"@solidjs/router": ["Router", "Routes", "A", ...]
```

### Step 2: Create Home Page Component
File: `templates/electronics/src/routes/index.tsx`

Components needed:
1. Navbar with categories from database
2. Hero section
3. Categories section
4. New Arrivals section
5. Popular Products section
6. Footer

### Step 3: Create Product Media Demo Data
File: `templates/scripts/sql/electronics-and-gadgets/product-media.sql`

Add multiple images for flagship products.

## zclint Compliance

All components must follow zclint rules:

| Rule | Compliance |
|------|------------|
| `no-disallowed-imports` | Only use allowed imports |
| `no-disallowed-patterns` | No `window`, `document`, etc. |
| `no-event-handlers` | Use components instead of `onClick` |
| `no-inline-functions` | Extract functions outside JSX |
| `no-plain-ts` | All files `.tsx` |

### Allowed Imports
```typescript
// UI Components
"lucide-solid": ["*"]

// SolidJS
"solid-js": ["splitProps", "mergeProps", "Suspense"]

// Meta
"@solidjs/meta": ["MetaProvider", "Title", "Meta", "Link", "Base"]

// Router
"@solidjs/router": ["Router", "Routes", "A"]

// Start
"@solidjs/start": ["clientOnly"]
"@solidjs/start/router": ["FileRoutes"]
```

## File Changes

| File | Action |
|------|--------|
| `zclint/src/rules/no_disallowed_imports.rs` | Add `A` to allowed imports |
| `templates/electronics/src/routes/index.tsx` | Create home page |
| `templates/scripts/sql/electronics-and-gadgets/product-media.sql` | Create media demo data |
| `templates/~/components/ui/category/STRUCTURE.md` | Update documentation |
| `templates/~/components/ui/product/STRUCTURE.md` | Update documentation |

## Estimated Timeline

1. Update zclint - 5 min
2. Create home page component - 30 min
3. Create product media demo data - 15 min
4. Testing and debugging - 20 min

**Total: ~1.5 hours**
