/**
 * download-photos.js
 * Downloads curated DSR photos from Google Drive into /images/
 */
const fs = require('fs');
const https = require('https');
const path = require('path');
const crypto = require('crypto');

const sa = JSON.parse(fs.readFileSync('C:/Users/KillerGrowth/.openclaw/credentials/google-service-account.json'));

function b64url(str) {
  return Buffer.from(str).toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,'');
}

function getToken(cb) {
  const now = Math.floor(Date.now()/1000);
  const header = b64url(JSON.stringify({alg:'RS256',typ:'JWT'}));
  const payload = b64url(JSON.stringify({
    iss: sa.client_email,
    sub: 'tylerbrickley@killergrowth.com',
    scope: 'https://www.googleapis.com/auth/drive',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now, exp: now+3600
  }));
  const signing = header+'.'+payload;
  const sig = crypto.createSign('RSA-SHA256').update(signing).sign(sa.private_key);
  const jwt = signing+'.'+sig.toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,'');
  const body = 'grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion='+jwt;
  const req = https.request({hostname:'oauth2.googleapis.com',path:'/token',method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded','Content-Length':Buffer.byteLength(body)}}, res => {
    let d=''; res.on('data',c=>d+=c); res.on('end',()=>cb(JSON.parse(d).access_token));
  });
  req.write(body); req.end();
}

// Photo assignments: local filename → Drive file ID
const downloads = [
  { local: 'photo-trail-rides.jpg',         id: '1Vf9F8OSRHADM-eEr4qWnqsEpC9G3CSD2' }, // IMG_2340 - trail ride guests
  { local: 'photo-dinner-date.jpg',          id: '1bUKbd0cMJOtofbrUt1hLjp7nCgCCCg7L' }, // IMG_3977 - evening ranch
  { local: 'photo-highland-cattle.jpg',      id: '1FuLZGoMHtjKfrwobVYs6mr_bV0YaJ0ZE' }, // IMG_4380 - cattle
  { local: 'photo-treehouse.jpg',            id: '17-GZyJRWzERSoNjrDxhBY5eTBEm4LmCj' }, // IMG_8119 - treehouse exterior
  { local: 'photo-covered-wagon.jpg',        id: '1KxJGj0mE_4WjJTYxpxcoYhAuQywV2q18' }, // Wagon-front-evening-1024x768
  { local: 'photo-private-events.jpg',       id: '1P5jMfmw5_0lEL06jIaPbOV3poVfgxP4x' }, // IMG_9451 - group
  { local: 'photo-about.jpg',               id: '1XpOTlC4IvXNJz-Gi1vYbiDZqnt2QVrbP' }, // IMG_3981 - personal
  { local: 'photo-contact.jpg',             id: '15La4Rz9axVPUi-SDwVn8YVCWFGW8cNzW' }, // IMG_2304 - landscape
  { local: 'photo-services.jpg',            id: '1jcgnTOOc0WM-zA59BqiZo8W3TgirpqHK' }, // IMG_8688
  { local: 'photo-service-areas.jpg',       id: '1FjIAGZ2iqVNmjOCc3a-XxzgFqWsyiLDs' }, // IMG_5331 - panoramic
  { local: 'photo-wichita-ks.jpg',          id: '1FywGlYnoJBPUaPoXULe1kCodbF-f8QLt' }, // IMG_7731
  { local: 'photo-derby-ks.jpg',            id: '1LiUmiloghbm7BuBp18_ia1eFaOB0Y4wp' }, // IMG_7692
  { local: 'photo-haysville-ks.jpg',        id: '1CJbeWWEeQshkRPNJgiI8X0P9foLHwEnW' }, // IMG_7657
  { local: 'photo-andover-ks.jpg',          id: '1wQrwNHSNd6YJXABafvwSIedMQkkGEfx_' }, // IMG_8302
  { local: 'photo-newton-ks.jpg',           id: '1eDAKxuM34_PWIZMuEhhkn_yq2ReALRAv' }, // IMG_8840
  { local: 'photo-horse-day-camp.jpg',      id: '1Qyyn4mP8WHSf1SA1rlJU7TP2HZlNb5Xf' }, // IMG_2052
  { local: 'photo-riding-lessons.jpg',      id: '1S5dgd0pG11AuBVItti9jOxMBoxgMO4kb' }, // IMG_2637
  { local: 'photo-rusty-saddle-bar.jpg',    id: '1EV7ejtZu14svOn9QSdv_gWxusz74P6Zm' }, // IMG_9081
];

const IMAGES_DIR = path.join(__dirname, 'images');

function downloadFile(token, fileId, destPath) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'www.googleapis.com',
      path: `/drive/v3/files/${fileId}?alt=media`,
      headers: { Authorization: 'Bearer ' + token }
    }, res => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        // Follow redirect
        const url = new URL(res.headers.location);
        const req2 = https.request({ hostname: url.hostname, path: url.pathname + url.search, headers: { Authorization: 'Bearer ' + token } }, res2 => {
          const ws = fs.createWriteStream(destPath);
          res2.pipe(ws);
          ws.on('finish', () => { console.log('  OK: ' + path.basename(destPath)); resolve(); });
          ws.on('error', reject);
        });
        req2.on('error', reject);
        req2.end();
      } else if (res.statusCode === 200) {
        const ws = fs.createWriteStream(destPath);
        res.pipe(ws);
        ws.on('finish', () => { console.log('  OK: ' + path.basename(destPath)); resolve(); });
        ws.on('error', reject);
      } else {
        let d = ''; res.on('data', c => d += c);
        res.on('end', () => reject(new Error(`HTTP ${res.statusCode}: ${d.substring(0,200)}`)));
      }
    });
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  const token = await new Promise(resolve => getToken(resolve));
  console.log('Token obtained. Downloading photos...');
  for (const { local, id } of downloads) {
    const dest = path.join(IMAGES_DIR, local);
    process.stdout.write(`Downloading ${local}...`);
    try {
      await downloadFile(token, id, dest);
    } catch (e) {
      console.error(`\n  FAIL: ${e.message}`);
    }
  }
  console.log('\nAll downloads complete.');
}

main().catch(console.error);
