# KillerGrowth PKG002 Template

Standard template for all PKG002 automated builds. Do not edit this template directly when building a client site — scaffold it.

## Quick Start

```bash
# From workspace root, after build-payload.json is in the site directory:
node tools/automated-build-pipeline/pkg002-template/scaffold-site.js <client-slug>

# Then from the site directory:
cd sites/<client-slug>
node ../../tools/automated-build-pipeline/scaffold-build-data.js
# Fill in _build-data.js TODOs
node build.js
node blog-build.js
node ../../tools/automated-build-pipeline/deploy-staging.js
```

## Template Structure

```
pkg002-template/
├── _partials/              HTML partials (tokens replaced at build time)
│   ├── head.html           <head> with CSS vars for brand colors/fonts
│   ├── header.html         Emergency bar + sticky header + mobile nav
│   ├── footer.html         Footer + JS (GSAP, Swiper, FAQ, scroll)
│   ├── cta.html            Full-width CTA section
│   ├── reviews.html        Swiper reviews carousel
│   ├── blog-featured.html  Homepage blog section wrapper (3-card grid)
│   ├── blog-card.html      Single blog card partial
│   ├── blog-index.html     Blog listing page shell
│   └── blog-post.html      Individual post page shell
├── assets/css/
│   ├── kg-base.css         Framework CSS (DO NOT edit per client)
│   └── kg-forms.css        Form component CSS
├── functions/
│   └── submit.js           CF Pages Function: Turnstile + Gmail send
├── build.js                Main build orchestrator
├── blog-build.js           Blog builder (respects published/scheduled)
├── scaffold-site.js        Copies template + applies tokens from payload
├── images-manifest.json    Required images checklist with prompt templates
├── package.json
├── .gitignore
├── _headers
├── _redirects
└── _routes.json
```

## Tokens

These `{{TOKEN}}` placeholders are replaced by `scaffold-site.js` from `build-payload.json`:

| Token | Source field |
|---|---|
| `{{CLIENT_NAME}}` | businessName |
| `{{CLIENT_SLUG}}` | (from CLI arg) |
| `{{CLIENT_PHONE}}` | phone |
| `{{CLIENT_PHONE_RAW}}` | phone (digits only) |
| `{{CLIENT_EMAIL}}` | email |
| `{{CLIENT_ADDRESS}}` | address |
| `{{CLIENT_CITY}}` | primaryCity |
| `{{CLIENT_STATE}}` | state |
| `{{CLIENT_HOURS}}` | hours |
| `{{CLIENT_YEAR_FOUNDED}}` | yearFounded |
| `{{CLIENT_DESCRIPTION}}` | shortDescription |
| `{{CLIENT_EMERGENCY_BAR}}` | emergencyBar |
| `{{CLIENT_PRIMARY_COLOR}}` | primaryColor |
| `{{CLIENT_PRIMARY_DARK}}` | primaryDark |
| `{{CLIENT_SECONDARY_COLOR}}` | secondaryColor |
| `{{CLIENT_FONT_URL}}` | fontUrl |
| `{{CLIENT_FONT_FAMILY}}` | fontFamily |
| `{{CF_TURNSTILE_SITE_KEY}}` | turnstileSiteKey |
| `{{NOTIFY_EMAIL}}` | notifyEmail |

## Blog Rules

- **Published** posts: appear in blog index + pagination + sitemap
- **Scheduled** posts: get individual pages built (URL is live) but do NOT appear in index
- Set `status: "published"` and `publishDate` for the first 3 posts; `status: "scheduled"` with `scheduledDate` for the rest

## Pre-Deploy Checklist

- [ ] `_build-data.js` has no TODO markers remaining
- [ ] All images in `images-manifest.json` exist with unique file sizes
- [ ] Blog post images: verify no two files share the same size (duplicates = regenerate)
- [ ] Emergency bar renders with background color on staging
- [ ] All forms show CF Turnstile widget before submit button
- [ ] Homepage featured blog section has section heading + 3 cards
- [ ] Contact page form works end-to-end (test submission)
- [ ] Sitemap generated and robots.txt present

## Updating the Template

When you improve a partial or fix a bug, update the template file here. Do NOT update client sites manually — those stay as-is unless a rebuild is explicitly requested.
