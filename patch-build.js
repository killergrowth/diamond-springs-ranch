'use strict';
const fs = require('fs');
const filePath = 'C:/Users/KillerGrowth/.openclaw/workspace/sites/diamond-springs-ranch/build.js';
let src = fs.readFileSync(filePath, 'utf8');

// ── 1. Add buildV2Reviews() after buildReviews() ───────────────────────────
const insertAfter = `  return { html: rv, aggregateRating, reviewItems: reviewData ? reviewData.reviews : null };
}`;
const v2ReviewsFn = `
// ── V2-style reviews for subpages ────────────────────────────────────────────
function buildV2Reviews() {
  const reviewsFile = require('path').join(__dirname, 'data', 'reviews.json');
  let reviews = [];
  try {
    const d = JSON.parse(fs.readFileSync(reviewsFile, 'utf8'));
    reviews = (d.reviews || []).slice(0, 3).map(r => ({ text: r.text, author: r.author }));
  } catch(e) { reviews = (REVIEWS || []).slice(0, 3); }
  const cards = reviews.map(r => \`
    <div class="dsr-review">
      <div class="dsr-review-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
      <div class="dsr-review-body">&ldquo;\${r.text}&rdquo;</div>
      <div class="dsr-review-name">\${r.author}</div>
    </div>\`).join('');
  return \`
<section class="dsr-reviews">
  <div class="dsr-container">
    <div class="dsr-reviews-head">
      <span class="overline">What Guests Are Saying</span>
      <h2>Real reviews. <em>Real experiences.</em></h2>
    </div>
    <div class="dsr-reviews-grid">\${cards}</div>
  </div>
</section>\`;
}`;

if (!src.includes('function buildV2Reviews')) {
  src = src.replace(insertAfter, insertAfter + v2ReviewsFn);
  console.log('✓ added buildV2Reviews()');
} else {
  console.log('  buildV2Reviews already present');
}

// ── 2. Replace buildServicesPage body ─────────────────────────────────────────
const oldServices = `function buildServicesPage() {
  const meta = buildPageMeta({
    title: \`\${CLIENT.tradeLabel} Services | \${CLIENT.name} — \${CLIENT.primaryCity}, \${CLIENT.state}\`,
    description: \`\${CLIENT.name} offers \${SERVICES.map(s => s.name).join(', ')} in \${CLIENT.primaryCity} and surrounding \${CLIENT.state} communities.\`,
    canonical: '/services/',
  });
  const cards = SERVICES.map(s => \`
    <a href="/\${s.slug}/" class="kg-card-link dsr-svc-card-link">
      <div class="kg-card dsr-svc-card">
        \${s.cardPhoto
          ? \`<div class="dsr-card-photo"><img src="/images/client-photos/\${s.cardPhoto}" alt="\${s.name}" loading="lazy"></div>\`
          : \`<div class="kg-card-icon">\${s.icon || '🔧'}</div>\`
        }
        <div class="dsr-card-body">
          <h3>\${s.name}</h3>
          <p>\${s.shortDesc}</p>
          <span>Learn more &rarr;</span>
        </div>
      </div>
    </a>\`).join('');
  const body = \`
<div class="kg-page-header" style="background-image:url('/images/photo-services.jpg');background-size:cover;background-position:center;">
  <div style="position:absolute;inset:0;background:rgba(30,20,10,0.58);"></div>
  <div class="container" style="position:relative;z-index:1;">
    <h1>\${CLIENT.tradeLabel} Services in \${CLIENT.primaryCity}, \${CLIENT.state}</h1>
    <p>\${CLIENT.name} provides professional \${CLIENT.tradeLabel.toLowerCase()} services across \${CLIENT.primaryCity} and the surrounding area.</p>
  </div>
</div>
<section>
  <div class="container">
    <div class="kg-grid \${gridClass(SERVICES.length)}">
      \${cards}
    </div>
  </div>
</section>
\${CTA}\`;
  writeFile('services/index.html', wrap(meta, body));
  console.log('✓ services overview');
}`;

