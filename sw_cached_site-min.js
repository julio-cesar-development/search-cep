const staticCacheName="sw-precache-v3",filesToCache=["/index.html","/dist/js/main-min.js","/sw_cached_site-min.js","/dist/css/main.css"];this.addEventListener("install",e=>{this.skipWaiting(),e.waitUntil(caches.open(staticCacheName).then(e=>e.addAll(filesToCache)))}),this.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(e=>Promise.all(e.filter(e=>e.startsWith("sw-precache-")).filter(e=>e!==staticCacheName).map(e=>caches.delete(e)))))}),this.addEventListener("fetch",e=>{e.respondWith(caches.match(e.request).then(t=>t||fetch(e.request)).catch(()=>caches.match("/")))});