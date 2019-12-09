# Helpers

Nuxt-Fire provides helper functions that can generally be accessed like so:

```js
import { **helperFunctionName** } from 'nuxt-fire/src/helpers'
```

## movePluginBeforeInitAuthPlugin()

If the initAuth config is set, nuxt-fire will add two (instead of one) plugins to your Nuxt application:  
**nuxt-fire/plugins/main.js** and **nuxt-fire/plugins/initAuth.js**.

If you use initAuth and want another plugin to be called AFTER firebase initialization but BEFORE initAuth gets called, you can use this helper function to move the other plugin inbetween these two.

Just add the following to your nuxt.config.js:

```js
import { movePluginBeforeInitAuthPlugin } from 'nuxt-fire/src/helpers'

extendPlugins(plugins) {
  movePluginBeforeInitAuthPlugin(plugins, 'yourPluginName.js')
  return plugins
},
```

## parseFirebaseAuthCookie()

Parses the request cookie named `nuxt_fire_auth_access_token` in the nuxtServerInit action and returns an `authUser` object and the `idToken` if user is signed in.

For usage see [here](/advanced/#firebase-auth-in-universal-mode).

```js
import { parseFirebaseAuthCookie } from 'nuxt-fire/src/helpers'
// in nuxtServerInit
const { authUser, idToken } = parseFirebaseAuthCookie(req)
```