const newServices = `function buildServicesPage() {
  const meta = buildPageMeta({
    title: 'Ranch Experiences | Diamond Springs Ranch | Sedgwick, KS',
    description: \`Explore all experiences at Diamond Springs Ranch: \${SERVICES.map(s => s.name).join(', ')}. 15 minutes north of Wichita, KS.\`,
    canonical: '/services/',
  });
  const tiles = SERVICES.map(s => {
    const bg = \`/images/photo-\${s.slug}.jpg\`;
    return \`
    <a href="/\${s.slug}/" class="dsr-svc-tile">
      <div class="dsr-svc-tile-bg" style="background-image:url('\${bg}');"></div>
      <div class="dsr-svc-tile-overlay"></div>
      <div class="dsr-svc-tile-body">
        <div class="dsr-svc-tile-name">\${s.name}</div>
        <div class="dsr-svc-tile-desc">\${s.shortDesc}</div>
        <span class="dsr-svc-tile-cta">Learn More &rarr;</span>
      </div>
    </a>\`;
  }).join('');
  const body = \`
<div class="dsr-page-hero" style="background-image:url('/images/photo-services.jpg');">
  <div class="dsr-page-hero-overlay"></div>
  <div class="dsr-page-hero-inner">
    <span class="overline">What We Offer</span>
    <h1>Ranch Experiences</h1>
    <p>From trail rides to overnight stays, find the perfect experience at Diamond Springs Ranch.</p>
  </div>
</div>
<section class="dsr-section-alt">
  <div class="dsr-container">
    <div class="dsr-svc-grid">
      \${tiles}
    </div>
  </div>
</section>
\${CTA}\`;
  writeFile('services/index.html', wrap(meta, body));
  console.log('\\u2713 services overview');
}`;

if (src.includes('function buildServicesPage')) {
  src = src.replace(oldServices, newServices);
  if (src.includes(newServices.substring(0, 80))) {
    console.log('✓ replaced buildServicesPage');
  } else {
    console.log('⚠ buildServicesPage replacement may have failed — trying indexOf patch');
    const idx1 = src.indexOf('function buildServicesPage');
    const idx2 = src.indexOf('\nfunction ', idx1 + 10);
    src = src.substring(0, idx1) + newServices + '\n' + src.substring(idx2);
    console.log('✓ buildServicesPage replaced via index cut');
  }
}

// ── 3. Replace buildServiceAreasPage body ─────────────────────────────────────
{
  const idx1 = src.indexOf('function buildServiceAreasPage');
  const idx2 = src.indexOf('\nfunction ', idx1 + 10);
  if (idx1 === -1) { console.log('⚠ buildServiceAreasPage not found'); }
  else {
    const newSA = `function buildServiceAreasPage() {
  const meta = buildPageMeta({
    title: \`Service Areas | \${CLIENT.name} — Ranch Experiences Near Wichita, KS\`,
    description: \`Diamond Springs Ranch serves guests from \${CITIES.map(c => c.name).join(', ')} and surrounding communities.\`,
    canonical: '/service-areas/',
  });
  const areaCards = CITIES.map(c => \`
    <a href="/\${c.slug}/" class="dsr-area-card">
      <h4>\${c.name}</h4>
      <p>\${c.county ? c.county + ' County' : CLIENT.state}</p>
    </a>\`).join('');
  const body = \`
<div class="dsr-page-hero" style="background-image:url('/images/photo-service-areas.jpg');background-position:center 40%;">
  <div class="dsr-page-hero-overlay"></div>
  <div class="dsr-page-hero-inner">
    <span class="overline">Where We Serve</span>
    <h1>Nearby Cities</h1>
    <p>Diamond Springs Ranch welcomes guests from across the Wichita metro and beyond.</p>
  </div>
</div>
<section class="dsr-section-dark">
  <div class="dsr-container">
    <div class="dsr-area-grid">
      \${areaCards}
    </div>
  </div>
</section>
\${CTA}\`;
  writeFile('service-areas/index.html', wrap(meta, body));
  console.log('\\u2713 service-areas overview');
}\n`;
    src = src.substring(0, idx1) + newSA + src.substring(idx2);
    console.log('✓ replaced buildServiceAreasPage');
  }
}

