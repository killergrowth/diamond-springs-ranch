const fs = require('fs');
const path = require('path');
const base = 'C:/Users/KillerGrowth/.openclaw/workspace/sites/diamond-springs-ranch/dist';
const dirs = [
  '', 'about', 'contact', 'services', 'service-areas',
  'guided-horseback-rides', 'dinner-date-experience', 'highland-cattle-experience',
  'luxury-treehouse-stay', 'covered-wagon-stay', 'private-events',
  'horse-day-camp', 'riding-lessons', 'rusty-saddle-bar',
  'wichita-ks', 'derby-ks', 'haysville-ks', 'andover-ks', 'newton-ks'
];
dirs.forEach(d => {
  const f = path.join(base, d, 'index.html');
  if (!fs.existsSync(f)) { console.log((d || 'home') + ': MISSING'); return; }
  const c = fs.readFileSync(f, 'utf8');
  const m = c.match(/background-image:\s*url\(["']([^"')]+)["']\)/);
  console.log((d || 'home') + ': ' + (m ? m[1] : 'NO BACKGROUND'));
});
