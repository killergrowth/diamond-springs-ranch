/**
 * build.js — KillerGrowth PKG001 Build Orchestrator v1.0
 *
 * Generates all pages from _build-data.js + _partials/ → dist/
 * PKG001 = pillar-only (no SxC matrix, no blog)
 *
 * Output structure:
 *   dist/index.html                        — Homepage
 *   dist/about/index.html                  — About
 *   dist/contact/index.html                — Contact
 *   dist/services/index.html               — Services overview
 *   dist/service-areas/index.html          — Cities overview
 *   dist/{service-slug}/index.html         — 1 per service
 *   dist/{city-slug}/index.html            — 1 per city
 *   dist/robots.txt
 *   dist/sitemap.xml
 *
 * Usage: node build.js
 */

'use strict';
const fs   = require('fs');
const path = require('path');

// ── Load data ─────────────────────────────────────────────────────────────────
const { CLIENT, SERVICES, CITIES, REVIEWS, DIFFERENTIATORS, SERVICE_FAQS } = require('./_build-data.js');

const DIST = path.join(__dirname, 'dist');

// Strip HTML entities/tags for JSON-LD values
function plainText(s) {
  return String(s)
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&rsquo;/g, "'")
    .replace(/&ndash;/g, '-').replace(/&mdash;/g, '--')
    .replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"')
    .replace(/<[^>]+>/g, '');
}
const SCHEMA_NAME = plainText(CLIENT.name);


// ── Helpers ───────────────────────────────────────────────────────────────────

function mkdirp(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}


/**
 * Balanced grid: pick a desktop column count that divides the item count
 * into equal rows. 6 -> 3+3, 8 -> 4+4, 9 -> 3+3+3. Fallback: 3 cols.
 */
function gridClass(n) {
  if (n <= 4) return `kg-grid-${Math.max(n, 1)}`;
  if (n % 4 === 0) return 'kg-grid-4';
  if (n % 3 === 0) return 'kg-grid-3';
  if (n % 2 === 0 && n <= 8) return `kg-grid-${n / 2}`;
  return 'kg-grid-3';
}

function writeFile(relPath, content) {
  const full = path.join(DIST, relPath);
  mkdirp(path.dirname(full));
  fs.writeFileSync(full, content, 'utf8');
}

function loadPartial(name) {
  return fs.readFileSync(path.join(__dirname, '_partials', name + '.html'), 'utf8');
}

// ── Partial builders ──────────────────────────────────────────────────────────

const BUILD_VERSION = Date.now().toString(36);

function buildBaseHead() {
  let h = loadPartial('head');
  h = h.replace(/\{\{BUILD_VERSION\}\}/g,          BUILD_VERSION);
  h = h.replace(/\{\{CLIENT_FONT_URL\}\}/g,        CLIENT.fontUrl);
  h = h.replace(/\{\{CLIENT_FONT_FAMILY\}\}/g,      CLIENT.fontFamily);
  h = h.replace(/\{\{CLIENT_PRIMARY_COLOR\}\}/g,    CLIENT.primaryColor);
  h = h.replace(/\{\{CLIENT_PRIMARY_DARK\}\}/g,     CLIENT.primaryDark);
  h = h.replace(/\{\{CLIENT_SECONDARY_COLOR\}\}/g,  CLIENT.secondaryColor);
  h = h.replace(/\{\{CLIENT_ACCENT_COLOR\}\}/g,     CLIENT.accentColor || CLIENT.primaryColor);
  return h;
}

function buildHeader() {
  const serviceLinks = SERVICES.map(s =>
    `<a href="/${s.slug}/">${s.name}</a>`
  ).join('\n          ');
  const cityLinks = CITIES.map(c =>
    `<a href="/${c.slug}/">${c.name}, ${CLIENT.state}</a>`
  ).join('\n          ');
  const serviceMobile = SERVICES.map(s =>
    `<a href="/${s.slug}/">${s.name}</a>`
  ).join('\n  ');
  const cityMobile = CITIES.map(c =>
    `<a href="/${c.slug}/">${c.name}</a>`
  ).join('\n  ');

  let h = loadPartial('header');
  h = h.replace(/\{\{CLIENT_NAME\}\}/g,         CLIENT.name);
  h = h.replace(/\{\{CLIENT_PHONE\}\}/g,         CLIENT.phone);
  h = h.replace(/\{\{CLIENT_PHONE_RAW\}\}/g,     CLIENT.phoneRaw);
  h = h.replace(/\{\{CLIENT_EMERGENCY_BAR\}\}/g, CLIENT.emergencyBar || '');
  h = h.replace('{{SERVICE_NAV_LINKS}}',          serviceLinks);
  h = h.replace('{{CITY_NAV_LINKS}}',             cityLinks);
  h = h.replace('{{SERVICE_MOBILE_LINKS}}',       serviceMobile);
  h = h.replace('{{CITY_MOBILE_LINKS}}',          cityMobile);
  return h;
}

