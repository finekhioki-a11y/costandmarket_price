const CACHE_NAME = 'cost-and-market-v4'; // バージョンを v4 に更新
const ASSETS = [
  './',
  './index.html',
  './menu.json',  
  './splash_fine.webp', // スプラッシュ画像を WebP に変更
  './kyofu_ramen.webp',  // 京風ラーメン画像を WebP に変更
  './icon_ff.jpg'        // アイコンは互換性のためJPGのままが推奨されます
];

// アプリのインストール時にファイルをキャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// キャッシュを更新した際に古いデータを削除
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// オフライン時でもキャッシュから読み込み可能にする
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
