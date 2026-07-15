/**
 * scaffold-site.js — KillerGrowth PKG002 Site Initializer
 *
 * Copies the pkg002-template into a new site directory and replaces
 * all {{TOKEN}} placeholders using the client's build-payload.json.
 *
 * Usage (run from workspace root):
 *   node tools/automated-build-pipeline/pkg002-template/scaffold-site.js <client-slug>
 *
 * Example:
 *   node tools/automated-build-pipeline/pkg002-template/scaffold-site.js drip-happens-plumbing
 *
 * Expects:  sites/<client-slug>/build-payload.json  (from onboarding form)
 * Also run: node tools/automated-build-pipeline/scaffold-build-data.js  (from site root)
 */

'use strict';
const fs   = require('fs');
const path = require('path');

const slug = process.argv[2];
if (!slug) { console.error('Usage: node scaffold-site.js <client-slug>'); process.exit(1); }

const TEMPLATE_DIR = __dirname;
const SITES_DIR    = path.join(__dirname, '..', '..', '..', 'sites');
const SITE_DIR     = path.join(SITES_DIR, slug);

if (!fs.existsSync(SITE_DIR)) {
  console.error(`Site directory not found: ${SITE_DIR}`);
  console.error(`Create it and add build-payload.json first.`);
  process.exit(1);
}

const payloadPath = path.join(SITE_DIR, 'build-payload.json');
if (!fs.existsSync(payloadPath)) {
  console.error(`Missing: ${payloadPath}`);
  process.exit(1);
}

const payload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'));

// Build token map from payload
const tokens = {
  '{{CLIENT_SLUG}}':           slug,
  '{{CLIENT_NAME}}':           payload.businessName    || '',
  '{{CLIENT_PHONE}}':          payload.phone           || '',
  '{{CLIENT_PHONE_RAW}}':      (payload.phone || '').replace(/\D/g, ''),
  '{{CLIENT_EMAIL}}':          payload.email           || '',
  '{{CLIENT_ADDRESS}}':        payload.address         || '',
  '{{CLIENT_CITY}}':           payload.primaryCity     || '',
  '{{CLIENT_STATE}}':          payload.state           || '',
  '{{CLIENT_HOURS}}':          payload.hours           || 'Mon–Fri 8am–5pm',
  '{{CLIENT_YEAR_FOUNDED}}':   payload.yearFounded     || new Date().getFullYear(),
  '{{CLIENT_DESCRIPTION}}':    payload.shortDescription || '',
  '{{CLIENT_EMERGENCY_BAR}}':  payload.emergencyBar    || `📞 Call Us Today — ${payload.phone || ''}`,
  '{{CLIENT_PRIMARY_COLOR}}':  payload.primaryColor    || '#1a56db',
  '{{CLIENT_PRIMARY_DARK}}':   payload.primaryDark     || '#1347c0',
  '{{CLIENT_SECONDARY_COLOR}}': payload.secondaryColor || '#1a1a2e',
  '{{CLIENT_FONT_URL}}':       payload.fontUrl         || 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
  '{{CLIENT_FONT_FAMILY}}':    payload.fontFamily      || "'Inter', sans-serif",
  '{{CF_TURNSTILE_SITE_KEY}}': payload.turnstileSiteKey || '0x4AAAAAAA',
  '{{NOTIFY_EMAIL}}':          payload.notifyEmail     || payload.email || '',
};

// Files to copy and token-replace
const TEXT_EXTS = new Set(['.js','.json','.html','.css','.md','.txt','.toml','.gitignore']);
const SKIP_FILES = new Set(['node_modules', '.wrangler', 'dist', 'build-payload.json', '_build-data.js']);

function applyTokens(str) {
  return Object.entries(tokens).reduce((s, [k, v]) => s.split(k).join(v), str);
}

function copyTemplate(srcDir, dstDir) {
  if (!fs.existsSync(dstDir)) fs.mkdirSync(dstDir, { recursive: true });
  fs.readdirSync(srcDir).forEach(name => {
    if (SKIP_FILES.has(name)) return;
    const src = path.join(srcDir, name);
    const dst = path.join(dstDir, name);
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
      copyTemplate(src, dst);
    } else {
      // Skip if file already exists in destination (don't overwrite client work)
      if (fs.existsSync(dst)) { console.log(`  skip (exists): ${dst.replace(SITE_DIR, '')}`); return; }
      const ext = path.extname(name).toLowerCase();
      if (TEXT_EXTS.has(ext)) {
        const content = fs.readFileSync(src, 'utf8');
        fs.writeFileSync(dst, applyTokens(content), 'utf8');
      } else {
        fs.copyFileSync(src, dst);
      }
      console.log(`  ✓ ${dst.replace(SITE_DIR + path.sep, '')}`);
    }
  });
}

console.log(`\n🚀 Scaffolding ${slug} from PKG002 template\n`);
copyTemplate(TEMPLATE_DIR, SITE_DIR);

// Create required directories
['images', 'blog-posts/images', 'dist'].forEach(d => {
  const dir = path.join(SITE_DIR, d);
  if (!fs.existsSync(dir)) { fs.mkdirSync(dir, { recursive: true }); console.log(`  ✓ mkdir ${d}`); }
});

console.log(`\n✅ Scaffold complete: sites/${slug}/`);
console.log(`\nNext steps:`);
console.log(`  1. cd sites/${slug}`);
console.log(`  2. node ../../tools/automated-build-pipeline/scaffold-build-data.js`);
console.log(`  3. Fill in all TODO blocks in _build-data.js`);
console.log(`  4. Generate images per images-manifest.json`);
console.log(`  5. node blog-build.js  (after blog-posts/ are written)`);
console.log(`  6. node build.js`);
console.log(`  7. node ../../tools/automated-build-pipeline/deploy-staging.js\n`);
