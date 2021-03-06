importScripts('/cache-polyfill.js');
self.addEventListener('install', function(e) {
	e.waitUntil(
		caches.open('duvel').then(function(cache) {
			return cache.addAll([
				'/',
				'/index.html',
				'/index.html?homescreen=1',
				'/?homescreen=1',
				'/css/main.min.css',
				'/css/mobile.min.css',
				'/css/tablet.min.css',
				'/css/pc.min.css',
			]).then(() => self.skipWaiting());
		})
	);
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
