// Removes the service worker that the old Hugo version of this site registered.
// The current site never registers a service worker. Browsers that still have the
// old one fetch this file to update it; it then clears its caches, unregisters
// itself and reloads any open tabs so they load the current site directly.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const windows = await self.clients.matchAll({ type: 'window' });
      windows.forEach((client) => client.navigate(client.url));
    })()
  );
});
