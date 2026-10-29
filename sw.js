/* Lets the page use every CPU core for on-device speech recognition.
   Browsers only allow multi-threaded WebAssembly on "cross-origin isolated" pages, which needs
   two response headers that GitHub Pages can't send. This service worker adds them to the
   page's own responses. It caches nothing: every request still goes to the network. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.cache === "only-if-cached" && r.mode !== "same-origin") return;
  if (new URL(r.url).origin !== self.location.origin) return;
  e.respondWith(fetch(r).then(res => {
    if (!res || res.status === 0 || res.type === "opaque") return res;
    const h = new Headers(res.headers);
    h.set("Cross-Origin-Opener-Policy", "same-origin");
    h.set("Cross-Origin-Embedder-Policy", "credentialless");
    return new Response(res.body, {status: res.status, statusText: res.statusText, headers: h});
  }).catch(() => fetch(r)));
});
