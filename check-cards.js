const fs = require('fs');
const c = fs.readFileSync('C:/Users/KillerGrowth/.openclaw/workspace/sites/diamond-springs-ranch/index.html', 'utf8');
const lines = c.split('\n');
lines.forEach((l, i) => {
  if (l.includes('v2-exp-card"') || l.includes('v2-exp-card-cta')) console.log(i+1, l.trim());
});
