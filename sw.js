const CACHE_NAME = 'cost-and-market-v5'; // バージョンを v5 に更新
const ASSETS = [
  './',
  './index.html',
  './menu.json',  
  './icon_ff.jpg'  // 確実に存在する最小限のファイルのみを登録し、404エラーによるインストール失敗を防ぎます
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

// オフライン時でもキャッシュから読み込み可能にする（表示された画像はここで自動的にキャッシュされます）
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
