self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');
});

self.addEventListener('fetch', (event) => {
  // 基本的網路請求轉發，滿足 Chrome PWA 的「必須可離線運作」安裝條件門檻
  event.respondWith(fetch(event.request));
});
