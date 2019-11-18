# Advanced

## Helpers

Nuxt-Fire provides helper functions that can generally be accessed like so:

```js
import { **helperFunctionName** } from 'nuxt-fire/src/helpers'
```

### movePluginBeforeInitAuthPlugin(plugins, pluginName)

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

## Usage with vuexfire

This [example](https://github.com/lupas/nuxt-fire-vuexfire-example) shows how to use both vuexfire and nuxt-fire together.