function buildFooter() {
  const serviceFooter = SERVICES.map(s =>
    `<li><a href="/${s.slug}/">${s.name}</a></li>`
  ).join('\n          ');
  const cityFooter = CITIES.map(c =>
    `<li><a href="/${c.slug}/">${c.name}, ${CLIENT.state}</a></li>`
  ).join('\n          ');
  const socialLinks = (CLIENT.social || []).map(s => `
    <a href="${s.url}" target="_blank" rel="noopener" aria-label="${CLIENT.name} on ${s.platform}"
       style="display:inline-flex;align-items:center;gap:6px;color:rgba(255,255,255,0.6);font-size:0.85rem;">
      ${s.icon} ${s.platform}
    </a>`).join('\n  ');

  let f = loadPartial('footer');
  f = f.replace(/\{\{CLIENT_NAME\}\}/g,         CLIENT.name);
  f = f.replace(/\{\{CLIENT_PHONE\}\}/g,         CLIENT.phone);
  f = f.replace(/\{\{CLIENT_PHONE_RAW\}\}/g,     CLIENT.phoneRaw);
  f = f.replace(/\{\{CLIENT_EMAIL\}\}/g,          CLIENT.email);
  f = f.replace(/\{\{CLIENT_ADDRESS\}\}/g,        CLIENT.address);
  f = f.replace(/\{\{CLIENT_CITY\}\}/g,           CLIENT.primaryCity);
  f = f.replace(/\{\{CLIENT_STATE\}\}/g,          CLIENT.state);
  f = f.replace(/\{\{CLIENT_HOURS\}\}/g,          CLIENT.hours);
  f = f.replace(/\{\{CLIENT_YEAR_FOUNDED\}\}/g,   CLIENT.yearFounded);
  f = f.replace(/\{\{CLIENT_DESCRIPTION\}\}/g,    CLIENT.description);
  f = f.replace('{{CLIENT_SOCIAL_LINKS}}',         socialLinks);
  f = f.replace('{{SERVICE_FOOTER_LINKS}}',        serviceFooter);
  f = f.replace('{{CITY_FOOTER_LINKS}}',           cityFooter);
  return f;
}

function buildCta() {
  let c = loadPartial('cta');
  c = c.replace(/\{\{CLIENT_NAME\}\}/g,   CLIENT.name);
  c = c.replace(/\{\{CLIENT_PHONE\}\}/g,   CLIENT.phone);
  c = c.replace(/\{\{CLIENT_PHONE_RAW\}\}/g, CLIENT.phoneRaw);
  c = c.replace('{{CTA_HEADING}}',          CLIENT.ctaHeading   || `Ready to Get Started?`);
  c = c.replace('{{CTA_SUBTEXT}}',          CLIENT.ctaSubtext   || `Contact ${CLIENT.name} today for a free estimate.`);
  return c;
}

function buildFaqHtml(faqs) {
  return faqs.map(f => `
    <div class="faq-item">
      <button class="faq-question">${f.q}</button>
      <div class="faq-answer">${f.a}</div>
    </div>`).join('');
}

function buildPageMeta({ title, description, canonical, ogImage }) {
  const img = ogImage || '/images/og-default.jpg';
  return `<title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="noindex,nofollow">
  <link rel="canonical" href="https://${CLIENT.domain}${canonical}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="https://${CLIENT.domain}${canonical}">
  <meta property="og:image" content="https://${CLIENT.domain}${img}">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="https://${CLIENT.domain}${img}">`;
}

function formHtml(formId, serviceSlug) {
  const serviceOptions = SERVICES.map(s =>
    `<option value="${s.name}"${serviceSlug === s.slug ? ' selected' : ''}>${s.name}</option>`
  ).join('\n              ');
  const cityOptions = CITIES.map(c =>
    `<option value="${c.name}">${c.name}</option>`
  ).join('\n              ');

  return `<div class="kg-form-wrapper">
  <form id="${formId}" class="kg-form" method="POST" action="/submit" novalidate>
    <div class="kg-form-row">
      <div class="kg-form-group">
        <label for="${formId}-name">Name</label>
        <input type="text" id="${formId}-name" name="name" placeholder="Your full name" required autocomplete="name">
      </div>
      <div class="kg-form-group">
        <label for="${formId}-phone">Phone</label>
        <input type="tel" id="${formId}-phone" name="phone" placeholder="(555) 555-5555" required autocomplete="tel">
      </div>
    </div>
    <div class="kg-form-row">
      <div class="kg-form-group">
        <label for="${formId}-email">Email</label>
        <input type="email" id="${formId}-email" name="email" placeholder="your@email.com" autocomplete="email">
      </div>
      <div class="kg-form-group">
        <label for="${formId}-city">Your City</label>
        <select id="${formId}-city" name="city">
          <option value="">Select your city</option>
              ${cityOptions}
        </select>
      </div>
    </div>
    <div class="kg-form-group">
      <label for="${formId}-service">Experience Interested In</label>
      <select id="${formId}-service" name="service">
        <option value="">Select an experience</option>
            ${serviceOptions}
      </select>
    </div>
    <div class="kg-form-group">
      <label for="${formId}-message">Anything Else We Should Know? (optional)</label>
      <textarea id="${formId}-message" name="message" placeholder="Group size, dates, special requests..."></textarea>
    </div>
    <div class="cf-turnstile" data-sitekey="${CLIENT.turnstileSiteKey}"></div>
    <button type="submit" class="kg-form-submit">Send My Request</button>
    <span class="kg-form-note">We respond within one business day. No spam, ever.</span>
    <div id="${formId}-status" style="display:none;padding:12px 16px;border-radius:6px;margin-top:12px;font-weight:600;"></div>
  </form>
</div>
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
<script>
(function(){
  const form = document.getElementById('${formId}');
  if (!form) return;
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = form.querySelector('.kg-form-submit');
    const status = document.getElementById('${formId}-status');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    status.style.display = 'none';
    try {
      const res = await fetch('/submit', { method:'POST', body: new FormData(form) });
      const data = await res.json();
      if (data.ok) {
        form.innerHTML = '<div style="padding:24px;text-align:center;"><p style="font-size:1.1rem;font-weight:700;color:var(--kg-secondary);">&#10003; Request received!</p><p style="color:#666;margin-top:8px;">We\\'ll be in touch within one business day.</p></div>';
      } else {
        status.style.display = 'block';
        status.style.background = '#fff3f3';
        status.style.color = '#c0392b';
        status.textContent = data.error || 'Something went wrong. Please try again or call us.';
        btn.disabled = false;
        btn.textContent = 'Send My Request';
      }
    } catch(err) {
      status.style.display = 'block';
      status.style.background = '#fff3f3';
      status.style.color = '#c0392b';
      status.textContent = 'Network error. Please try again or call us directly.';
      btn.disabled = false;
      btn.textContent = 'Send My Request';
    }
  });
})();
</script>`;
}

