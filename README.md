# Voltline — Shopify Theme

A custom Online Store 2.0 Shopify theme for an electronics resale shop. Inspired by HTML5UP **Parallelism** (mosaic showcase) and **Multiverse** (hover/reveal product grid). Tech / modern / sleek aesthetic for full PC builds, individual parts, custom commissions, and accessories.

## Install

1. Zip the contents of this `shopify-theme/` folder (so `layout/`, `templates/`, etc. sit at the root of the zip).
2. In your Shopify admin: **Online Store → Themes → Add theme → Upload zip**.
3. After upload, click **Customize** to edit sections and content from the dashboard.

> Make sure the zip's root contains the folders directly — do **not** zip the parent `shopify-theme/` directory itself or the upload will fail with "missing layout/theme.liquid".

## What's inside

```
layout/        theme.liquid                 ← shell loaded on every page
templates/     index.json, product.json, collection.json, cart.json,
               page.json, page.builds.json, page.custom-build.json, page.about.json,
               search.liquid, list-collections.liquid, 404.liquid,
               customers/login.json, register.json, account.json,
               customers/order.liquid, addresses.liquid, reset_password.liquid
sections/      header, footer, hero, builds-mosaic, featured-collection,
               specs-strip, shop-the-bench, custom-build-form,
               main-product, main-collection, main-cart, main-page,
               main-account, main-login, main-register
               + header-group.json, footer-group.json
snippets/      product-card, meta-tags
assets/        theme.css, theme.js
config/        settings_schema.json, settings_data.json
locales/       en.default.json
```

## Suggested setup after install

1. **Navigation** — In `Online Store → Navigation`, edit the `main-menu` to include:
   `Home, Shop, Builds, Parts, Custom Build, About`
2. **Pages** — Create:
   - **Builds** — assign template `page.builds`
   - **Custom Build** — assign template `page.custom-build`
   - **About** — assign template `page.about`
3. **Collections** — Create at least:
   - `Builds for Sale` (full PCs)
   - `Parts` (GPUs, CPUs, RAM, storage…)
   - `Accessories`
4. **Theme editor** — Connect collections to the homepage's *Featured collection* section, fill the *Builds mosaic* with portfolio images.

## Customizing

- All colors, fonts, and the page width are exposed under **Theme settings** in the editor.
- The **Builds mosaic** uses Parallelism's variable-span tile sizes (2×1, 2×2, 3×1, 3×2) — choose a size per block.
- The **Featured collection / Shop the bench** sections use the Multiverse-style hover reveal (title + price visible at rest, description and CTA fade up on hover).

## Files of note

- `sections/builds-mosaic.liquid` — the showcase grid (NOT shopping; portfolio only).
- `sections/featured-collection.liquid` + `snippets/product-card.liquid` — the hover-reveal product tiles.
- `sections/custom-build-form.liquid` — uses Shopify's native `contact` form action; submissions land in your Shopify inbox tagged `custom-build`.
