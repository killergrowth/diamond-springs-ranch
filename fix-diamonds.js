const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// U+FFFD replacement characters — fix contextually

// word[FFFD]word = em dash
content = content.replace(/(\w)\uFFFD(\w)/g, '$1&mdash;$2');
// word[FFFD][space] = em dash
content = content.replace(/(\w)\uFFFD\s/g, '$1&mdash; ');
// [space][FFFD]word = em dash
content = content.replace(/\s\uFFFD(\w)/g, ' &mdash;$1');
// [FFFD] after punctuation (reviews bullet "◆") — replace with &loz; (diamond)
content = content.replace(/\uFFFD(\s)/g, '&loz;$1');
// any remaining lone FFFD — remove
content = content.replace(/\uFFFD/g, '');

fs.writeFileSync('index.html', content, 'utf8');

// Verify none remain
const remaining = (content.match(/\uFFFD/g) || []).length;
console.log('Remaining FFFD chars:', remaining);

// Show changed lines
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('&mdash;') || l.includes('&loz;')) {
    if (!l.trim().startsWith('//') && !l.trim().startsWith('*')) {
      console.log((i+1) + ': ' + l.trim().substring(0, 120));
    }
  }
});
