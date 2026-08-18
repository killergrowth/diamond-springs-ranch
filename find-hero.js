const fs = require('fs');
const path = require('path');
const c = fs.readFileSync(path.join(__dirname, 'build.js'), 'utf8');
// Find where page bodies are built - look for background-image in a template literal
const i = c.indexOf('background-image');
console.log('background-image at:', i);
if (i > -1) console.log(c.slice(Math.max(0,i-200), i+500));
console.log('\n\n---');
// Also find buildContactPage or buildAboutPage
const j = c.indexOf('buildContactPage');
console.log('buildContactPage at:', j);
if (j > -1) console.log(c.slice(j, j+800));
