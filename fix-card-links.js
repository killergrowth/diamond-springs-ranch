const fs = require('fs');
const file = 'C:/Users/KillerGrowth/.openclaw/workspace/sites/diamond-springs-ranch/index.html';
let c = fs.readFileSync(file, 'utf8');

const FH_ONCLICK = `onclick="window.fhloaded?FH.open({shortname:'diamondspringsranch',view:'all'}):window.open('https://fareharbor.com/embeds/book/diamondspringsranch/?full-items=yes','_blank')"`;

const cards = [
  { img: 'trail-ride-sunset.jpg',         href: '/guided-horseback-rides/' },
  { img: 'card-dinner-date.png',          href: '/dinner-date-experience/' },
  { img: 'photo-highland-cow.jpg',        href: '/highland-cattle-experience/' },
  { img: 'riding-lessons-kid.webp',       href: '/riding-lessons/' },
  { img: 'photo-horse-day-camp-card.jpg', href: '/horse-day-camp/' },
  { img: 'hero-highland-cattle.png',      href: '/private-events/' },
];

// Find each card by its unique image filename and replace the onclick
for (const card of cards) {
  // Find the card div that contains this image
  const imgIdx = c.indexOf(card.img);
  if (imgIdx === -1) { console.log(`WARN image not found: ${card.img}`); continue; }

  // Walk backwards from imgIdx to find the start of the card div
  const cardDivStr = '<div class="v2-exp-card"';
  let cardStart = c.lastIndexOf(cardDivStr, imgIdx);
  if (cardStart === -1) { console.log(`WARN card div not found before: ${card.img}`); continue; }

  // Find the FH onclick in that card div (should be on the same line)
  const onclickIdx = c.indexOf(FH_ONCLICK, cardStart);
  if (onclickIdx === -1 || onclickIdx > imgIdx + 200) {
    console.log(`WARN fh onclick not found near: ${card.img}`);
    continue;
  }

  const newOnclick = `onclick="window.location.href='${card.href}'"`;
  c = c.slice(0, onclickIdx) + newOnclick + c.slice(onclickIdx + FH_ONCLICK.length);
  console.log(`Fixed card onclick: ${card.img} -> ${card.href}`);
}

fs.writeFileSync(file, c, 'utf8');
console.log('All done.');