// ── 4. Replace service page body template ────────────────────────────────────
{
  const idx1 = src.indexOf('function buildServicePage(svc)');
  const idx2 = src.indexOf('\nfunction buildServicePages', idx1);
  if (idx1 === -1) { console.log('⚠ buildServicePage not found'); }
  else {
    const newSvcPage = `function buildServicePage(svc) {
  const heroBg = svc.heroBg || (svc.heroPhoto ? \`/images/client-photos/\${svc.heroPhoto}\` : \`/images/photo-\${svc.slug}.jpg\`);
  const meta = buildPageMeta({
    title: \`\${svc.name} in \${CLIENT.primaryCity}, \${CLIENT.state} | \${CLIENT.name}\`,
    description: svc.metaDescription || \`\${svc.shortDesc} — \${CLIENT.name} in \${CLIENT.primaryCity}, \${CLIENT.state}.\`,
    canonical: \`/\${svc.slug}/\`,
    ogImage: svc.heroPhoto ? \`/images/client-photos/\${svc.heroPhoto}\` : \`/images/photo-\${svc.slug}.jpg\`,
  });
  const faqs = svc.faqs || SERVICE_FAQS[svc.slug] || [];
  const svcSchema = buildServiceSchema(svc, faqs);
  const cityLinks = CITIES.map(c =>
    \`<a href="/\${c.slug}/" class="dsr-link-chip">\${c.name}</a>\`
  ).join('');

  const bookingSidebar = svc.lodging ? \`
    <h3>Reserve Your Stay</h3>
    <p>Check availability and book your overnight at Diamond Springs Ranch.</p>
    <a href="\${svc.lodgifyUrl}" target="_blank" rel="noopener" class="btn btn-gold" style="display:block;text-align:center;margin-bottom:12px;">Check Availability &rarr;</a>
    <p style="font-size:0.8rem;color:rgba(255,255,255,0.5);text-align:center;">Secure booking powered by FareHarbor.</p>\` : \`
    <h3>Book This Experience</h3>
    <p>Questions about \${svc.name.toLowerCase()}? We'll get you scheduled.</p>
    <a href="https://fareharbor.com/embeds/book/diamondspringsranch/?full-items=yes" onclick="return !(window.FH && FH.open({ shortname: 'diamondspringsranch', fallback: 'simple', fullItems: 'yes', view: 'items' }));" class="btn btn-gold" style="display:block;text-align:center;margin-bottom:16px;">Book Online &rarr;</a>
    <a href="tel:\${CLIENT.phoneRaw}" class="btn btn-light" style="display:block;text-align:center;margin-bottom:16px;">\${CLIENT.phone}</a>
    <a href="mailto:\${CLIENT.email}" style="display:block;text-align:center;font-size:0.78rem;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.45);">\${CLIENT.email}</a>\`;

  const body = \`
\${svcSchema}
<div class="dsr-page-hero" style="background-image:url('\${heroBg}');">
  <div class="dsr-page-hero-overlay"></div>
  <div class="dsr-page-hero-inner">
    <nav class="dsr-breadcrumb">
      <a href="/">Home</a> &rsaquo; <a href="/services/">Experiences</a> &rsaquo; <span>\${svc.name}</span>
    </nav>
    <span class="overline">Diamond Springs Ranch</span>
    <h1>\${svc.name}</h1>
    <p>\${svc.shortDesc}</p>
    \${svc.costRange ? \`<p style="margin-top:12px;font-size:0.85rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--gold-lt);">\${svc.costRange}</p>\` : ''}
  </div>
</div>
<section class="dsr-section">
  <div class="dsr-container">
    <div class="dsr-two-col">
      <div class="dsr-prose">
        \${svc.body || '<p>' + svc.shortDesc + '</p>'}
      </div>
      <div>
        <div class="dsr-sidebar-card">
          \${bookingSidebar}
        </div>
      </div>
    </div>
  </div>
</section>
\${buildV2Reviews()}
\${faqs.length ? \`
<section class="dsr-section-alt">
  <div class="dsr-container">
    <span class="dsr-section-label">Common Questions</span>
    <h2 style="font-family:var(--font-serif);font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:300;margin-bottom:28px;">Frequently asked <em>questions.</em></h2>
    <div style="border-top:1px solid rgba(0,0,0,0.1);">
      \${buildFaqHtml(faqs)}
    </div>
  </div>
</section>\` : ''}
<section class="dsr-section">
  <div class="dsr-container">
    <span class="dsr-section-label">We Serve</span>
    <h2 style="font-family:var(--font-serif);font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:300;margin-bottom:24px;">Guests from across <em>the region.</em></h2>
    <div class="dsr-link-grid">\${cityLinks}</div>
  </div>
</section>
\${CTA}\`;
  writeFile(\`\${svc.slug}/index.html\`, wrap(meta, body));
}\n`;
    src = src.substring(0, idx1) + newSvcPage + src.substring(idx2);
    console.log('✓ replaced buildServicePage');
  }
}

