/**
 * Cloudflare Pages Function — /submit-event
 * Diamond Springs Ranch — Event Inquiry Form
 *
 * Required CF env vars (same as submit.js):
 *   GMAIL_SERVICE_EMAIL  — Service account email
 *   GMAIL_PRIVATE_KEY    — Service account private key (literal \n for newlines)
 *   GMAIL_FROM           — Impersonated sender
 *   GMAIL_TO             — Lead notification recipient
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

function row(label, value, alt) {
  const bg = alt ? 'background:#f5f5f5;' : '';
  return value
    ? `<tr>
        <td style="padding:12px 16px;${bg}font-size:12px;color:#666;text-transform:uppercase;letter-spacing:1px;width:160px;vertical-align:top;">${label}</td>
        <td style="padding:12px 16px;${bg}font-size:15px;color:#111;">${value}</td>
       </tr>`
    : '';
}

function buildHtmlEmail(fields) {
  const {
    name, email, phone, city,
    event_name, event_type, event_type_other,
    preferred_dates, dates_flexible, attendees, duration,
    experiences, message,
  } = fields;

  const typeDisplay = event_type === 'Other' && event_type_other
    ? `Other — ${event_type_other}`
    : (event_type || 'Not specified');

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 0;">
    <tr><td align="center">
      <table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;">
        <tr><td style="background:#1a1510;padding:36px 40px;text-align:center;border-radius:8px 8px 0 0;">
          <div style="color:#C49A3C;font-size:11px;font-weight:700;letter-spacing:4px;text-transform:uppercase;margin-bottom:10px;">DIAMOND SPRINGS RANCH</div>
          <div style="color:#fff;font-size:22px;font-weight:700;">New Event Inquiry</div>
        </td></tr>
        <tr><td style="background:#fff;padding:36px 40px;">
          <p style="margin:0 0 24px;color:#333;font-size:15px;line-height:1.6;">A new event inquiry was submitted through the Diamond Springs Ranch website.</p>

          <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#C49A3C;font-weight:700;margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid #eee;">Contact Information</div>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:28px;">
            ${row('Name', `<strong>${name}</strong>`, true)}
            ${row('Email', email ? `<a href="mailto:${email}" style="color:#C49A3C;">${email}</a>` : 'Not provided', false)}
            ${row('Phone', phone ? `<a href="tel:${phone.replace(/\D/g,'')}" style="color:#C49A3C;">${phone}</a>` : 'Not provided', true)}
            ${row('City', city || 'Not specified', false)}
          </table>

          <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#C49A3C;font-weight:700;margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid #eee;">Event Details</div>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:28px;">
            ${row('Event Name', event_name || 'Not provided', true)}
            ${row('Event Type', typeDisplay, false)}
            ${row('Preferred Dates', preferred_dates || 'Not specified', true)}
            ${row('Flexible Dates?', dates_flexible || 'Not specified', false)}
            ${row('Est. Attendees', attendees || 'Not specified', true)}
            ${row('Duration', duration || 'Not specified', false)}
            ${row('Experiences', experiences || 'Not specified', true)}
          </table>

          ${message ? `
          <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#C49A3C;font-weight:700;margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid #eee;">Additional Notes</div>
          <div style="background:#f5f5f5;border-left:3px solid #C49A3C;padding:16px;font-size:15px;color:#333;line-height:1.7;margin-bottom:28px;">${message.replace(/\n/g,'<br>')}</div>
          ` : ''}

          ${phone ? `<div style="text-align:center;margin-top:8px;"><a href="tel:${phone.replace(/\D/g,'')}" style="display:inline-block;background:#C49A3C;color:#fff;font-size:15px;font-weight:700;padding:14px 36px;border-radius:4px;text-decoration:none;">Call ${phone}</a></div>` : ''}
        </td></tr>
        <tr><td style="background:#1a1510;padding:20px 40px;text-align:center;border-radius:0 0 8px 8px;">
          <p style="margin:0;color:rgba(255,255,255,0.5);font-size:12px;">Diamond Springs Ranch &bull; 1734 SE 96th St, Sedgwick, KS 67135</p>
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

export async function onRequestPost({ request, env }) {
  try {
    const form = await request.formData();

    const fields = {
      name:              form.get('name')             || '(no name)',
      email:             form.get('email')            || '',
      phone:             form.get('phone')            || '',
      city:              form.get('city')             || '',
      event_name:        form.get('event_name')       || '',
      event_type:        form.get('event_type')       || '',
      event_type_other:  form.get('event_type_other') || '',
      preferred_dates:   form.get('preferred_dates')  || '',
      dates_flexible:    form.get('dates_flexible')   || '',
      attendees:         form.get('attendees')        || '',
      duration:          form.get('duration')         || '',
      experiences:       form.get('experiences')      || '',
      message:           form.get('message')          || '',
    };

    const accessToken = await getGmailAccessToken(
      env.GMAIL_SERVICE_EMAIL,
      env.GMAIL_PRIVATE_KEY,
      env.GMAIL_FROM
    );

    const eventLabel = fields.event_type ? ` (${fields.event_type})` : '';
    const subject = `New Event Inquiry — Diamond Springs Ranch${eventLabel}`;
    const htmlBody = buildHtmlEmail(fields);

    const mimeLines = [
      `From: Diamond Springs Ranch <${env.GMAIL_FROM}>`,
      `To: ${env.GMAIL_TO}`,
      ...(fields.email ? [`Reply-To: ${fields.name} <${fields.email}>`] : []),
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
    console.error('submit-event error:', err.message);
    return new Response(JSON.stringify({ ok: false, error: err.message.slice(0, 200) }), {
      status: 500, headers: JSON_HEADERS,
    });
  }
}