// ── Reviews section ─────────────────────────────────────────────────────────────
// -- Schema generators ---------------------------------------------------------

function buildHomeSchema() {
  const sameAs = [CLIENT.gbp, CLIENT.facebook, CLIENT.instagram].filter(Boolean);
  const graph = [
    {
      '@type': ['LocalBusiness'],
      '@id': `https://${CLIENT.domain}/#business`,
      name: SCHEMA_NAME,
      description: `${CLIENT.name} in Sedgwick, KS offers guided horseback rides, Highland cattle experiences, luxury treehouse and covered wagon overnight stays, and private event rental — 17 miles north of Wichita.`,
      telephone: CLIENT.phone,
      email: CLIENT.email,
      address: { '@type': 'PostalAddress', streetAddress: '1734 SE 96th St', addressLocality: 'Sedgwick', addressRegion: CLIENT.state, postalCode: '67135', addressCountry: 'US' },
      geo: { '@type': 'GeoCoordinates', latitude: 37.9017, longitude: -97.4315 },
      url: `https://${CLIENT.domain}`,
      openingHours: CLIENT.openingHours || 'Mo-Su 09:00-17:00',
      areaServed: CITIES.map(c => ({ '@type': 'City', name: c.name })),
      sameAs,
      aggregateRating: REVIEWS_DATA.aggregateRating || undefined,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${CLIENT.domain}/` },
      ],
    },
  ];
  // Add FAQPage from first service's FAQs for homepage relevance
  const homeFaqs = [
    { q: 'What experiences does Diamond Springs Ranch offer?', a: 'Diamond Springs Ranch offers guided horseback trail rides, Highland cattle encounters, luxury treehouse overnight stays, covered wagon stays, private event rental, and the Dinner Date Experience — all by reservation in Sedgwick, KS.' },
    { q: 'Where is Diamond Springs Ranch located?', a: 'Diamond Springs Ranch is at 1734 SE 96th St, Sedgwick, KS 67135 — 17 miles north of Wichita, approximately 25 minutes from central Wichita via K-15 North.' },
    { q: 'Do I need a reservation to visit Diamond Springs Ranch?', a: 'Yes. All experiences at Diamond Springs Ranch are by reservation only. Call or text (316) 303-6195 or email susan@susanschrag.com to book.' },
    { q: 'How long has Diamond Springs Ranch been operating?', a: 'Diamond Springs Ranch has been welcoming guests since 2010 — over 15 years of operation in Sedgwick County, KS under owner Susan Schrag.' },
    { q: 'What is the Google rating for Diamond Springs Ranch?', a: 'Diamond Springs Ranch holds a 4.9-star Google rating across 281+ verified reviews.' },
  ];
  graph.push({
    '@type': 'FAQPage',
    mainEntity: homeFaqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  });
  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>`;
}

function buildServiceSchema(svc, faqs) {
  const sameAs = [CLIENT.gbp, CLIENT.facebook, CLIENT.instagram].filter(Boolean);
  const graph = [
    {
      '@type': ['LocalBusiness'],
      '@id': `https://${CLIENT.domain}/#business`,
      name: SCHEMA_NAME,
      description: CLIENT.description || `${CLIENT.name} in ${CLIENT.primaryCity}, ${CLIENT.state} offers guided horseback rides, Highland cattle experiences, overnight stays, and private events.`,
      telephone: CLIENT.phone,
      email: CLIENT.email,
      address: { '@type': 'PostalAddress', streetAddress: '1734 SE 96th St', addressLocality: CLIENT.primaryCity, addressRegion: CLIENT.state, postalCode: '67135', addressCountry: 'US' },
      url: `https://${CLIENT.domain}`,
      openingHours: CLIENT.openingHours || 'Mo-Su 09:00-17:00',
      areaServed: CITIES.map(c => ({ '@type': 'City', name: c.name })),
      sameAs,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${CLIENT.name} Ranch Experiences`,
        itemListElement: [{
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: plainText(svc.name),
            description: plainText(svc.intro || svc.shortDesc || ''),
            url: `https://${CLIENT.domain}/${svc.slug}/`,
            provider: { '@type': 'LocalBusiness', name: SCHEMA_NAME },
            areaServed: { '@type': 'Place', name: CLIENT.primaryCity + ', ' + CLIENT.state },
          },
        }],
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${CLIENT.domain}/` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `https://${CLIENT.domain}/services/` },
        { '@type': 'ListItem', position: 3, name: plainText(svc.name), item: `https://${CLIENT.domain}/${svc.slug}/` },
      ],
    },
  ];
  if (faqs && faqs.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: plainText(f.q),
        acceptedAnswer: { '@type': 'Answer', text: plainText(f.a) },
      })),
    });
  }
  // HowTo schema for booking process (GEO scorer requirement)
  graph.push({
    '@type': 'HowTo',
    name: `How to Book ${plainText(svc.name)} at Diamond Springs Ranch`,
    description: `Steps to reserve ${plainText(svc.name)} at Diamond Springs Ranch in Sedgwick, KS.`,
    step: [
      { '@type': 'HowToStep', name: 'Check Availability', text: 'Call or text (316) 303-6195 to check available dates for your experience.' },
      { '@type': 'HowToStep', name: 'Reserve Your Date', text: 'Provide your name, party size, and preferred date. A deposit may be required to hold your reservation.' },
      { '@type': 'HowToStep', name: 'Receive Confirmation', text: 'Diamond Springs Ranch will confirm your booking by phone or email at susan@susanschrag.com.' },
      { '@type': 'HowToStep', name: 'Arrive at the Ranch', text: 'Drive to 1734 SE 96th St, Sedgwick, KS 67135. Arrive 10 minutes early for orientation. All activities are by reservation only.' },
    ],
  });
  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>`;
}

function buildCitySchema(city, faqs) {
  const sameAs = [CLIENT.gbp, CLIENT.facebook, CLIENT.instagram].filter(Boolean);
  const lb = {
    '@type': ['LocalBusiness'],
    '@id': `https://${CLIENT.domain}/#business`,
    name: SCHEMA_NAME,
    description: CLIENT.description || `${CLIENT.name} in ${CLIENT.primaryCity}, ${CLIENT.state} offers guided horseback rides, Highland cattle experiences, overnight stays, and private events.`,
    telephone: CLIENT.phone,
    email: CLIENT.email,
    address: { '@type': 'PostalAddress', streetAddress: '1734 SE 96th St', addressLocality: CLIENT.primaryCity, addressRegion: CLIENT.state, postalCode: '67135', addressCountry: 'US' },
    url: `https://${CLIENT.domain}`,
    openingHours: CLIENT.openingHours || 'Mo-Su 09:00-17:00',
    areaServed: CITIES.map(c => ({ '@type': 'City', name: c.name })),
    sameAs,
  };
  if (city.lat && city.lng) lb.geo = { '@type': 'GeoCoordinates', latitude: city.lat, longitude: city.lng };
  lb.hasOfferCatalog = {
    '@type': 'OfferCatalog',
    name: `Ranch Experiences near ${city.name}`,
    itemListElement: SERVICES.map(svc => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: plainText(svc.name),
        url: `https://${CLIENT.domain}/${svc.slug}/`,
        provider: { '@type': 'LocalBusiness', name: SCHEMA_NAME },
        areaServed: { '@type': 'City', name: city.name },
      },
    })),
  };
  const graph = [
    lb,
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${CLIENT.domain}/` },
        { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `https://${CLIENT.domain}/service-areas/` },
        { '@type': 'ListItem', position: 3, name: `${city.name}, ${CLIENT.state}`, item: `https://${CLIENT.domain}/${city.slug}/` },
      ],
    },
  ];
  if (faqs && faqs.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: plainText(f.q),
        acceptedAnswer: { '@type': 'Answer', text: plainText(f.a) },
      })),
    });
  }
  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>`;
}

// Priority: data/reviews.json (live Google data) > REVIEWS array in _build-data.js
// When data/reviews.json exists, it was populated by scripts/fetch-reviews.js

function buildReviews() {
  const reviewsFile = path.join(__dirname, 'data', 'reviews.json');
  let reviewData = null;
  let aggregateRating = null;

  if (fs.existsSync(reviewsFile)) {
    // Live Google reviews path
    try {
      reviewData = JSON.parse(fs.readFileSync(reviewsFile, 'utf8'));
      if (reviewData.rating && reviewData.userRatingCount) {
        aggregateRating = {
          '@type': 'AggregateRating',
          ratingValue: reviewData.rating,
          reviewCount: reviewData.userRatingCount,
          bestRating: 5,
          worstRating: 1,
        };
      }
    } catch(e) {
      console.warn('  ⚠ Could not parse data/reviews.json — falling back to _build-data.js reviews');
      reviewData = null;
    }
  }

  const reviews = reviewData
    ? reviewData.reviews.map(r => ({ text: r.text, author: r.author, role: r.relativeTime || '', publishTime: r.publishTime || null }))
    : REVIEWS; // fallback to static data from _build-data.js

  const slides = reviews.map(r => `
        <div class="swiper-slide"><div class="kg-review-card">
          <div class="kg-review-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <p class="kg-review-text">&ldquo;${r.text}&rdquo;</p>
          <div class="kg-review-author">${r.author}</div>
          <div class="kg-review-role">${r.role}</div>
        </div></div>`).join('');

  let rv = loadPartial('reviews');
  rv = rv.replace('{{REVIEWS_HEADING}}', CLIENT.reviewsHeading || 'What Our Clients Are Saying');
  rv = rv.replace('{{REVIEWS_SUBTEXT}}',  CLIENT.reviewsSubtext || `Real reviews from real ${CLIENT.primaryCity} area customers.`);
  rv = rv.replace('{{REVIEW_SLIDES}}',    slides);

  // Inject Google rating badge if we have live data
  if (reviewData && reviewData.rating) {
    const badge = `
  <div style="text-align:center;margin-bottom:32px;">
    <span style="display:inline-flex;align-items:center;gap:8px;background:#fff;border:1px solid var(--kg-border);border-radius:100px;padding:8px 20px;font-size:0.9rem;font-weight:600;color:var(--kg-secondary);">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
      ${Number(reviewData.rating).toFixed(1)} Google Rating &bull; ${reviewData.userRatingCount} reviews
    </span>
  </div>`;
    rv = rv.replace('<div class="swiper kg-swiper">', badge + '\n  <div class="swiper kg-swiper">');
  }

  return { html: rv, aggregateRating, reviewItems: reviewData ? reviewData.reviews : null };
}

// ── Featured blog cards (published only) ─────────────────────────────────────

// ── Page wrappers ─────────────────────────────────────────────────────────────

const BASE_HEAD  = buildBaseHead();
const HEADER     = buildHeader();
const FOOTER     = buildFooter();
const CTA        = buildCta();
const REVIEWS_DATA = buildReviews(); // { html, aggregateRating, reviewItems }
const REVIEWS_HTML = REVIEWS_DATA.html;

function wrap(meta, bodyContent) {
  return `<!DOCTYPE html>
