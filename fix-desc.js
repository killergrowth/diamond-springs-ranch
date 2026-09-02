const fs = require('fs');
const file = 'C:/Users/KillerGrowth/.openclaw/workspace/sites/diamond-springs-ranch/index.html';
let html = fs.readFileSync(file, 'utf8');
const oldText = "hands-on ranch experience for kids, couples, and families&mdash;and one you'll definitely want pictures of.";
const newText = "hands-on ranch experience for kids, couples, and families&mdash;and you'll definitely want pictures!";
if (html.includes(oldText)) {
  html = html.replace(oldText, newText);
  fs.writeFileSync(file, html, 'utf8');
  console.log('DONE');
} else {
  console.log('NO MATCH - searching for nearby text:');
  const idx = html.indexOf('definitely want pictures');
  if (idx > -1) console.log(html.substring(idx - 50, idx + 80));
}
