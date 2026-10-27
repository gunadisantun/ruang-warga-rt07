// Cache only the static app shell. No documents, API responses or uploaded files.
const CACHE='ruang-warga-shell-v1';
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(['/icon.svg','/manifest.webmanifest'])));self.skipWaiting();});
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==self.location.origin)return;if(['/icon.svg','/manifest.webmanifest'].includes(url.pathname))event.respondWith(caches.match(event.request).then(r=>r||fetch(event.request)));});
