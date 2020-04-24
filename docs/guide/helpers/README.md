# Helpers

This module provides helper functions that can generally be accessed like so:

```js
import { **helperFunctionName** } from '@nuxtjs/firebase/lib/helpers'
```

## movePluginBeforeInitAuthPlugin()

If the initAuth config is set, the module will add two (instead of one) plugins to your Nuxt application:  
**firebase-module/plugins/main.js** and **firebase-module/plugins/initAuth.js**.

If you use initAuth and want another plugin to be called AFTER firebase initialization but BEFORE initAuth gets called, you can use this helper function to move the other plugin inbetween these two.

Just add the following to your nuxt.config.js:

```js
import { movePluginBeforeInitAuthPlugin } from '@nuxtjs/firebase/lib/helpers'

extendPlugins(plugins) {
  movePluginBeforeInitAuthPlugin(plugins, 'yourPluginName.js')
  return plugins
},
```
