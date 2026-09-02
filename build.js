/**
 * build.js â€” KillerGrowth PKG001 Build Orchestrator v1.0
 *
 * Generates all pages from _build-data.js + _partials/ â†’ dist/
 * PKG001 = pillar-only (no SxC matrix, no blog)
 *
 * Output structure:
 *   dist/index.html                        â€” Homepage
 *   dist/about/index.html                  â€” About
 *   dist/contact/index.html                â€” Contact
 *   dist/services/index.html               â€” Services overview
 *   dist/service-areas/index.html          â€” Cities overview
 *   dist/{service-slug}/index.html         â€” 1 per service
 *   dist/{city-slug}/index.html            â€” 1 per city
 *   dist/robots.txt
 *   dist/sitemap.xml
 *
 * Usage: node build.js
 */

'use strict';
const fs   = require('fs');
const path = require('path');
const { injectScripts, loadSiteScripts } = require('C:\\Users\\KillerGrowth\\.openclaw\\workspace\\tools\\kg-site-builder\\lib\\inject-scripts');
const SITE_SCRIPTS = loadSiteScripts('diamond-springs-ranch');

// â”€â”€ Load data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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


// â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
  // Inject tracked scripts (GA4, GTM, Feedbucket, etc.) on HTML pages only
  if (relPath.endsWith('.html') && SITE_SCRIPTS) {
    content = injectScripts(content, SITE_SCRIPTS);
  }
  fs.writeFileSync(full, content, 'utf8');
}

function loadPartial(name) {
  return fs.readFileSync(path.join(__dirname, '_partials', name + '.html'), 'utf8');
}

// â”€â”€ Partial builders â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const BUILD_VERSION = Date.now().toString(36);

