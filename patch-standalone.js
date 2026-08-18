'use strict';
/**
 * patch-standalone.js v2
 * Fully rewrites horse-day-camp, riding-lessons, rusty-saddle-bar
 * to use the v2 design system — nav, hero, footer all from the build reference.
 */
const fs = require('fs');
const path = require('path');
const dist = path.join(__dirname, 'dist');

// Pull v2 nav + footer from a freshly built reference page
const ref = fs.readFileSync(path.join(dist, 'guided-horseback-rides', 'index.html'), 'utf8');

// V2 Nav: from <body> up to and including the closing </nav> of the mobile nav
const bodyStart = ref.indexOf('<body>') + 6;
const mobileNavClose = ref.indexOf('</nav>', ref.indexOf('kg-mobile-nav')) + 6;
const V2_NAV = ref.substring(bodyStart, mobileNavClose).trim();

// V2 Footer: from <footer class="v2-footer"> to end of file (minus </body></html>)
const footerStart = ref.indexOf('<footer class="v2-footer">');
const V2_FOOTER = ref.substring(footerStart, ref.lastIndexOf('</body>')).trim();

// Shared head links (fonts, v2.css) — strip page-specific meta
const refHeadStart = ref.indexOf('<head>') + 6;
const refHeadEnd = ref.indexOf('</head>');
let refHead = ref.substring(refHeadStart, refHeadEnd);
const sharedStart = refHead.indexOf('<link rel="icon"');
const V2_SHARED_HEAD = sharedStart > -1 ? refHead.substring(sharedStart) : refHead;

// Subpage CSS overrides
const SUBPAGE_STYLE = `<style>
  body { background: var(--cream); }
  .v2-nav { background: transparent; padding: 14px 56px; }
  .v2-nav.scrolled { background: rgba(26,21,16,0.97); }
  @media (max-width: 900px) { .v2-nav { padding: 12px 24px; } }
</style>`;

function makeHero(eyebrow, h1, sub, btn1Label, btn2Label, btn2Href) {
  return `<section class="v2-hero">
  <div class="v2-hero-bg"></div>
  <div class="v2-hero-overlay"></div>
  <div class="v2-hero-content">
    <div class="v2-hero-eyebrow">
      <span class="v2-eyebrow-line"></span>
      <span class="overline">${eyebrow}</span>
    </div>
    <h1>${h1}</h1>
    <p class="v2-hero-sub">${sub}</p>
    <div class="v2-hero-btns">
      <a href="https://fareharbor.com/embeds/book/diamondspringsranch/?full-items=yes" onclick="return !(window.FH && FH.open({ shortname: 'diamondspringsranch', fallback: 'simple', fullItems: 'yes', view: 'items' }));" class="btn btn-gold">${btn1Label}</a>
      <a href="${btn2Href}" class="btn btn-light">${btn2Label}</a>
    </div>
  </div>
  <div class="v2-hero-scroll-hint"><span>Scroll</span><div class="v2-scroll-line"></div></div>
</section>`;
}

const pages = [
  {
    slug: 'horse-day-camp',
    title: 'Horse Day Camp | Diamond Springs Ranch | Sedgwick, KS',
    description: 'Horse day camp near Wichita at Diamond Springs Ranch. Summer sessions for kids ages 9-14. Real horsemanship on a working ranch. Call (316) 303-6195.',
    canonical: 'https://diamondspringsranch.com/horse-day-camp/',
    hero: makeHero(
      'Diamond Springs Ranch &bull; Sedgwick, Kansas',
      'A week on the ranch they\'ll <em>never forget.</em>',
      'A full week of horses, ranch life, and memories that last a lifetime. Horse Day Camp is for kids who love horses and parents who want something real.',
      'Register for Camp', 'Contact Us', '/contact/'
    ),
  },
  {
    slug: 'riding-lessons',
    title: 'Horseback Riding Lessons | Diamond Springs Ranch | Sedgwick, KS',
    description: 'Horseback riding lessons near Wichita at Diamond Springs Ranch. Private and group lessons for all ages using Clinton Anderson\'s proven method. Call (316) 303-6195.',
    canonical: 'https://diamondspringsranch.com/riding-lessons/',
    hero: makeHero(
      'Diamond Springs Ranch &bull; Sedgwick, Kansas',
      'Learn to ride <em>the right way.</em>',
      'Private and group riding lessons for all ages. We use Clinton Anderson\'s Down Under Horsemanship method &mdash; safe, proven, and built on partnership.',
      'Book a Lesson', 'Ask a Question', '/contact/'
    ),
  },
  {
    slug: 'rusty-saddle-bar',
    title: 'Rusty Saddle Bar | Diamond Springs Ranch | Sedgwick, KS',
    description: 'The Rusty Saddle Bar at Diamond Springs Ranch. Cold drinks and great company on a real working Kansas ranch. Open during events and private gatherings.',
    canonical: 'https://diamondspringsranch.com/rusty-saddle-bar/',
    hero: makeHero(
      'Diamond Springs Ranch &bull; Sedgwick, Kansas',
      'Cold drinks. <em>Good company.</em> Real ranch.',
      'The Rusty Saddle Bar is your home base at Diamond Springs Ranch. Open during events and private gatherings.',
      'Book an Event', 'Contact Us', '/contact/'
    ),
  },
];

pages.forEach(({ slug, title, description, canonical, hero }) => {
  const filePath = path.join(dist, slug, 'index.html');
  if (!fs.existsSync(filePath)) { console.log(`  SKIP: ${slug} not found`); return; }

  let src = fs.readFileSync(filePath, 'utf8');

  // Extract body content between the old page hero/header and the old footer
  // Strategy: find the first <section> or <div class="container"> after <body>
  // and take everything until <footer class="kg-footer"> or end of main content

  // Find start of main body content — skip old nav/header junk
  // Look for first <section> or <main> that is actual page content
  let contentStart = -1;
  const candidates = ['<section', '<main', '<article', '<div class="dsr-section', '<div class="kg-section', '<div class="container"'];
  for (const tag of candidates) {
    const i = src.indexOf(tag);
    if (i > -1) { contentStart = i; break; }
  }

  // Find end of main content — before old footer or </body>
  let contentEnd = src.indexOf('<footer class="kg-footer">');
  if (contentEnd === -1) contentEnd = src.indexOf('<footer class="v2-footer">');
  if (contentEnd === -1) contentEnd = src.lastIndexOf('</body>');

  let bodyContent = contentStart > -1 && contentEnd > contentStart
    ? src.slice(contentStart, contentEnd).trim()
    : '';

  // Build the full page
  const page = `<!DOCTYPE html>
<html lang="en-US">
<head>
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
${V2_SHARED_HEAD}
${SUBPAGE_STYLE}
</head>
<body>
${V2_NAV}

${hero}

${bodyContent}

${V2_FOOTER}
</body>
</html>`;

  fs.writeFileSync(filePath, page, 'utf8');
  console.log(`✓ patched ${slug}`);
});

console.log('\n✅ standalone pages patched');
