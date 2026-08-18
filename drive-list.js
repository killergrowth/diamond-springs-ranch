const fs = require('fs');
const https = require('https');
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

function driveGet(token, path, cb) {
  const req = https.request({hostname:'www.googleapis.com',path,headers:{Authorization:'Bearer '+token}}, res=>{
    let d=''; res.on('data',c=>d+=c); res.on('end',()=>cb(JSON.parse(d)));
  });
  req.end();
}

getToken(token => {
  // List all folders
  driveGet(token, "/drive/v3/files?q="+encodeURIComponent("mimeType='application/vnd.google-apps.folder' and trashed=false")+"&fields=files(id,name,parents)&pageSize=50", data => {
    console.log('=== ALL FOLDERS ===');
    console.log(JSON.stringify(data, null, 2));
  });
});