function buildBaseHead() {
  // V2 unified head â€” same fonts/CSS as the v2 homepage
  return `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" type="image/png" href="/images/logo-black.png" media="(prefers-color-scheme: light)">
<link rel="icon" type="image/png" href="/images/logo-white.png" media="(prefers-color-scheme: dark)">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet">
<link href="https://fonts.cdnfonts.com/css/norwester" rel="stylesheet">
<link rel="stylesheet" href="/v2.css?v=${BUILD_VERSION}">
<style>
  /* Subpage interior overrides */
  body { background: var(--cream); }
  /* Nav transparent on subpages â€” v2-hero is full-screen so same as homepage */
  .v2-nav { background: transparent; padding: 14px 56px; }
  .v2-nav.scrolled { background: rgba(26,21,16,0.97); }
  @media (max-width: 900px) { .v2-nav { padding: 12px 24px; } }
  /* Content sections */
  .dsr-section { padding: 80px 0; }
  .dsr-section-alt { padding: 80px 0; background: #EDE4D6; }
  .dsr-section-dark { padding: 80px 0; background: var(--charcoal); }
  .dsr-container { max-width: 1280px; margin: 0 auto; padding: 0 40px; }
  @media (max-width: 768px) { .dsr-container { padding: 0 24px; } }
  .dsr-two-col { display: grid; grid-template-columns: 3fr 2fr; gap: 64px; align-items: start; }
  @media (max-width: 900px) { .dsr-two-col { grid-template-columns: 1fr; gap: 40px; } }
  /* Section headings */
  .dsr-section-label { display: block; font-size: 0.68rem; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold); margin-bottom: 12px; }
  .dsr-section h2 { font-family: var(--font-serif); font-size: clamp(1.6rem, 2.8vw, 2.4rem); font-weight: 300; line-height: 1.2; margin-bottom: 20px; color: var(--black); }
  .dsr-section h2 em { font-style: italic; }
  .dsr-section-alt h2 { font-family: var(--font-serif); font-size: clamp(1.6rem, 2.8vw, 2.4rem); font-weight: 300; line-height: 1.2; margin-bottom: 20px; color: var(--black); }
  .dsr-section-dark h2 { font-family: var(--font-serif); font-size: clamp(1.6rem, 2.8vw, 2.4rem); font-weight: 300; line-height: 1.2; margin-bottom: 20px; color: var(--white); }
  /* Prose */
  .dsr-prose p { font-size: 0.97rem; font-weight: 300; color: var(--gray-body); line-height: 1.8; margin-bottom: 1rem; }
  .dsr-prose h3 { font-family: var(--font-serif); font-size: 1.4rem; font-weight: 400; color: var(--charcoal); margin: 24px 0 10px; }
  .dsr-prose ul { padding-left: 1.4rem; margin-bottom: 1rem; }
  .dsr-prose ul li { font-size: 0.96rem; font-weight: 300; color: var(--gray-body); margin-bottom: 6px; }
  /* Sidebar card */
  .dsr-sidebar-card { background: var(--charcoal); border-top: 3px solid var(--gold); padding: 32px; position: sticky; top: 90px; }
  .dsr-sidebar-card h3 { font-family: var(--font-serif); font-size: 1.4rem; font-weight: 300; color: var(--white); margin-bottom: 12px; }
  .dsr-sidebar-card p { font-size: 0.88rem; font-weight: 300; color: rgba(255,255,255,0.65); margin-bottom: 20px; }
  .dsr-sidebar-card .btn { width: 100%; text-align: center; display: block; margin-bottom: 12px; }
  .dsr-sidebar-contact li { display: flex; gap: 10px; margin-bottom: 12px; font-size: 0.88rem; color: rgba(255,255,255,0.7); }
  .dsr-sidebar-contact a { color: var(--gold-lt); }
  /* FAQ */
  .dsr-faq-item { border-bottom: 1px solid rgba(0,0,0,0.1); }
  .dsr-faq-q { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 18px 0; cursor: pointer; font-size: 0.95rem; font-weight: 500; color: var(--charcoal); user-select: none; }
  .dsr-faq-icon { flex-shrink: 0; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; color: var(--gold); transition: transform 0.3s; }
  .dsr-faq-item.open .dsr-faq-icon { transform: rotate(45deg); }
  .dsr-faq-a { font-size: 0.9rem; font-weight: 300; color: var(--gray-body); line-height: 1.75; max-height: 0; overflow: hidden; transition: max-height 0.35s ease; }
  .dsr-faq-item.open .dsr-faq-a { max-height: 300px; padding-bottom: 18px; }
  /* City/service link chips */
  .dsr-link-grid { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; }
  .dsr-link-chip { display: inline-block; padding: 9px 18px; border: 1px solid rgba(0,0,0,0.7); font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--charcoal); transition: background 0.2s, color 0.2s, border-color 0.2s; }
  .dsr-link-chip:hover { background: var(--gold); color: var(--white); border-color: var(--gold); }
  .dsr-section-dark .dsr-link-chip { border-color: rgba(255,255,255,0.5); color: var(--white); }
  .dsr-section-dark .dsr-link-chip:hover { background: var(--gold); color: var(--white); border-color: var(--gold); }
  /* CTA section */
  .dsr-cta { position: relative; padding: 100px 0; text-align: center; overflow: hidden; }
  @media (max-width: 640px) {
    .dsr-cta { padding: 56px 0; }
    .dsr-cta-inner h2 { font-size: clamp(1.6rem, 7vw, 2.2rem); }
    .dsr-cta-btns { flex-direction: column; align-items: center; gap: 12px; }
  }
  .dsr-cta-bg { position: absolute; inset: 0; background-size: cover; background-position: center; }
  .dsr-cta-overlay { position: absolute; inset: 0; background: rgba(12,8,4,0.72); }
  .dsr-cta-inner { position: relative; z-index: 2; max-width: 620px; margin: 0 auto; padding: 0 24px; }
  .dsr-cta-inner .overline { display: block; margin-bottom: 16px; }
  .dsr-cta-inner h2 { font-family: var(--font-serif); font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 300; color: var(--white); margin-bottom: 16px; }
  .dsr-cta-inner p { font-size: 0.97rem; font-weight: 300; color: rgba(255,255,255,0.75); margin-bottom: 32px; }
  .dsr-cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
  /* Contact info block */
  .dsr-contact-info li { display: flex; gap: 14px; margin-bottom: 20px; font-size: 0.95rem; }
  .dsr-contact-info .icon { font-size: 1.1rem; flex-shrink: 0; margin-top: 2px; }
  .dsr-contact-info strong { display: block; font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); margin-bottom: 3px; }
  .dsr-contact-info a { color: var(--charcoal); transition: color 0.2s; }
  .dsr-contact-info a:hover { color: var(--gold); }
  /* Area cards */
  .dsr-area-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
  @media (max-width: 768px) { .dsr-area-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 480px) { .dsr-area-grid { grid-template-columns: 1fr; } }
  .dsr-area-card { background: var(--charcoal); padding: 32px 24px; text-align: center; transition: background 0.2s; }
  .dsr-area-card:hover { background: #3d3830; }
  .dsr-area-card h4 { font-family: var(--font-serif); font-size: 1.5rem; font-weight: 300; color: var(--white); margin-bottom: 4px; }
  .dsr-area-card p { font-size: 0.76rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gold-lt); }
  /* Services cards grid */
  .dsr-svc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; }
  @media (max-width: 900px) { .dsr-svc-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .dsr-svc-grid { grid-template-columns: 1fr; } }
  .dsr-svc-tile { position: relative; height: 300px; overflow: hidden; display: flex; align-items: flex-end; }
  .dsr-svc-tile-bg { position: absolute; inset: 0; background-size: cover; background-position: center; transition: transform 0.55s ease; }
  .dsr-svc-tile:hover .dsr-svc-tile-bg { transform: scale(1.05); }
  .dsr-svc-tile-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 60%); }
  .dsr-svc-tile-body { position: relative; z-index: 2; padding: 22px 24px; }
  .dsr-svc-tile-name { font-family: var(--font-serif); font-size: 1.25rem; font-weight: 300; color: var(--white); margin-bottom: 6px; }
  .dsr-svc-tile-desc { font-size: 0.8rem; color: rgba(255,255,255,0.7); line-height: 1.5; margin-bottom: 12px; }
  .dsr-svc-tile-cta { font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold-lt); border-bottom: 1px solid rgba(196,154,60,0.4); padding-bottom: 2px; transition: color 0.2s; }
  .dsr-svc-tile-cta:hover { color: var(--gold); }
  /* Form wrapper for dark sidebar */
  .dsr-form-wrap input, .dsr-form-wrap select, .dsr-form-wrap textarea {
    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
    color: var(--white); border-radius: 0;
  }
  .dsr-form-wrap label { color: rgba(255,255,255,0.7); font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase; }
  .dsr-form-wrap input::placeholder, .dsr-form-wrap textarea::placeholder { color: rgba(255,255,255,0.3); }
  .dsr-form-wrap select option { background: var(--charcoal); color: var(--white); }
  /* Reviews in subpages */
  .dsr-reviews { padding: 80px 0; background: var(--charcoal); }
  .dsr-reviews-head { text-align: center; margin-bottom: 40px; }
  .dsr-reviews-head .overline { display: block; margin-bottom: 12px; }
  .dsr-reviews-head h2 { font-family: var(--font-serif); font-size: clamp(1.6rem, 2.8vw, 2.4rem); font-weight: 300; color: var(--white); }
  .dsr-reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
  @media (max-width: 900px) { .dsr-reviews-grid { grid-template-columns: 1fr; } }
  .dsr-review { background: rgba(255,255,255,0.04); padding: 32px; border-top: 1px solid rgba(255,255,255,0.06); }
  .dsr-review-stars { color: var(--gold); letter-spacing: 3px; margin-bottom: 16px; font-size: 0.85rem; }
  .dsr-review-body { font-family: var(--font-serif); font-size: 1rem; font-weight: 300; font-style: italic; color: rgba(255,255,255,0.82); line-height: 1.7; margin-bottom: 18px; }
  .dsr-review-name { font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.38); }
</style>`;
}

