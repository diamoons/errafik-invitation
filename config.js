// Errafik invitation page — the ONLY file the dev team edits (see README_DEV.md).
window.RSVP_CONFIG = {
  // POST target for one RSVP (JSON). Empty = demo mode: nothing is sent, the payload is logged in the browser console.
  endpoint: '',
  // optional extra headers for the POST (e.g. a public form key). Never put a secret admin token here: this file is public.
  headers: {},
  // optional: GET <guestEndpoint><code> for personal links (?g=<code>) → { greeting, name, phone, email, organisation }
  guestEndpoint: '',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Association+Errafik+Route+de+Sokra+km+0.5+Sfax'
};
