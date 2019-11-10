export function movePluginBeforeInitAuthPlugin(plugins, pluginName) {
  // Moves a plugin that needs access to $this.fireFOO but needs to get run BEFORE nuxt-auth in between the nuxt-fire and the auth plugin.
  // This function needs to be applied in extendPlugins in nuxt.config.js.s
  const fromIndex = plugins.findIndex(x => x.src.includes(pluginName))
  const toIndex = plugins.findIndex(x => x.src.includes('nuxt-fire/main.js'))
  plugins.splice(toIndex + 1, 0, plugins.splice(fromIndex - 1, 1)[0])
  return plugins
}
