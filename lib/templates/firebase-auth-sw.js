const options = <%= serialize(options) %>
const version = options.firebaseVersion
const onFirebaseHosting = options.onFirebaseHosting
const ignorePaths = options.ignorePaths

if (onFirebaseHosting) {
  // Only works on Firebase hosting!
  importScripts('/__/firebase/' + version + '/firebase-app.js')
  importScripts('/__/firebase/' + version + '/firebase-auth.js')
  importScripts('/__/firebase/init.js')
}
else {
  importScripts(
    'https://www.gstatic.com/firebasejs/' + version + '/firebase-app.js'
  )
  importScripts(
    'https://www.gstatic.com/firebasejs/' + version + '/firebase-auth.js'
  )
  firebase.initializeApp(options.config)
}

/**
 * Returns a promise that resolves with an ID token if available.
 * @return {!Promise<?string>} The promise that resolves with an ID token if
 *     available. Otherwise, the promise resolves with null.
 */
const getIdToken = () => {
  return new Promise((resolve) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      if (user) {
        user.getIdToken().then((idToken) => {
          resolve(idToken);
        }, () => {
          resolve(null);
        });
      } else {
        resolve(null);
      }
    });
  });
};

const requestProcessor = (idToken, req) => {
  // Clone headers as request headers are immutable.
  const headers = new Headers();
  for (let entry of req.headers.entries()) {
    headers.append(entry[0], entry[1]);
  }
  // Add ID token to header.
  headers.append('Authorization', 'Bearer ' + idToken);

  try {
    const { url, ...props } = req

    return fetch(new Request(url, {
      ...props,
      headers: headers,
      mode: 'same-origin'
    }));
  } catch (e) {
    // This will fail for CORS requests. We just continue with the
    // fetch caching logic below and do not pass the ID token.
    return fetch(req);
  }
};

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  const isSameOrigin = self.location.origin === url.origin;
  const isHttps = (self.location.protocol === 'https:' || self.location.hostname === 'localhost');
  const isIgnored = ignorePaths.some(path => {
    if (typeof path === 'string') {
      return url.pathname.startsWith(path)
    }

    return path.test(url.pathname.slice(1))
  });

  if (!isSameOrigin || !isHttps || isIgnored) {
    event.respondWith(fetch(event.request));

    return;
  }

  // Fetch the resource after checking for the ID token.
  // This can also be integrated with existing logic to serve cached files
  // in offline mode.
  event.respondWith(getIdToken().then(idToken => idToken ? requestProcessor(idToken, event.request) : fetch(event.request)));
});

// In service worker script.
self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});