<html lang="en-US" prefix="og: https://ogp.me/ns#">
<head>
${meta}
${BASE_HEAD}
</head>
<body>
${HEADER}
${bodyContent}
${FOOTER}
</body>
</html>`;
}

// ── Homepage ──────────────────────────────────────────────────────────────────

function buildHomepage() {
  const meta = buildPageMeta({
    title: CLIENT.homepageTitle || `${CLIENT.primaryCity} ${CLIENT.tradeLabel} | ${CLIENT.name}`,
    description: CLIENT.homepageDescription,
    canonical: '/',
  });

  const trustItems = (CLIENT.trustItems || []).map(t =>
    `<div class="kg-trust-item"><span>${t.icon}</span><span>${t.text}</span></div>`
  ).join('');

  const serviceCards = SERVICES.map(s => `
    <a href="/${s.slug}/" class="kg-card-link">
      <div class="kg-card">
        <div class="kg-card-icon">${s.icon || '🔧'}</div>
        <h3>${s.name}</h3>
        <p>${s.shortDesc}</p>
        <span>Learn more &rarr;</span>
      </div>
    </a>`).join('');

  const diffItems = (DIFFERENTIATORS || []).map((d, i) => `
    <div class="kg-process-item gsap-fade">
      <div class="kg-process-num">${i + 1}</div>
      <div>
        <h4>${d.heading}</h4>
        <p>${d.text}</p>
      </div>
    </div>`).join('');

  const cityGrid = CITIES.map(c =>
    `<a href="/${c.slug}/" class="link-btn">${c.name}</a>`
  ).join('\n      ');

  const statsHtml = (CLIENT.stats || []).map(s => `
    <div>
      <div class="kg-stat-value" data-count="${s.value}">${s.value}${s.suffix || ''}</div>
      <div class="kg-stat-label">${s.label}</div>
    </div>`).join('');

  const body = `
