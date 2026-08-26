/**
 * Cloudflare Pages Function — /submit
 * KillerGrowth PKG002 Template v1.0
 *
 * Returns JSON { ok: true } or { ok: false, error: string }
 * Sends branded HTML email via Gmail API (service account JWT auth).
 *
 * Required Cloudflare env vars (set in Pages → Settings → Environment Variables):
 *   TURNSTILE_SECRET     — Cloudflare Turnstile secret key
 *   GMAIL_SERVICE_EMAIL  — Service account email (openclaw-agent@killergrowth.iam.gserviceaccount.com)
 *   GMAIL_PRIVATE_KEY    — Service account private key (literal \n for newlines)
 *   GMAIL_FROM           — Impersonated sender (brickley@killergrowth.com)
 *   GMAIL_TO             — Lead notification recipient
 *   NOTIFY_EMAIL_CLIENT  — Optional: also CC the client
 *
 * Replace CLIENT_NAME, CLIENT_ADDRESS, CLIENT_PHONE below when scaffolding.
 */

// ── JWT / Gmail helpers ──────────────────────────────────────────────────────

function objToB64url(obj) {
  const json = JSON.stringify(obj);
  let binary = '';
  for (let i = 0; i < json.length; i++) binary += String.fromCharCode(json.charCodeAt(i) & 0xff);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function bufToB64url(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function getGmailAccessToken(serviceEmail, privateKeyPem, impersonateEmail) {
  const now = Math.floor(Date.now() / 1000);
  const headerB64 = objToB64url({ alg: 'RS256', typ: 'JWT' });
  const claimB64  = objToB64url({
    iss: serviceEmail, sub: impersonateEmail,
    scope: 'https://www.googleapis.com/auth/gmail.send',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now, exp: now + 3600,
  });
  const signingInput = `${headerB64}.${claimB64}`;
  const normalizedKey = privateKeyPem.replace(/\\n/g, '\n');
  const b64 = normalizedKey.replace(/-----[A-Z ]+-----/g, '').replace(/\s+/g, '');
  const decoded = atob(b64);
  const keyBuffer = new Uint8Array(decoded.length);
  for (let i = 0; i < decoded.length; i++) keyBuffer[i] = decoded.charCodeAt(i);
  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8', keyBuffer.buffer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false, ['sign']
  );
  const sigBytes = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5', cryptoKey, new TextEncoder().encode(signingInput)
  );
  const jwt = `${signingInput}.${bufToB64url(sigBytes)}`;
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${encodeURIComponent(jwt)}`,
  });
  const data = await tokenRes.json();
  if (!data.access_token) throw new Error('Token error ' + tokenRes.status + ': ' + JSON.stringify(data));
  return data.access_token;
}

// ── Email builder ────────────────────────────────────────────────────────────

function buildHtmlEmail(fields, clientName, clientAddress, clientPhone, primaryColor, secondaryColor) {
  const { name, email, phone, city, service, message } = fields;
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="background:${primaryColor};padding:36px 40px;text-align:center;border-radius:8px 8px 0 0;">
          <div style="color:#fff;font-size:22px;font-weight:700;letter-spacing:1px;">${clientName}</div>
          <div style="color:rgba(255,255,255,0.8);font-size:13px;font-weight:600;letter-spacing:3px;text-transform:uppercase;margin-top:8px;">New Experience Request</div>
        </td></tr>
        <tr><td style="background:#fff;padding:36px 40px;">
          <p style="margin:0 0 24px;color:#333;font-size:15px;line-height:1.6;">A new experience request was submitted through the ${clientName} website.</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            <tr><td style="padding:12px 16px;background:#f5f5f5;border-left:3px solid ${primaryColor};font-size:12px;color:#666;text-transform:uppercase;letter-spacing:1px;width:120px;">Name</td><td style="padding:12px 16px;background:#f5f5f5;font-size:15px;color:#111;font-weight:bold;">${name}</td></tr>
            <tr><td style="padding:12px 16px;font-size:12px;color:#666;text-transform:uppercase;letter-spacing:1px;">Email</td><td style="padding:12px 16px;font-size:15px;color:#111;">${email ? `<a href="mailto:${email}" style="color:${primaryColor};">${email}</a>` : 'Not provided'}</td></tr>
            <tr><td style="padding:12px 16px;background:#f5f5f5;font-size:12px;color:#666;text-transform:uppercase;letter-spacing:1px;">Phone</td><td style="padding:12px 16px;background:#f5f5f5;font-size:15px;color:#111;">${phone ? `<a href="tel:${phone.replace(/\D/g,'')}" style="color:${primaryColor};">${phone}</a>` : 'Not provided'}</td></tr>
            <tr><td style="padding:12px 16px;font-size:12px;color:#666;text-transform:uppercase;letter-spacing:1px;">City</td><td style="padding:12px 16px;font-size:15px;color:#111;">${city || 'Not specified'}</td></tr>
            ${service ? `<tr><td style="padding:12px 16px;background:#f5f5f5;font-size:12px;color:#666;text-transform:uppercase;letter-spacing:1px;">Service</td><td style="padding:12px 16px;background:#f5f5f5;font-size:15px;color:#111;font-weight:bold;">${service}</td></tr>` : ''}
          </table>
          ${message ? `<div style="margin-top:24px;"><div style="font-size:12px;color:#666;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Message</div><div style="background:#f5f5f5;border-left:3px solid ${primaryColor};padding:16px;font-size:15px;color:#333;line-height:1.7;">${message.replace(/\n/g,'<br>')}</div></div>` : ''}
          ${phone ? `<div style="margin-top:32px;text-align:center;"><a href="tel:${phone.replace(/\D/g,'')}" style="display:inline-block;background:${primaryColor};color:#fff;font-size:16px;font-weight:700;padding:14px 36px;border-radius:4px;text-decoration:none;">Call ${phone}</a></div>` : ''}
        </td></tr>
        <tr><td style="background:${secondaryColor};padding:24px 40px;text-align:center;border-radius:0 0 8px 8px;">
          <p style="margin:0;color:rgba(255,255,255,0.6);font-size:12px;">${clientName} &bull; ${clientAddress} &bull; <a href="tel:${clientPhone.replace(/\D/g,'')}" style="color:#fff;">${clientPhone}</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Handler ──────────────────────────────────────────────────────────────────

const JSON_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

const CLIENT_NAME      = 'Diamond Springs Ranch';
const CLIENT_ADDRESS   = '1734 SE 96th St, Sedgwick, KS 67135';
const CLIENT_PHONE     = '(316) 303-6195';
const PRIMARY_COLOR    = '#5c3d1e';
const SECONDARY_COLOR  = '#1a1209';

export async function onRequestPost({ request, env }) {
  try {
    const form    = await request.formData();
    const name    = form.get('name')    || '(no name)';
    const email   = form.get('email')   || '';
    const phone   = form.get('phone')   || '';
    const city    = form.get('city')    || '';
    const service = form.get('service') || '';
    const message = form.get('message') || '';

    // Turnstile skipped during testing — add back when going live

    const accessToken = await getGmailAccessToken(
      env.GMAIL_SERVICE_EMAIL,
      env.GMAIL_PRIVATE_KEY,
      env.GMAIL_FROM
    );

    const subject  = `New Experience Request - Diamond Springs Ranch${service ? ' (' + service + ')' : ''}`;
    const htmlBody = buildHtmlEmail(
      { name, email, phone, city, service, message },
      CLIENT_NAME, CLIENT_ADDRESS, CLIENT_PHONE, PRIMARY_COLOR, SECONDARY_COLOR
    );

    const mimeLines = [
      `From: ${CLIENT_NAME} <${env.GMAIL_FROM}>`,
      `To: ${env.GMAIL_TO}`,
      ...(email ? [`Reply-To: ${name} <${email}>`] : []),
      `Subject: ${subject}`,
      `MIME-Version: 1.0`,
      `Content-Type: text/html; charset=UTF-8`,
      '',
      htmlBody,
    ].join('\r\n');

    const emailBytes = new TextEncoder().encode(mimeLines);
    let emailBinary = '';
    for (let i = 0; i < emailBytes.length; i++) emailBinary += String.fromCharCode(emailBytes[i]);
    const encoded = btoa(emailBinary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    const sendRes = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/${encodeURIComponent(env.GMAIL_FROM)}/messages/send`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ raw: encoded }),
      }
    );

    if (!sendRes.ok) {
      const err = await sendRes.text();
      throw new Error('Gmail send ' + sendRes.status + ': ' + err.slice(0, 200));
    }

    return new Response(JSON.stringify({ ok: true }), { headers: JSON_HEADERS });

  } catch (err) {
    console.error('submit error:', err.message);
    return new Response(JSON.stringify({ ok: false, error: err.message.slice(0, 200) }), {
      status: 500, headers: JSON_HEADERS,
    });
  }
}
