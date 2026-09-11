'use strict';
// This worker owns only the test entry shell, never GAS responses or game assets.
const PREFIX='chidung-home-test-shell-';
const CACHE=PREFIX+'b1-1';
const BASE=new URL('./',self.location.href);
const INDEX=new URL('index.html',BASE).href;
const FILES=[INDEX,new URL('manifest.json',BASE).href,new URL('../ChiDongRPG.jpg',BASE).href];
self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    // Atomic addAll: a missing file keeps the previous worker in service.
    await cache.addAll(FILES.map(url=>new Request(url,{cache:'reload'})));
    // No skipWaiting: do not replace an entry while a game is open.
  })());
});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key.startsWith(PREFIX)&&key!==CACHE).map(key=>caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch',event=>{
  const req=event.request, url=new URL(req.url);
  if(req.method!=='GET'||url.origin!==BASE.origin)return;
  const isEntry=req.mode==='navigate'&&(url.pathname===BASE.pathname||url.pathname===new URL(INDEX).pathname);
  const key=isEntry?INDEX:url.href;
  if(!isEntry&&!FILES.includes(key))return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE), saved=await cache.match(key);
    if(saved)return saved;
    // Storage may be evicted. Refill this individual file; never delete game data.
    const response=await fetch(new Request(key,{cache:'no-cache'}));
    if(response.ok&&response.type!=='opaque')await cache.put(key,response.clone()).catch(()=>{});
    return response;
  })());
});
self.addEventListener('message',event=>{
  if(event.data?.type!=='ENTRY_CACHE_STATUS'||!event.ports[0])return;
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    const found=await Promise.all(FILES.map(url=>cache.match(url)));
    event.ports[0].postMessage({ready:found.every(Boolean),version:CACHE});
  })().catch(()=>event.ports[0].postMessage({ready:false})));
});