<!-- HERO -->
<section class="kg-hero">
  <div class="kg-hero-bg" style="background-image:url('/images/hero-bg.jpg');"></div>
  <div class="kg-hero-overlay"></div>
  <div class="container">
    <div class="kg-hero-content">
      <div class="kg-hero-badge">${CLIENT.heroBadge || '🏆 ' + CLIENT.primaryCity + '\'s Trusted ' + CLIENT.tradeLabel}</div>
      <h1>${CLIENT.heroHeading || CLIENT.primaryCity + '\'s Trusted ' + CLIENT.tradeLabel}</h1>
      <p>${CLIENT.heroSubtext}</p>
      <div class="kg-hero-btns">
        <a href="/contact/" class="btn btn-primary">Book a Visit &rarr;</a>
        <a href="tel:${CLIENT.phoneRaw}" class="btn btn-outline-white">${CLIENT.phone}</a>
      </div>
    </div>
  </div>
</section>

<!-- TRUST BAR -->
<div class="kg-trust-bar">
  <div class="container">
    ${trustItems}
  </div>
</div>

<!-- SERVICES -->
<section>
  <div class="container">
    <div class="section-title gsap-fade">
      <span class="section-label">Our Services</span>
      <h2>Everything Diamond Springs Ranch Has to Offer</h2>
    </div>
    <div class="kg-grid ${gridClass(SERVICES.length)}">
      ${serviceCards}
    </div>
  </div>
</section>

