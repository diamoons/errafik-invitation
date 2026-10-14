# Errafik — invitation page (31.10.2026) · notes for the dev team

A static folder: copy it as is to the server, e.g. `https://errafik.marqenti.tn/invitation/`.
No build step, no framework. Only **`config.js`** needs editing.

## What the page does
1. Opens on the invitation film, full screen, autoplay **muted** (browsers block sound autoplay). A button «🔊 شغّلو الصوت · Activer le son»
   restarts it with sound. Portrait screens get `media/invitation-9x16.mp4`, wide screens `media/invitation-16x9.mp4`
   (switches on rotation at the same moment).
2. When the film ends (or the guest taps «أكّدو حضوركم · Confirmer» top corner), the RSVP form rises over the end card.
3. The guest fills: name + phone (required), e-mail + organisation (optional), «باش نحضر / ما نجّمش نحضر» (required).
4. On success: thank-you text, «Add to calendar» (`invitation.ics`) and a Google Maps link (only if attending).

## What you need to do
Set `endpoint` in `config.js` to an endpoint of your admin / database that accepts:

```
POST <endpoint>
Content-Type: application/json

{
  "name": "Amira Ben Salah",            // string, ≥ 3 chars, trimmed
  "phone": "+216 22 123 456",            // string as typed, ≥ 8 digits
  "email": "amira@example.tn",           // string or null
  "organisation": "Banque X",            // string or null
  "attending": true,                     // boolean
  "code": "k7Qx2",                       // personal-link code from ?g=… or null
  "lang": "fr-FR",                       // browser language
  "source": "invitation-film",
  "submitted_at": "2026-10-18T09:12:44.120Z"   // client time, ISO 8601 — store your own server time too
}
```
Answer any **2xx** for success; anything else shows «L'envoi a échoué, réessayez» and lets the guest retry.

- **Same origin is simplest** (`/api/...` on errafik.marqenti.tn). If the API is on another domain, allow CORS for
  `POST` + `Content-Type` from the page's origin (and answer the `OPTIONS` preflight).
- **Duplicates:** the same phone may submit twice (changed answer) → keep the latest per phone (or per code).
- **Spam:** the form has a hidden honeypot field (never sent). Add a rate limit per IP on the endpoint.
- **No secrets in `config.js`** — it is public. `headers` is only for a public form key if you use one.
- **Capacity / invitation-only:** if you send personal links, reject unknown codes server-side if you want (the page shows the retry message).

## Optional: personal links
Send each guest `https://…/invitation/?g=<opaque-code>` (never the name in the URL). If you set `guestEndpoint`, the page calls
`GET <guestEndpoint><code>` and expects `{ "greeting": "Madame X, votre place vous attend", "name": "...", "phone": "...", "email": "...", "organisation": "..." }`
(all optional) to greet the guest and pre-fill the form. Without it, `code` is just passed along with the RSVP.

## Do not
- Put the **new logo / identity** anywhere on this page, its favicon or `media/preview.jpg` (WhatsApp link preview) before the 31st — the
  reveal is the event.
- Re-encode the videos (they are web-optimised H.264 with faststart) or set them to loop.

## Files
`index.html` (page + styles + script) · `config.js` · `invitation.ics` · `fonts/` (Amiri, Cormorant Garamond — SIL OFL) ·
`media/` (two films + posters, paper texture, link-preview image).
Test locally: `python3 -m http.server 8000` in this folder → http://localhost:8000 (empty `endpoint` = demo mode, the payload is printed in the console).
