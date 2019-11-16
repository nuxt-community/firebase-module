export function movePluginBeforeInitAuthPlugin(plugins, pluginName) {
  // Moves a plugin that needs access to $this.fireFOO but needs to get run BEFORE nuxt-auth in between the nuxt-fire and the auth plugin.
  // This function needs to be applied in extendPlugins in nuxt.config.js.

  const fromIndex = plugins.findIndex((x) => x.src.includes(pluginName))
  const toIndex = plugins.findIndex((x) => x.src.includes('nuxt-fire/main')) + 1

  if (fromIndex === -1) {
    const msg = `Nuxt-Fire Helpers: Could not find a plugin that includes the name: ${pluginName}.`
    throw new Error(msg)
  }

  if (toIndex === -1) {
    const msg = `Nuxt-Fire Helpers: Nuxt-Fire plugin is not registered.`
    throw new Error(msg)
  }

  if (toIndex > -1 && toIndex < plugins.length) {
    const removedElement = plugins.splice(fromIndex, 1)[0]
    plugins.splice(toIndex, 0, removedElement)
  }
}