<!-- WHY US / DIFFERENTIATORS -->
<section class="section-alt">
  <div class="container">
    <div class="kg-two-col">
      <div>
        <span class="section-label">Why ${CLIENT.nameShort || CLIENT.name}</span>
        <h2>${CLIENT.whyUsHeading || 'Why Homeowners Choose ' + CLIENT.nameShort}</h2>
        <p>${CLIENT.whyUsIntro}</p>
        <div class="kg-process-list" style="margin-top:28px;">
          ${diffItems}
        </div>
        <div style="margin-top:32px;">
          <a href="/about/" class="btn btn-primary">Meet the Team &rarr;</a>
        </div>
      </div>
      <div class="kg-img-round gsap-fade-right">
        <img src="/images/about-team.jpg" alt="${CLIENT.name} team" style="max-height:480px;">
      </div>
    </div>
  </div>
</section>

<!-- STATS -->
${CLIENT.stats && CLIENT.stats.length ? `
<section class="section-dark">
  <div class="container">
    <div class="kg-stats">
      ${statsHtml}
    </div>
  </div>
</section>` : ''}

<!-- REVIEWS -->
${REVIEWS_HTML}

<!-- SERVICE AREAS -->
<section>
  <div class="container">
    <div class="section-title gsap-fade">
      <span class="section-label">Service Areas</span>
      <h2>Which Communities Does  Serve?</h2>
      <p>${CLIENT.serviceAreaIntro || 'We provide ' + CLIENT.tradeLabel.toLowerCase() + ' services across ' + CLIENT.state + '.'}</p>
    </div>
    <div class="link-grid">
      ${cityGrid}
    </div>
    <p style="text-align:center;margin-top:24px;">
      <a href="/service-areas/" class="btn btn-outline">View All Service Areas &rarr;</a>
    </p>
  </div>
</section>

${CTA}`;

  const homeSchema = buildHomeSchema();
  writeFile('index.html', wrap(meta + '\n' + homeSchema, body));
  console.log('✓ homepage');
}

// ── Contact page ──────────────────────────────────────────────────────────────

function buildContactPage() {
  const meta = buildPageMeta({
    title: `Contact ${CLIENT.name} | Book a Ranch Experience | ${CLIENT.primaryCity}, ${CLIENT.state}`,
    description: `Book your experience at ${CLIENT.name}. Call ${CLIENT.phone} or fill out our form. Horseback rides, treehouse stays, private events &mdash; all by reservation.`,
    canonical: '/contact/',
  });
  const body = `
<div class="kg-page-header">
  <div class="container">
    <h1>Contact ${CLIENT.name}</h1>
    <p>All activities are by reservation. Reach out and we'll get you booked.</p>
  </div>
</div>
<section>
  <div class="container">
    <div class="kg-two-col">
      <div>
        <h2>Book Your Ranch Experience</h2>
        <p style="color:var(--kg-text-light);margin-bottom:28px;">Fill out the form and we'll be in touch within one business day. Or call us directly at <a href="tel:${CLIENT.phoneRaw}">${CLIENT.phone}</a>.</p>
        ${formHtml('contact-form')}
      </div>
      <div>
        <h3>Get in Touch</h3>
        <ul style="list-style:none;padding:0;margin:20px 0 0;">
          <li style="display:flex;gap:12px;margin-bottom:16px;"><span>📞</span><div><strong>Phone</strong><br><a href="tel:${CLIENT.phoneRaw}">${CLIENT.phone}</a></div></li>
          <li style="display:flex;gap:12px;margin-bottom:16px;"><span>✉️</span><div><strong>Email</strong><br><a href="mailto:${CLIENT.email}">${CLIENT.email}</a></div></li>
          <li style="display:flex;gap:12px;margin-bottom:16px;"><span>📍</span><div><strong>Address</strong><br>${CLIENT.address}</div></li>
          <li style="display:flex;gap:12px;"><span>🕐</span><div><strong>Hours</strong><br>${CLIENT.hours}</div></li>
        </ul>
      </div>
    </div>
  </div>
</section>
${CTA}`;
  writeFile('contact/index.html', wrap(meta, body));
  console.log('✓ contact');
}

// ── About page ────────────────────────────────────────────────────────────────

function buildAboutPage() {
  const meta = buildPageMeta({
    title: `About ${CLIENT.name} | ${CLIENT.primaryCity} ${CLIENT.tradeLabel}`,
    description: CLIENT.aboutDescription || `Learn about ${CLIENT.name}, ${CLIENT.primaryCity}'s trusted ${CLIENT.tradeLabel.toLowerCase()} since ${CLIENT.yearFounded}.`,
    canonical: '/about/',
    ogImage: '/images/about-team.jpg',
  });
  const body = `
<div class="kg-page-header">
  <div class="container">
    <h1>About ${CLIENT.name}</h1>
    <p>${CLIENT.aboutTagline || 'Owner-operated. Community-focused. Results-driven.'}</p>
  </div>
</div>
<section>
  <div class="container">
    <div class="kg-two-col">
      <div class="prose">
        ${CLIENT.aboutBody || '<p>' + CLIENT.description + '</p>'}
      </div>
      <div class="kg-img-round">
        <img src="/images/about-team.jpg" alt="${CLIENT.name} team">
      </div>
    </div>
  </div>
</section>
${REVIEWS_HTML}
${CTA}`;
  writeFile('about/index.html', wrap(meta, body));
  console.log('✓ about');
}

// ── Services overview ─────────────────────────────────────────────────────────