// ── 5. Replace city page body template ───────────────────────────────────────
{
  const idx1 = src.indexOf('function buildCityPage(city)');
  const idx2 = src.indexOf('\nfunction buildCityPages', idx1);
  if (idx1 === -1) { console.log('⚠ buildCityPage not found'); }
  else {
    const newCityPage = `function buildCityPage(city) {
  const meta = buildPageMeta({
    title: \`Ranch Experiences near \${city.name}, \${CLIENT.state} | \${CLIENT.name}\`,
    description: city.metaDescription || \`Diamond Springs Ranch welcomes guests from \${city.name}, \${CLIENT.state}. \${city.intro}\`,
    canonical: \`/\${city.slug}/\`,
  });
  const cityFaqs = city.faqs || [];
  const citySchema = buildCitySchema(city, cityFaqs);
  const serviceLinks = SERVICES.map(s =>
    \`<a href="/\${s.slug}/" class="dsr-link-chip">\${s.name}</a>\`
  ).join('');
  const cityHeroPhoto = \`/images/photo-\${city.slug}.jpg\`;
  const body = \`
\${citySchema}
<div class="dsr-page-hero" style="background-image:url('\${cityHeroPhoto}');">
  <div class="dsr-page-hero-overlay"></div>
  <div class="dsr-page-hero-inner">
    <nav class="dsr-breadcrumb">
      <a href="/">Home</a> &rsaquo; <a href="/service-areas/">Nearby Cities</a> &rsaquo; <span>\${city.name}, \${CLIENT.state}</span>
    </nav>
    <span class="overline">Serving \${city.name}</span>
    <h1>Ranch Experiences near \${city.name}, \${CLIENT.state}</h1>
    <p>\${city.intro}</p>
  </div>
</div>
<section class="dsr-section">
  <div class="dsr-container">
    <div class="dsr-two-col">
      <div class="dsr-prose">
        \${city.body || '<p>' + city.intro + '</p>'}
        \${city.localContext ? \`<blockquote style="border-left:3px solid var(--gold);padding:14px 0 14px 22px;font-family:var(--font-serif);font-size:1.1rem;font-style:italic;color:var(--charcoal);margin:24px 0;">\${city.localContext}</blockquote>\` : ''}
      </div>
      <div>
        <div class="dsr-sidebar-card">
          <h3>Book a Ranch Experience</h3>
          <p>All activities by reservation. Call or book online.</p>
          <a href="https://fareharbor.com/embeds/book/diamondspringsranch/?full-items=yes" onclick="return !(window.FH && FH.open({ shortname: 'diamondspringsranch', fallback: 'simple', fullItems: 'yes', view: 'items' }));" class="btn btn-gold" style="display:block;text-align:center;margin-bottom:16px;">Book Online &rarr;</a>
          <a href="tel:\${CLIENT.phoneRaw}" class="btn btn-light" style="display:block;text-align:center;">\${CLIENT.phone}</a>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="dsr-section-dark">
  <div class="dsr-container">
    <span class="dsr-section-label">Our Experiences</span>
    <h2 style="font-family:var(--font-serif);font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:300;color:var(--white);margin-bottom:24px;">What \${city.name} guests <em>love most.</em></h2>
    <div class="dsr-link-grid">\${serviceLinks}</div>
  </div>
</section>
\${buildV2Reviews()}
\${CTA}\`;
  writeFile(\`\${city.slug}/index.html\`, wrap(meta, body));
}\n`;
    src = src.substring(0, idx1) + newCityPage + src.substring(idx2);
    console.log('✓ replaced buildCityPage');
  }
}

// ── 6. Also remove old homepage builder (PKG001 version) since v2 index.html handles it
// The copyAssets() already copies the v2 index.html, so the generated one is fine to keep
// as a fallback — just make it v2-styled too.

fs.writeFileSync(filePath, src, 'utf8');
console.log('\n✅ patch-build.js complete — run `node build.js` next');
