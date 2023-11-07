// sw.js

// Install a service worker
self.addEventListener('install', event => {
  // Perform install steps
});

// Cache and return requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Update a service worker
self.addEventListener('activate', event => {
  var cacheWhitelist = ['pwa-task-manager'];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  const title = 'Push Notification';
  const options = {
    body: 'Your push notification message here',
    icon: 'icon.png',
    badge: 'badge.png'
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
