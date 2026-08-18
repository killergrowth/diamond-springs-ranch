const fs = require('fs'), path = require('path');
const c = fs.readFileSync(path.join(__dirname, '_build-data.js'), 'utf8');
const slugs = ['highland-cattle-experience', 'luxury-treehouse-stay', 'covered-wagon-stay', 'private-events', 'dinner-date-experience'];
for (const slug of slugs) {
  // find "slug:" near each
  let i = 0;
  while (true) {
    const pos = c.indexOf(slug, i);
    if (pos === -1) break;
    // check if preceded by slug: within 20 chars
    const pre = c.slice(Math.max(0, pos - 30), pos + slug.length + 5);
    if (pre.includes('slug')) {
      console.log(slug + ':');
      console.log(JSON.stringify(c.slice(pos - 10, pos + 120)));
      break;
    }
    i = pos + 1;
  }
}