function buildServicesPage() {
  const meta = buildPageMeta({
    title: `${CLIENT.tradeLabel} Services | ${CLIENT.name} — ${CLIENT.primaryCity}, ${CLIENT.state}`,
    description: `${CLIENT.name} offers ${SERVICES.map(s => s.name).join(', ')} in ${CLIENT.primaryCity} and surrounding ${CLIENT.state} communities.`,
    canonical: '/services/',
  });
  const cards = SERVICES.map(s => `
    <a href="/${s.slug}/" class="kg-card-link">
      <div class="kg-card">
        <div class="kg-card-icon">${s.icon || '🔧'}</div>
        <h3>${s.name}</h3>
        <p>${s.shortDesc}</p>
        <span>Learn more &rarr;</span>
      </div>
    </a>`).join('');
  const body = `
<div class="kg-page-header">
  <div class="container">
    <h1>${CLIENT.tradeLabel} Services in ${CLIENT.primaryCity}, ${CLIENT.state}</h1>
    <p>${CLIENT.name} provides professional ${CLIENT.tradeLabel.toLowerCase()} services across ${CLIENT.primaryCity} and the surrounding area.</p>
  </div>
</div>
<section>
  <div class="container">
    <div class="kg-grid ${gridClass(SERVICES.length)}">
      ${cards}
    </div>
  </div>
</section>
${CTA}`;
  writeFile('services/index.html', wrap(meta, body));
  console.log('✓ services overview');
}

// ── Service pages (1 per service) ────────────────────────────────────────────

function buildServicePage(svc) {
  const meta = buildPageMeta({
    title: `${svc.name} in ${CLIENT.primaryCity}, ${CLIENT.state} | ${CLIENT.name}`,
    description: svc.metaDescription || `${CLIENT.name} provides professional ${svc.name.toLowerCase()} in ${CLIENT.primaryCity} and surrounding ${CLIENT.state} communities. ${svc.shortDesc}`,
    canonical: `/${svc.slug}/`,
    ogImage: `/images/svc-${svc.slug}.jpg`,
  });
  const faqs = svc.faqs || SERVICE_FAQS[svc.slug] || [];
  const svcSchema = buildServiceSchema(svc, faqs);
  // PKG001: link to city pillar pages, not SxC pages
  const cityLinks = CITIES.map(c =>
    `<a href="/${c.slug}/" class="link-btn">${c.name}</a>`
  ).join('\n      ');

  const body = `
${svcSchema}
<div class="kg-page-header">
  <div class="container">
    <nav class="kg-breadcrumb" style="color:rgba(255,255,255,0.6);margin-bottom:10px;">
      <a href="/" style="color:rgba(255,255,255,0.7);">Home</a> &rsaquo;
      <a href="/services/" style="color:rgba(255,255,255,0.7);">Services</a> &rsaquo;
      <span style="color:#fff;">${svc.name}</span>
    </nav>
    <h1>${svc.name} in ${CLIENT.primaryCity}, ${CLIENT.state}</h1>
    <p>${svc.shortDesc}</p>
  </div>
</div>
<section>
  <div class="container">
    <div class="kg-two-col">
      <article class="prose">
        ${svc.body || '<p>' + svc.shortDesc + '</p>'}
        ${svc.costRange ? `<div class="kg-highlight"><p><strong>Typical Cost Range:</strong> ${svc.costRange}</p></div>` : ''}
      </article>
      <div>
        <div style="background:var(--kg-bg-alt);border-radius:8px;padding:28px;">
          <h3>Book This Experience</h3>
          <p style="color:var(--kg-text-light);margin-bottom:20px;">Questions about ${svc.name.toLowerCase()}? Reach out and we'll get you scheduled.</p>
          ${formHtml(`svc-form-${svc.slug}`, svc.slug)}
        </div>
      </div>
    </div>
  </div>
</section>
${faqs.length ? `
<section class="section-alt">
  <div class="container">
    <div class="section-title gsap-fade">
      <h2>What Are Common Questions About ${svc.name}?</h2>
    </div>
    <div class="faq-list">
      ${buildFaqHtml(faqs)}
    </div>
  </div>
</section>` : ''}
<section>
  <div class="container">
    <div class="section-title gsap-fade">
      <h2>Which ${CLIENT.primaryCity}-Area Communities Does ${CLIENT.name} Serve?</h2>
      <p>We provide ${svc.name.toLowerCase()} in ${CLIENT.primaryCity} and the surrounding area.</p>
    </div>
    <div class="link-grid">
      ${cityLinks}
    </div>
  </div>
</section>
${CTA}`;
  writeFile(`${svc.slug}/index.html`, wrap(meta, body));
}

function buildServicePages() {
  SERVICES.forEach(svc => buildServicePage(svc));
  console.log(`✓ ${SERVICES.length} service pages`);
}