function buildHeader() {
  // V2 nav â€” matches homepage exactly
  const svcDropItems = SERVICES.map(s =>
    `<li><a href="/${s.slug}/">${s.name}</a></li>`
  ).join('');
  const cityDropItems = CITIES.map(c =>
    `<li><a href="/${c.slug}/">${c.name}</a></li>`
  ).join('');
  return `
<nav class="v2-nav" id="v2-nav">
  <a href="/" class="v2-nav-logo">
    <img src="/images/logo-white.png" alt="Diamond Springs Ranch">
    <span class="v2-nav-logo-text">Diamond Springs Ranch</span>
  </a>
  <ul class="v2-nav-links">
    <li class="v2-nav-has-drop">
      <a href="/services/">Experiences <span class="v2-nav-caret"></span></a>
      <ul class="v2-nav-drop">${svcDropItems}</ul>
    </li>
    <li class="v2-nav-has-drop">
      <a href="/#lodging">Stay <span class="v2-nav-caret"></span></a>
      <ul class="v2-nav-drop">
        <li><a href="/luxury-treehouse-stay/">Sunset Reset Treehouse</a></li>
        <li><a href="/covered-wagon-stay/">Sunset Schooner</a></li>
      </ul>
    </li>
    <li><a href="/about/">Our Story</a></li>
    <li class="v2-nav-has-drop">
      <a href="/contact/">Visit <span class="v2-nav-caret"></span></a>
      <ul class="v2-nav-drop">
        <li><a href="/contact/">Contact &amp; Directions</a></li>
      </ul>
    </li>
  </ul>
  <a href="https://fareharbor.com/embeds/book/diamondspringsranch/?full-items=yes" onclick="return !(window.FH && FH.open({ shortname: 'diamondspringsranch', fallback: 'simple', fullItems: 'yes', view: 'items' }));" class="v2-nav-book">Book a Visit</a>
  <button class="v2-hamburger" id="v2-hamburger" aria-label="Open menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</nav>

<!-- Mobile drawer -->
<div class="v2-mobile-overlay" id="v2-mobile-overlay"></div>
<nav class="v2-mobile-nav" id="v2-mobile-nav" aria-label="Mobile navigation">
  <button class="v2-mobile-close" id="v2-mobile-close" aria-label="Close menu">&times;</button>
  <a href="/">Home</a>
  <div class="v2-mobile-section">
    <button class="v2-mobile-toggle" aria-expanded="false">Experiences <span class="v2-mobile-caret">+</span></button>
    <div class="v2-mobile-group">
      <a href="/services/">All Experiences</a>
      ${SERVICES.map(s => `<a href="/${s.slug}/">${s.name}</a>`).join('')}
    </div>
  </div>
  <div class="v2-mobile-section">
    <button class="v2-mobile-toggle" aria-expanded="false">Stay <span class="v2-mobile-caret">+</span></button>
    <div class="v2-mobile-group">
      <a href="/luxury-treehouse-stay/">Sunset Reset Treehouse</a>
      <a href="/covered-wagon-stay/">Sunset Schooner</a>
    </div>
  </div>
  <a href="/about/">Our Story</a>
  <a href="/contact/">Visit / Contact</a>
  <a href="https://fareharbor.com/embeds/book/diamondspringsranch/?full-items=yes" class="v2-mobile-book">Book a Visit</a>
</nav>

<script>
  (function(){
    const nav = document.getElementById('v2-nav');
    if (!nav) return;
    window.addEventListener('scroll', function() {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });

    // Hamburger / mobile drawer
    const hamburger  = document.getElementById('v2-hamburger');
    const mobileNav  = document.getElementById('v2-mobile-nav');
    const overlay    = document.getElementById('v2-mobile-overlay');
    const closeBtn   = document.getElementById('v2-mobile-close');

    function openMenu() {
      mobileNav.classList.add('open');
      overlay.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      mobileNav.classList.remove('open');
      overlay.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    if (hamburger) hamburger.addEventListener('click', openMenu);
    if (closeBtn)  closeBtn.addEventListener('click', closeMenu);
    if (overlay)   overlay.addEventListener('click', closeMenu);

    // Accordion toggles inside mobile nav
    document.querySelectorAll('.v2-mobile-toggle').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const group  = btn.nextElementSibling;
        const caret  = btn.querySelector('.v2-mobile-caret');
        const isOpen = group.classList.contains('open');
        // close all others
        document.querySelectorAll('.v2-mobile-group').forEach(function(g) { g.classList.remove('open'); });
        document.querySelectorAll('.v2-mobile-caret').forEach(function(c) { c.textContent = '+'; });
        document.querySelectorAll('.v2-mobile-toggle').forEach(function(b) { b.setAttribute('aria-expanded','false'); });
        if (!isOpen) {
          group.classList.add('open');
          if (caret) caret.textContent = '\u2212';
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  })();
</script>`;
}

function buildFooter() {
  // V2 footer â€” matches homepage
  const svcLinks = SERVICES.map(s =>
    `<li><a href="/${s.slug}/">${s.name}</a></li>`
  ).join('');
  const cityLinks = CITIES.map(c =>
    `<li><a href="/${c.slug}/">${c.name}</a></li>`
  ).join('');
  const socials = (CLIENT.social || []).map(s =>
    `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.platform}" title="${s.platform}">${s.icon || s.platform[0]}</a>`
  ).join('');
  return `
<footer class="v2-footer">
  <div class="dsr-container">
    <div class="v2-footer-inner">
      <div class="v2-footer-brand">
        <a href="/"><img src="/images/logo-white.png" alt="Diamond Springs Ranch"></a>
        <p>${CLIENT.description}</p>
        <div class="v2-footer-social">${socials}</div>
      </div>
      <div class="v2-footer-col">
        <h4>Experiences</h4>
        <ul>${svcLinks}</ul>
      </div>
      <div class="v2-footer-col">
        <h4>Nearby Cities</h4>
        <ul>${cityLinks}</ul>
      </div>
      <div class="v2-footer-col">
        <h4>Contact</h4>
        <div class="v2-footer-contact-item"><span>&#128205;</span><span><a href="https://maps.google.com/?q=1734+SE+96th+St,+Sedgwick,+KS+67135" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;">${CLIENT.address}</a></span></div>
        <div class="v2-footer-contact-item"><span>&#128222;</span><span><a href="tel:${CLIENT.phoneRaw}">${CLIENT.phone}</a></span></div>
        <div class="v2-footer-contact-item"><span>&#9993;</span><span><a href="mailto:${CLIENT.email}">${CLIENT.email}</a></span></div>
        <div class="v2-footer-contact-item"><span>&#128336;</span><span>${CLIENT.hours}</span></div>
      </div>
    </div>
  </div>
  <div class="v2-footer-bottom">
    <div class="dsr-container" style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;">
      <span>&copy; <script>document.write(new Date().getFullYear())</script> ${CLIENT.name}. All Rights Reserved.</span>
      <span>Website by <a href="https://killergrowth.com" target="_blank" rel="noopener">KillerGrowth</a></span>
    </div>
  </div>
</footer>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" defer><\/script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js" defer><\/script>
<script>
document.addEventListener('DOMContentLoaded', function() {
  // FAQ accordion
  document.querySelectorAll('.dsr-faq-q').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var item = btn.closest('.dsr-faq-item');
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.dsr-faq-item.open').forEach(function(i) { i.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });
});
<\/script>`;
}

