const ignorePaths = <%= serialize(options.ignorePaths) %>

<% if (options.loadFromFirebaseHosting) { %>
// Only works on Firebase hosting!
importScripts('/__/firebase/<%= options.firebaseVersion %>/firebase-app-compat.js')
importScripts('/__/firebase/<%= options.firebaseVersion %>/firebase-auth-compat.js')
importScripts('/__/firebase/init.js')
<% } else { %>
importScripts(
  'https://www.gstatic.com/firebasejs/<%= options.firebaseVersion %>/firebase-app-compat.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/<%= options.firebaseVersion %>/firebase-auth-compat.js'
)
firebase.initializeApp(<%= serialize(options.config) %>)
<% } %>

// Initialize authService
const authService = firebase.auth()

<% /* Uses emulator, if emulatorPort is set. */ %>
<% const authOptions = options.authOptions %>
<% if (['string', 'number'].includes(typeof authOptions.emulatorPort)) { %>
<% const emulatorHost =
typeof authOptions.emulatorHost === 'string'
  ? authOptions.emulatorHost
  : 'http://localhost'
%>
authService.useEmulator('<%= `${emulatorHost}` %>:<%= `${authOptions.emulatorPort}` %>')
<% } %>


/**
 * Returns a promise that resolves with an ID token if available.
 * @return {!Promise<?string>} The promise that resolves with an ID token if
 *     available. Otherwise, the promise resolves with null.
 */
const getIdToken = () => {
  return new Promise((resolve) => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      unsubscribe()
      if (user) {
        // force token refresh as it might be used to sign in server side
        user.getIdToken(true).then((idToken) => {
          resolve(idToken)
        }, () => {
          resolve(null)
        })
      } else {
        resolve(null)
      }
    })
  })
}

const fetchWithAuthorization = async (original, idToken) => {
  // Clone headers as request headers are immutable.
  const headers = new Headers()
  for (let entry of original.headers.entries()) {
    headers.append(entry[0], entry[1])
  }

  // Add ID token to header.
  headers.append('Authorization', 'Bearer ' + idToken)

  // Create authorized request
  const { url, ...props } = original.clone()
  const authorized = new Request(url, {
    ...props,
    mode: 'same-origin',
    redirect: 'manual',
    headers
  })

  return fetch(authorized)
}

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  const expectsHTML = event.request.headers.get('accept').includes('text/html')

  const isSameOrigin = self.location.origin === url.origin
  const isHttps = (self.location.protocol === 'https:' || self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1')

  const isIgnored = ignorePaths.some(path => {
    if (typeof path === 'string') {
      return url.pathname.startsWith(path)
    }

    return path.test(url.pathname.slice(1))
  })

  // https://github.com/nuxt-community/firebase-module/issues/465
  if (!expectsHTML || !isSameOrigin || !isHttps || isIgnored) {
    <% if (['string', 'number'].includes(typeof authOptions.emulatorPort)) { %>
    <% const emulatorHost =
      typeof authOptions.emulatorHost === 'string'
        ? authOptions.emulatorHost
        : 'http://localhost'
      %>
    if (event.request.url.startsWith('https://www.googleapis.com/identitytoolkit/')) {
      event.respondWith(
        fetch({
          ...event.request,
          ...{ url: event.request.url.replace(/https:\/\//, '<%= `${emulatorHost}` %>:<%= `${authOptions.emulatorPort}` %>/') }
        })
      )
    } else event.respondWith(fetch(event.request))
    <% } else { %>
      event.respondWith(fetch(event.request))
    <% } %>
    return
  }


  // Fetch the resource after checking for the ID token.
  // This can also be integrated with existing logic to serve cached files
  // in offline mode.
  event.respondWith(
    getIdToken().then(
      idToken => idToken
        // if the token was retrieved we attempt an authorized fetch
        // if anything goes wrong we fall back to the original request
        ? fetchWithAuthorization(event.request, idToken).catch(() => fetch(event.request))
        // otherwise we return a fetch of the original request directly
        : fetch(event.request)
    )
  )
})

// In service worker script.
self.addEventListener('activate', event => {
  event.waitUntil(clients.claim())
})