// ── City pages (1 per city) ──────────────────────
function buildCityPage(city) {
  const meta = buildPageMeta({
    title: `${CLIENT.tradeLabel} in ${city.name}, ${CLIENT.state} | ${CLIENT.name}`,
    description: city.metaDescription || `${CLIENT.name} provides professional ${CLIENT.tradeLabel.toLowerCase()} in ${city.name}, ${CLIENT.state}. ${city.intro}`,
    canonical: `/${city.slug}/`,
  });
  const cityFaqs = city.faqs || [];
  const citySchema = buildCitySchema(city, cityFaqs);
  // PKG001: link to service pillar pages, not SxC pages
  const serviceLinks = SERVICES.map(s =>
    `<a href="/${s.slug}/" class="link-btn">${s.name}</a>`
  ).join('\n      ');

  const body = `
${citySchema}
<div class="kg-page-header">
  <div class="container">
    <nav class="kg-breadcrumb" style="color:rgba(255,255,255,0.6);margin-bottom:10px;">
      <a href="/" style="color:rgba(255,255,255,0.7);">Home</a> &rsaquo;
      <a href="/service-areas/" style="color:rgba(255,255,255,0.7);">Service Areas</a> &rsaquo;
      <span style="color:#fff;">${city.name}, ${CLIENT.state}</span>
    </nav>
    <h1>${CLIENT.tradeLabel} in ${city.name}, ${CLIENT.state}</h1>
    <p>${city.intro}</p>
  </div>
</div>
<section>
  <div class="container">
    <div class="kg-two-col">
      <article class="prose">
        ${city.body || '<p>' + city.intro + '</p>'}
        ${city.localContext ? `<div class="kg-highlight"><p>${city.localContext}</p></div>` : ''}
      </article>
      <div>
        <div style="background:var(--kg-bg-alt);border-radius:8px;padding:28px;">
          <h3>Book a Ranch Experience</h3>
          ${formHtml(`city-form-${city.slug}`)}
        </div>
      </div>
    </div>
  </div>
</section>
<section class="section-alt">
  <div class="container">
    <div class="section-title gsap-fade">
      <h2>Which Services Does ${CLIENT.name} Offer in ${city.name}?</h2>
    </div>
    <div class="link-grid">
      ${serviceLinks}
    </div>
  </div>
</section>
${REVIEWS_HTML}
${CTA}`;
  writeFile(`${city.slug}/index.html`, wrap(meta, body));
}

function buildCityPages() {
  CITIES.forEach(city => buildCityPage(city));
  console.log(`? ${CITIES.length} city pages`);
}

// -- Service Area overview -----------------------------------------------------

function buildServiceAreasPage() {
  const meta = buildPageMeta({
    title: `Service Areas | ${CLIENT.name} � ${CLIENT.primaryCity} ${CLIENT.tradeLabel}`,
    description: `${CLIENT.name} serves ${CITIES.map(c => c.name).join(', ')} and surrounding communities in ${CLIENT.state}.`,
    canonical: '/service-areas/',
  });
  const areaCards = CITIES.map(c => `
    <a href="/${c.slug}/" style="text-decoration:none;">
      <div class="kg-area-item">
        <h4>${c.name}</h4>
        <p>${c.county ? c.county + ' County' : CLIENT.state}</p>
      </div>
    </a>`).join('');
  const body = `
<div class="kg-page-header">
  <div class="container">
    <h1>Service Areas</h1>
    <p>${CLIENT.name} provides ${CLIENT.tradeLabel.toLowerCase()} services throughout ${CLIENT.primaryCity} and surrounding ${CLIENT.state} communities.</p>
  </div>
</div>
<section>
  <div class="container">
    <div class="kg-areas-grid">
      ${areaCards}
    </div>
  </div>
</section>
${CTA}`;
  writeFile('service-areas/index.html', wrap(meta, body));
  console.log('? service-areas overview');
}

// -- SxC pages (service � city) -----------------------------------------------

// -- Static files --------------------------------------------------------------

function buildRobots() {
  writeFile('robots.txt', `User-agent: *\nAllow: /\nSitemap: https://${CLIENT.domain}/sitemap.xml\n`);
}

function buildSitemap() {
  // PKG001: no SxC pages, no blog
  const urls = [
    '/', '/about/', '/contact/', '/services/', '/service-areas/',
    ...SERVICES.map(s => `/${s.slug}/`),
    ...CITIES.map(c => `/${c.slug}/`),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>https://${CLIENT.domain}${u}</loc></url>`).join('\n')}
</urlset>`;
  writeFile('sitemap.xml', xml);
}

// -- Copy static assets --------------------------------------------------------

function copyAssets() {
  const copyDir = (src, dst) => {
    if (!fs.existsSync(src)) return;
    mkdirp(dst);
    fs.readdirSync(src).forEach(f => {
      const s = path.join(src, f), d = path.join(dst, f);
      fs.statSync(s).isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
    });
  };
  copyDir(path.join(__dirname, 'assets'),     path.join(DIST, 'assets'));
  copyDir(path.join(__dirname, 'images'),      path.join(DIST, 'images'));
  ['_headers', '_redirects', '_routes.json'].forEach(f => {
    const src = path.join(__dirname, f);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(DIST, f));
  });
  console.log('? assets copied');
}

// -- Main ----------------------------------------------------------------------

function main() {
  const pageCount = SERVICES.length + CITIES.length + 5;
  console.log(`\n??  Building ${CLIENT.name} - PKG001\n`);
  mkdirp(DIST);

  buildHomepage();
  buildContactPage();
  buildAboutPage();
  buildServicesPage();
  buildServiceAreasPage();
  buildServicePages();
  buildCityPages();
  buildRobots();
  buildSitemap();
  copyAssets();

  console.log(`\n? Build complete ? dist/ (${pageCount} pages)\n`);
}

main();