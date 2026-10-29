/* Superday Room moved to superdayroom.com. This replaces the old service worker: it removes itself
   and reloads any open tab, which then forwards to the new address. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil((async () => {
  await self.registration.unregister();
  for (const c of await self.clients.matchAll({ type: "window" })) c.navigate(c.url);
})()));
