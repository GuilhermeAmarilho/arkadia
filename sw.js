//NEW
//This is the "Offline copy of pages" wervice worker
//Install stage sets up the index page (home page) in the cahche and opens a new cache
self.addEventListener('install', function (event) {
    var indexPage = new Request('index.html');
    event.waitUntil(
        fetch(indexPage).then(function (response) {
            caches.open('pwabuilder-offline').then(function (cache) {
                console.log('[PWA Builder] Cached index page during Install' + response.url);
                return cache.addAll(['/arkadia/', '/arkadia/index.html', '/arkadia/compra.html',
                    '/arkadia/fale.html', '/arkadia/inter.html',
                    '/arkadia/local.html', '/arkadia/profile.html',
                    '/arkadia/img/amor.gif', '/arkadia/img/base1.png',
                    '/arkadia/img/base2.png', '/arkadia/img/base3.png',
                    '/arkadia/img/base4.png', '/arkadia/img/base5.png',
                    '/arkadia/img/comida1.png', '/arkadia/img/comida2.png',
                    '/arkadia/img/comida3.png', '/arkadia/img/comida4.png',
                    '/arkadia/img/i1.png', '/arkadia/img/i2.png',
                    '/arkadia/img/i3.png', '/arkadia/img/i4.png',
                    '/arkadia/img/i5.png', '/arkadia/img/icone.png',
                    '/arkadia/img/logo1.png', '/arkadia/img/maq1.png',
                    '/arkadia/img/maq2.png', '/arkadia/img/maq3.png',
                    '/arkadia/img/maq4.png', '/arkadia/img/masc1.png',
                    '/arkadia/img/masc2.png', '/arkadia/img/masc3.png',
                    '/arkadia/img/masc4.png', '/arkadia/img/portal-blue-semi.png',
                    '/arkadia/img/portal-blue.png', '/arkadia/img/portal-green-semi.png',
                    '/arkadia/img/portal-green.png', '/arkadia/img/portal-orange-semi.png',
                    '/arkadia/img/portal-orange.png', '/arkadia/img/portal-red-semi.png',
                    '/arkadia/img/portal-red.png', '/arkadia/img/portal-yellow-semi.png',
                    '/arkadia/img/portal-yellow.png', '/arkadia/img/slua.png',
                    '/arkadia/img/zenite.png', '/arkadia/js/script.js',
                    '/arkadia/css/style.css'
                ]);
            });
        })
    );
  });
  
  
  //If any fetch fails, it will look for the request in the cache and serve it from there first
  self.addEventListener('fetch', function(event) {
  var updateCache = function(request){
    return caches.open('pwabuilder-offline').then(function (cache) {
      return fetch(request).then(function (response) {
        console.log('[PWA Builder] add page to offline'+response.url)
        return cache.put(request, response);
      });
    });
  };
  
  event.waitUntil(updateCache(event.request));
  
  event.respondWith(
    fetch(event.request).catch(function(error) {
      console.log( '[PWA Builder] Network request Failed. Serving content from cache: ' + error );
  
      //Check to see if you have it in the cache
      //Return response
      //If not in the cache, then return error page
      return caches.open('pwabuilder-offline').then(function (cache) {
        return cache.match(event.request).then(function (matching) {
          var report =  !matching || matching.status == 404?Promise.reject('no-match'): matching;
          return report
        });
      });
    })
  );
  })