function buildCta() {
  // V2-style CTA section matching homepage design
  return `
<section class="dsr-cta">
  <div class="dsr-cta-bg" style="background-image:url('/images/trail-ride2.png');"></div>
  <div class="dsr-cta-overlay"></div>
  <div class="dsr-cta-inner">
    <span class="overline">Diamond Springs Ranch</span>
    <h2>Ready to experience the ranch?</h2>
    <p>All activities are by reservation. Call or book online &mdash; we\'d love to have you out.</p>
    <div class="dsr-cta-btns">
      <a href="https://fareharbor.com/embeds/book/diamondspringsranch/?full-items=yes" onclick="return !(window.FH && FH.open({ shortname: 'diamondspringsranch', fallback: 'simple', fullItems: 'yes', view: 'items' }));" class="btn btn-gold">Book Online</a>
      <a href="tel:${CLIENT.phoneRaw}" class="btn btn-light">${CLIENT.phone}</a>
    </div>
  </div>
</section>`;
}

function buildFaqHtml(faqs) {
  // V2 accordion style
  return faqs.map(f => `
    <div class="dsr-faq-item">
      <div class="dsr-faq-q" role="button" tabindex="0">${f.q}<span class="dsr-faq-icon">+</span></div>
      <div class="dsr-faq-a">${f.a}</div>
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

  return `<div class="dsr-form-card">
  <div class="dsr-form-header">
    <h3 class="dsr-form-title">Reserve Your Experience</h3>
    <p class="dsr-form-subtitle">We'll be in touch within one business day.</p>
  </div>
  <form id="${formId}" class="dsr-form" method="POST" action="/submit" novalidate>
    <div class="dsr-form-row">
      <div class="dsr-form-group">
        <label for="${formId}-name">Name <span class="dsr-required">*</span></label>
        <input type="text" id="${formId}-name" name="name" placeholder="Your full name" required autocomplete="name">
      </div>
      <div class="dsr-form-group">
        <label for="${formId}-phone">Phone Number <span class="dsr-required">*</span></label>
        <input type="tel" id="${formId}-phone" name="phone" placeholder="(316) 555-5555" required autocomplete="tel">
      </div>
    </div>
    <div class="dsr-form-group">
      <label for="${formId}-email">Email Address <span class="dsr-required">*</span></label>
      <input type="email" id="${formId}-email" name="email" placeholder="your@email.com" required autocomplete="email">
    </div>
    <div class="dsr-form-group">
      <label for="${formId}-service">Experiences You're Interested In <span class="dsr-required">*</span></label>
      <select id="${formId}-service" name="service" required>
        <option value="">Select an experience...</option>
            ${serviceOptions}
        <option value="Multiple / Not Sure">Multiple / Not Sure</option>
      </select>
    </div>
    <div class="dsr-form-group">
      <label for="${formId}-message">Anything Else We Should Know? <span class="dsr-optional">(optional)</span></label>
      <textarea id="${formId}-message" name="message" placeholder="Group size, preferred dates, special requests..."></textarea>
    </div>
    <button type="submit" class="dsr-form-submit">Send My Request &rarr;</button>
    <p class="dsr-form-note">&#128274; Your info is private. We'll never spam you.</p>
    <div id="${formId}-status" style="display:none;padding:12px 16px;border-radius:6px;margin-top:12px;font-weight:600;"></div>
  </form>
</div>
<style>
  .dsr-form-card {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.18);
    padding: 36px 32px;
  }
  @media (max-width: 600px) { .dsr-form-card { padding: 28px 20px; } }
  .dsr-form-header { margin-bottom: 24px; }
  .dsr-form-title {
    font-family: var(--font-serif);
    font-size: 1.3rem;
    font-weight: 400;
    color: var(--charcoal);
    margin: 0 0 6px;
  }
  .dsr-form-subtitle {
    font-size: 0.82rem;
    color: #7E7C76;
    margin: 0;
  }
  .dsr-form { display: flex; flex-direction: column; gap: 14px; }
  .dsr-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  @media (max-width: 580px) { .dsr-form-row { grid-template-columns: 1fr; } }
  .dsr-form-group { display: flex; flex-direction: column; gap: 6px; }
  .dsr-form-group label {
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--charcoal);
    letter-spacing: 0.01em;
  }
  .dsr-required { color: var(--gold); }
  .dsr-optional { font-weight: 400; color: #9e9a93; font-size: 0.78rem; }
  .dsr-form-group input,
  .dsr-form-group select,
  .dsr-form-group textarea {
    border: 1.5px solid #E2DDD8;
    border-radius: 6px;
    padding: 12px 14px;
    font-size: 0.95rem;
    font-family: var(--font-sans);
    color: var(--charcoal);
    background: #fff;
    width: 100%;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    -webkit-appearance: none;
    appearance: none;
  }
  .dsr-form-group input::placeholder,
  .dsr-form-group textarea::placeholder { color: #b0aca5; }
  .dsr-form-group input:focus,
  .dsr-form-group select:focus,
  .dsr-form-group textarea:focus {
    border-color: var(--gold);
    box-shadow: 0 0 0 3px rgba(189,148,72,0.15);
  }
  .dsr-form-group select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 38px;
    cursor: pointer;
  }
  .dsr-form-group textarea { min-height: 100px; resize: vertical; }
  .dsr-form-submit {
    width: 100%;
    padding: 15px 24px;
    background: var(--gold);
    color: var(--black);
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 700;
    font-family: var(--font-sans);
    letter-spacing: 0.03em;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    text-align: center;
  }
  .dsr-form-submit:hover { background: #c8953a; transform: translateY(-1px); }
  .dsr-form-submit:active { transform: translateY(0); }
  .dsr-form-note {
    font-size: 0.75rem;
    color: #9e9a93;
    text-align: center;
    margin: 2px 0 0;
  }
</style>
<script>
(function(){
  const form = document.getElementById('${formId}');
  if (!form) return;
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = form.querySelector('.dsr-form-submit');
    const status = document.getElementById('${formId}-status');
    btn.disabled = true;
    btn.textContent = 'Sendingâ€¦';
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

// â”€â”€ Reviews section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// -- Schema generators ---------------------------------------------------------

function buildHomeSchema() {
  const sameAs = [CLIENT.gbp, CLIENT.facebook, CLIENT.instagram].filter(Boolean);
  const graph = [
    {
      '@type': ['LocalBusiness'],
      '@id': `https://${CLIENT.domain}/#business`,
      name: SCHEMA_NAME,
      description: `${CLIENT.name} in Sedgwick, KS offers guided horseback rides, Highland cattle experiences, luxury treehouse and covered wagon overnight stays, and private event rental â€” 17 miles north of Wichita.`,
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
    { q: 'What experiences does Diamond Springs Ranch offer?', a: 'Diamond Springs Ranch offers guided horseback trail rides, Highland cattle encounters, luxury treehouse overnight stays, covered wagon stays, private event rental, and the Dinner Date Experience â€” all by reservation in Sedgwick, KS.' },
    { q: 'Where is Diamond Springs Ranch located?', a: 'Diamond Springs Ranch is at 1734 SE 96th St, Sedgwick, KS 67135 â€” 17 miles north of Wichita, approximately 25 minutes from central Wichita via K-15 North.' },
    { q: 'Do I need a reservation to visit Diamond Springs Ranch?', a: 'Yes. All experiences at Diamond Springs Ranch are by reservation only. Call or text (316) 303-6195 or email susan@susanschrag.com to book.' },
    { q: 'How long has Diamond Springs Ranch been operating?', a: 'Diamond Springs Ranch has been welcoming guests since 2010 â€” over 15 years of operation in Sedgwick County, KS under owner Susan Schrag.' },
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
      console.warn('  âš  Could not parse data/reviews.json â€” falling back to _build-data.js reviews');
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

// â”€â”€ V2-style reviews section for subpages â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function buildV2Reviews() {
  const reviewsFile = path.join(__dirname, 'data', 'reviews.json');
  let reviews = [];
  try {
    const d = JSON.parse(fs.readFileSync(reviewsFile, 'utf8'));
    reviews = (d.reviews || []).slice(0, 3).map(r => ({ text: r.text, author: r.author }));
  } catch(e) { reviews = (REVIEWS || []).slice(0, 3); }
  const cards = reviews.map(r => `
    <div class="dsr-review">
      <div class="dsr-review-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
      <div class="dsr-review-body">&ldquo;${r.text}&rdquo;</div>
      <div class="dsr-review-name">${r.author}</div>
    </div>`).join('');
  return `
<section class="dsr-reviews">
  <div class="dsr-container">
    <div class="dsr-reviews-head">
      <span class="overline">What Guests Are Saying</span>
      <h2>Real reviews. <em>Real experiences.</em></h2>
    </div>
    <div class="dsr-reviews-grid">${cards}</div>
  </div>
</section>`;
}

// â”€â”€ Featured blog cards (published only) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

// â”€â”€ Page wrappers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const BASE_HEAD  = buildBaseHead();
const HEADER     = buildHeader();
const FOOTER     = buildFooter();
const CTA        = buildCta();
const REVIEWS_DATA = buildReviews(); // { html, aggregateRating, reviewItems }
const REVIEWS_HTML = REVIEWS_DATA.html;

function wrap(meta, bodyContent) {
  // V2 unified template â€” same design language as homepage
  return `<!DOCTYPE html>
<html lang="en-US">
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

// â”€â”€ Homepage â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
    <a href="/${s.slug}/" class="kg-card-link dsr-svc-card-link">
      <div class="kg-card dsr-svc-card">
        ${s.cardPhoto
          ? `<div class="dsr-card-photo"><img src="/images/client-photos/${s.cardPhoto}" alt="${s.name}" loading="lazy"></div>`
          : `<div class="kg-card-icon">${s.icon || 'ðŸ”§'}</div>`
        }
        <div class="dsr-card-body">
          <h3>${s.name}</h3>
          <p>${s.shortDesc}</p>
          <span>Learn more &rarr;</span>
        </div>
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
      <div class="kg-hero-badge">${CLIENT.heroBadge || 'ðŸ† ' + CLIENT.primaryCity + '\'s Trusted ' + CLIENT.tradeLabel}</div>
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
        <img src="/images/client-photos/rider-sunset.png" alt="Cowboy riding at sunset at Diamond Springs Ranch" style="max-height:480px;width:100%;object-fit:cover;border-radius:10px;">
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
      <h2>Which Communities Does ${CLIENT.nameShort} Serve?</h2>
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
  console.log('âœ“ homepage');
}

// â”€â”€ Contact page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function buildContactPage() {
  const meta = buildPageMeta({
    title: `Contact ${CLIENT.name} | Book a Ranch Experience | ${CLIENT.primaryCity}, ${CLIENT.state}`,
    description: `Book your experience at ${CLIENT.name}. Call ${CLIENT.phone} or fill out our form. Horseback rides, treehouse stays, private events â€” all by reservation.`,
    canonical: '/contact/',
  });
  const body = `
<section class="v2-hero">
  <div class="v2-hero-bg"></div>
  <div class="v2-hero-overlay"></div>
  <div class="v2-hero-content">
    <div class="v2-hero-eyebrow">
      <span class="v2-eyebrow-line"></span>
      <span class="overline">Sedgwick, Kansas &bull; 15 Minutes from Wichita</span>
    </div>
    <h1>Come <em>visit</em> the ranch.</h1>
    <p class="v2-hero-sub">All activities are by reservation. Call or book online &mdash; we'd love to have you out.</p>
    <div class="v2-hero-btns">
      <a href="https://fareharbor.com/embeds/book/diamondspringsranch/?full-items=yes" onclick="return !(window.FH && FH.open({ shortname: 'diamondspringsranch', fallback: 'simple', fullItems: 'yes', view: 'items' }));" class="btn btn-gold">Book a Visit</a>
      <a href="tel:${CLIENT.phoneRaw}" class="btn btn-light">Call Us</a>
    </div>
  </div>
  <div class="v2-hero-scroll-hint"><span>Scroll</span><div class="v2-scroll-line"></div></div>
</section>
<section class="dsr-section">
  <div class="dsr-container">
    <div class="dsr-two-col">
      <div>
        <span class="dsr-section-label">Book a Visit</span>
        <h2 style="font-family:var(--font-serif);font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:300;margin-bottom:16px;">Reserve your ranch <em>experience.</em></h2>
        <p class="dsr-prose" style="margin-bottom:28px;">Fill out the form and we'll be in touch within one business day. Or call us directly at <a href="tel:${CLIENT.phoneRaw}" style="color:var(--gold);">${CLIENT.phone}</a>.</p>
        ${formHtml('contact-form')}
      </div>
      <div>
        <div class="dsr-sidebar-card">
          <h3>Get in Touch</h3>
          <ul class="dsr-sidebar-contact" style="list-style:none;padding:0;">
            <li><span>&#128222;</span><div><strong style="display:block;font-size:0.7rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--gold-lt);margin-bottom:3px;">Phone</strong><a href="tel:${CLIENT.phoneRaw}" style="color:rgba(255,255,255,0.8);">${CLIENT.phone}</a></div></li>
            <li><span>&#9993;</span><div><strong style="display:block;font-size:0.7rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--gold-lt);margin-bottom:3px;">Email</strong><a href="mailto:${CLIENT.email}" style="color:rgba(255,255,255,0.8);">${CLIENT.email}</a></div></li>
            <li><span>&#128205;</span><div><strong style="display:block;font-size:0.7rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--gold-lt);margin-bottom:3px;">Address</strong><a href="https://maps.google.com/?q=1734+SE+96th+St,+Sedgwick,+KS+67135" target="_blank" rel="noopener" style="color:rgba(255,255,255,0.8);text-decoration:underline;">${CLIENT.address}</a></div></li>
            <li><span>&#128336;</span><div><strong style="display:block;font-size:0.7rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--gold-lt);margin-bottom:3px;">Hours</strong><span style="color:rgba(255,255,255,0.8);">${CLIENT.hours}</span></div></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
${CTA}`;
  writeFile('contact/index.html', wrap(meta, body));
  console.log('\u2713 contact');
}

// â”€â”€ About page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function buildAboutPage() {
  const meta = buildPageMeta({
    title: `About Diamond Springs Ranch | Our Story | Sedgwick, KS`,
    description: CLIENT.aboutDescription || `Learn the story behind Diamond Springs Ranch â€” a family-owned working ranch 15 minutes north of Wichita, KS. Meet owner Logan Schrag.`,
    canonical: '/about/',
    ogImage: '/images/photo-about.jpg',
  });
  const body = `
<style>.v2-hero-bg { background-image: url('/images/DSR-Our-Story-Cover.jpg') !important; background-position: center 20% !important; }</style>
<section class="v2-hero">
  <div class="v2-hero-bg"></div>
  <div class="v2-hero-overlay"></div>
  <div class="v2-hero-content">
    <div class="v2-hero-eyebrow">
      <span class="v2-eyebrow-line"></span>
      <span class="overline">Sedgwick, Kansas &bull; 15 Minutes from Wichita</span>
    </div>
    <h1>A ranch built on <em>faith, family,</em> and legacy.</h1>
    <p class="v2-hero-sub">${CLIENT.aboutTagline || 'A real working ranch. An authentic Western experience. 15 minutes north of Wichita.'}</p>
    <div class="v2-hero-btns">
      <a href="https://fareharbor.com/embeds/book/diamondspringsranch/?full-items=yes" onclick="return !(window.FH && FH.open({ shortname: 'diamondspringsranch', fallback: 'simple', fullItems: 'yes', view: 'items' }));" class="btn btn-gold">Book a Visit</a>
      <a href="/contact/" class="btn btn-light">Contact Us</a>
    </div>
  </div>
  <div class="v2-hero-scroll-hint"><span>Scroll</span><div class="v2-scroll-line"></div></div>
</section>
<section class="dsr-section">
  <div class="dsr-container">
    <div class="dsr-two-col">
      <div class="dsr-prose">
        ${CLIENT.aboutBody || '<p>' + CLIENT.description + '</p>'}
      </div>
      <div>
        <img src="/images/IMG_1004.JPG" alt="Diamond Springs Ranch" style="width:100%;object-fit:cover;height:480px;">
      </div>
    </div>
  </div>
</section>
${buildV2Reviews()}
${CTA}`;
  writeFile('about/index.html', wrap(meta, body));
  console.log('\u2713 about');
}

// â”€â”€ Services overview â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function buildServicesPage() {
  const meta = buildPageMeta({
    title: 'Ranch Experiences | Diamond Springs Ranch | Sedgwick, KS',
    description: `Explore all experiences at Diamond Springs Ranch: ${SERVICES.map(s => s.name).join(', ')}. 15 minutes north of Wichita, KS.`,
    canonical: '/services/',
  });
  const tiles = SERVICES.map(s => {
    const bg = `/images/photo-${s.slug}.jpg`;
    return `
    <a href="/${s.slug}/" class="dsr-svc-tile">
      <div class="dsr-svc-tile-bg" style="background-image:url('${bg}');"></div>
      <div class="dsr-svc-tile-overlay"></div>
      <div class="dsr-svc-tile-body">
        <div class="dsr-svc-tile-name">${s.name}</div>
        <div class="dsr-svc-tile-desc">${s.shortDesc}</div>
        <span class="dsr-svc-tile-cta">Learn More &rarr;</span>
      </div>
    </a>`;
  }).join('');
  const body = `
<section class="v2-hero">
  <div class="v2-hero-bg"></div>
  <div class="v2-hero-overlay"></div>
  <div class="v2-hero-content">
    <div class="v2-hero-eyebrow">
      <span class="v2-eyebrow-line"></span>
      <span class="overline">Sedgwick, Kansas &bull; 15 Minutes from Wichita</span>
    </div>
    <h1>Choose your <em>adventure.</em></h1>
    <p class="v2-hero-sub">From trail rides to overnight stays, there is something for every kind of guest at Diamond Springs Ranch.</p>
    <div class="v2-hero-btns">
      <a href="https://fareharbor.com/embeds/book/diamondspringsranch/?full-items=yes" onclick="return !(window.FH && FH.open({ shortname: 'diamondspringsranch', fallback: 'simple', fullItems: 'yes', view: 'items' }));" class="btn btn-gold">Book a Visit</a>
      <a href="/contact/" class="btn btn-light">Get in Touch</a>
    </div>
  </div>
  <div class="v2-hero-scroll-hint"><span>Scroll</span><div class="v2-scroll-line"></div></div>
</section>
<section class="dsr-section-alt">
  <div class="dsr-container">
    <div class="dsr-svc-grid">
      ${tiles}
    </div>
  </div>
</section>
${CTA}`;
  writeFile('services/index.html', wrap(meta, body));
  console.log('\u2713 services overview');
}

function buildPhotoGallery(photos) {
  if (!photos || !photos.length) return '';
  const items = photos.map(p => `
    <div class="dsr-gallery-item">
      <img src="/images/client-photos/${p.file}" alt="${p.alt}" loading="lazy">
    </div>`).join('');
  return `
<section style="background:var(--kg-cream);padding:60px 0;">
  <div class="container">
    <div class="section-title gsap-fade">
      <span class="section-label">Photo Gallery</span>
      <h2>See It for Yourself</h2>
    </div>
    <div class="dsr-photo-grid">
      ${items}
    </div>
  </div>
</section>
<style>
  .dsr-photo-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  @media (max-width: 768px) {
    .dsr-photo-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 480px) {
    .dsr-photo-grid { grid-template-columns: 1fr; }
  }
  .dsr-gallery-item {
    border-radius: 8px;
    overflow: hidden;
    aspect-ratio: 4/3;
  }
  .dsr-gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }
  .dsr-gallery-item:hover img { transform: scale(1.04); }
</style>`;
}

function buildServicePage(svc) {
  const heroBg = svc.heroBg || (svc.heroPhoto ? `/images/client-photos/${svc.heroPhoto}` : `/images/photo-${svc.slug}.jpg`);
  const meta = buildPageMeta({
    title: `${svc.name} in ${CLIENT.primaryCity}, ${CLIENT.state} | ${CLIENT.name}`,
    description: svc.metaDescription || `${svc.shortDesc} â€” ${CLIENT.name} in ${CLIENT.primaryCity}, ${CLIENT.state}.`,
    canonical: `/${svc.slug}/`,
    ogImage: svc.heroPhoto ? `/images/client-photos/${svc.heroPhoto}` : `/images/photo-${svc.slug}.jpg`,
  });
  const faqs = svc.faqs || SERVICE_FAQS[svc.slug] || [];
  const svcSchema = buildServiceSchema(svc, faqs);
  const cityLinks = CITIES.map(c =>
    `<a href="/${c.slug}/" class="dsr-link-chip">${c.name}</a>`
  ).join('');

  const bookingSidebar = svc.lodging ? `
    <h3>Reserve Your Stay</h3>
    <p>Check availability and book your overnight at Diamond Springs Ranch.</p>
    <a href="${svc.lodgifyUrl}" target="_blank" rel="noopener" class="btn btn-gold" style="display:block;text-align:center;margin-bottom:12px;">Check Availability &rarr;</a>
    <p style="font-size:0.8rem;color:rgba(255,255,255,0.5);text-align:center;">Secure booking powered by FareHarbor.</p>` : `
    <h3>Book This Experience</h3>
    <p>Questions about ${svc.name.toLowerCase()}? We'll get you scheduled.</p>
    <a href="https://fareharbor.com/embeds/book/diamondspringsranch/?full-items=yes" onclick="return !(window.FH && FH.open({ shortname: 'diamondspringsranch', fallback: 'simple', fullItems: 'yes', view: 'items' }));" class="btn btn-gold" style="display:block;text-align:center;margin-bottom:16px;">Book Online &rarr;</a>
    <a href="tel:${CLIENT.phoneRaw}" class="btn btn-light" style="display:block;text-align:center;margin-bottom:16px;">${CLIENT.phone}</a>
    <a href="mailto:${CLIENT.email}" style="display:block;text-align:center;font-size:0.78rem;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.45);">${CLIENT.email}</a>`;

  const body = `
${svcSchema}
<section class="v2-hero">
  <div class="v2-hero-bg" style="background-image:url('${heroBg}');"></div>
  <div class="v2-hero-overlay"></div>
  <div class="v2-hero-content">
    <div class="v2-hero-eyebrow">
      <span class="v2-eyebrow-line"></span>
      <span class="overline">Diamond Springs Ranch &bull; Sedgwick, Kansas</span>
    </div>
    <h1>${svc.heroHeading || svc.name}</h1>
    <p class="v2-hero-sub">${svc.shortDesc}</p>
    <div class="v2-hero-btns">
      <a href="https://fareharbor.com/embeds/book/diamondspringsranch/?full-items=yes" onclick="return !(window.FH && FH.open({ shortname: 'diamondspringsranch', fallback: 'simple', fullItems: 'yes', view: 'items' }));" class="btn btn-gold">${svc.ctaLabel || 'Book Now'}</a>
      <a href="/contact/" class="btn btn-light">Ask a Question</a>
    </div>
  </div>
  <div class="v2-hero-scroll-hint"><span>Scroll</span><div class="v2-scroll-line"></div></div>
</section>
<section class="dsr-section">
  <div class="dsr-container">
    <div class="dsr-two-col">
      <div class="dsr-prose">
        ${svc.body || '<p>' + svc.shortDesc + '</p>'}
      </div>
      <div>
        <div class="dsr-sidebar-card">
          ${bookingSidebar}
        </div>
      </div>
    </div>
  </div>
</section>
${buildV2Reviews()}
${faqs.length ? `
<section class="dsr-section-alt">
  <div class="dsr-container">
    <span class="dsr-section-label">Common Questions</span>
    <h2 style="font-family:var(--font-serif);font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:300;margin-bottom:28px;">Frequently asked <em>questions.</em></h2>
    <div style="border-top:1px solid rgba(0,0,0,0.1);">
      ${buildFaqHtml(faqs)}
    </div>
  </div>
</section>` : ''}
<section class="dsr-section">
  <div class="dsr-container">
    <span class="dsr-section-label">We Serve</span>
    <h2 style="font-family:var(--font-serif);font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:300;margin-bottom:24px;">Guests from across <em>the region.</em></h2>
    <div class="dsr-link-grid">${cityLinks}</div>
  </div>
</section>
${CTA}`;
  writeFile(`${svc.slug}/index.html`, wrap(meta, body));
}

function buildServicePages() {
  SERVICES.forEach(svc => buildServicePage(svc));
  console.log(`âœ“ ${SERVICES.length} service pages`);
}

// â”€â”€ City pages (1 per city) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function buildCityPage(city) {
  const meta = buildPageMeta({
    title: `Ranch Experiences near ${city.name}, ${CLIENT.state} | ${CLIENT.name}`,
    description: city.metaDescription || `Diamond Springs Ranch welcomes guests from ${city.name}, ${CLIENT.state}. ${city.intro}`,
    canonical: `/${city.slug}/`,
  });
  const cityFaqs = city.faqs || [];
  const citySchema = buildCitySchema(city, cityFaqs);
  const serviceLinks = SERVICES.map(s =>
    `<a href="/${s.slug}/" class="dsr-link-chip">${s.name}</a>`
  ).join('');
  const cityHeroPhoto = `/images/photo-${city.slug}.jpg`;
  const body = `
${citySchema}
<section class="v2-hero">
  <div class="v2-hero-bg"></div>
  <div class="v2-hero-overlay"></div>
  <div class="v2-hero-content">
    <div class="v2-hero-eyebrow">
      <span class="v2-eyebrow-line"></span>
      <span class="overline">Serving ${city.name}, ${CLIENT.state}</span>
    </div>
    <h1>Ranch Experiences near <em>${city.name}.</em></h1>
    <p class="v2-hero-sub">${city.intro}</p>
    <div class="v2-hero-btns">
      <a href="https://fareharbor.com/embeds/book/diamondspringsranch/?full-items=yes" onclick="return !(window.FH && FH.open({ shortname: 'diamondspringsranch', fallback: 'simple', fullItems: 'yes', view: 'items' }));" class="btn btn-gold">Book a Trail Ride</a>
      <a href="/contact/" class="btn btn-light">Get Directions</a>
    </div>
  </div>
  <div class="v2-hero-scroll-hint"><span>Scroll</span><div class="v2-scroll-line"></div></div>
</section>
<section class="dsr-section">
  <div class="dsr-container">
    <div class="dsr-two-col">
      <div class="dsr-prose">
        ${city.body || '<p>' + city.intro + '</p>'}
        ${city.localContext ? `<blockquote style="border-left:3px solid var(--gold);padding:14px 0 14px 22px;font-family:var(--font-serif);font-size:1.1rem;font-style:italic;color:var(--charcoal);margin:24px 0;">${city.localContext}</blockquote>` : ''}
      </div>
      <div>
        <div class="dsr-sidebar-card">
          <h3>Book a Ranch Experience</h3>
          <p>All activities by reservation. Call or book online.</p>
          <a href="https://fareharbor.com/embeds/book/diamondspringsranch/?full-items=yes" onclick="return !(window.FH && FH.open({ shortname: 'diamondspringsranch', fallback: 'simple', fullItems: 'yes', view: 'items' }));" class="btn btn-gold" style="display:block;text-align:center;margin-bottom:16px;">Book Online &rarr;</a>
          <a href="tel:${CLIENT.phoneRaw}" class="btn btn-light" style="display:block;text-align:center;">${CLIENT.phone}</a>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="dsr-section-dark">
  <div class="dsr-container">
    <span class="dsr-section-label">Our Experiences</span>
    <h2 style="font-family:var(--font-serif);font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:300;color:var(--white);margin-bottom:24px;">What ${city.name} guests <em>love most.</em></h2>
    <div class="dsr-link-grid">${serviceLinks}</div>
  </div>
</section>
${buildV2Reviews()}
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
    title: `Service Areas | ${CLIENT.name} â€” Ranch Experiences Near Wichita, KS`,
    description: `Diamond Springs Ranch serves guests from ${CITIES.map(c => c.name).join(', ')} and surrounding communities.`,
    canonical: '/service-areas/',
  });
  const areaCards = CITIES.map(c => `
    <a href="/${c.slug}/" class="dsr-area-card">
      <h4>${c.name}</h4>
      <p>${c.county ? c.county + ' County' : CLIENT.state}</p>
    </a>`).join('');
  const body = `
<section class="v2-hero">
  <div class="v2-hero-bg"></div>
  <div class="v2-hero-overlay"></div>
  <div class="v2-hero-content">
    <div class="v2-hero-eyebrow">
      <span class="v2-eyebrow-line"></span>
      <span class="overline">Sedgwick, Kansas &bull; 15 Minutes from Wichita</span>
    </div>
    <h1>Close enough to <em>get away.</em></h1>
    <p class="v2-hero-sub">Diamond Springs Ranch welcomes guests from across the Wichita metro and beyond. Just 15 minutes north of downtown.</p>
    <div class="v2-hero-btns">
      <a href="https://fareharbor.com/embeds/book/diamondspringsranch/?full-items=yes" onclick="return !(window.FH && FH.open({ shortname: 'diamondspringsranch', fallback: 'simple', fullItems: 'yes', view: 'items' }));" class="btn btn-gold">Book a Visit</a>
      <a href="/contact/" class="btn btn-light">Get Directions</a>
    </div>
  </div>
  <div class="v2-hero-scroll-hint"><span>Scroll</span><div class="v2-scroll-line"></div></div>
</section>
<section class="dsr-section-dark">
  <div class="dsr-container">
    <div class="dsr-area-grid">
      ${areaCards}
    </div>
  </div>
</section>
${CTA}`;
  writeFile('service-areas/index.html', wrap(meta, body));
  console.log('\u2713 service-areas overview');
}

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
  copyDir(path.join(__dirname, 'v2'),          path.join(DIST, 'v2'));
  // v2.css lives at root, copy to dist root for homepage
  const v2cssSrc = path.join(__dirname, 'v2.css');
  if (fs.existsSync(v2cssSrc)) fs.copyFileSync(v2cssSrc, path.join(DIST, 'v2.css'));
  // v2 homepage replaces the generated root index.html
  const v2HomeSrc = path.join(__dirname, 'index.html');
  if (fs.existsSync(v2HomeSrc)) fs.copyFileSync(v2HomeSrc, path.join(DIST, 'index.html'));
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
