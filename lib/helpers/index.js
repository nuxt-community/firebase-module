/**
 * Moves a plugin that needs access to $this.fireFOO but needs to get run BEFORE
 * nuxt-auth in between the firebase-module and the auth plugin.
 * This function needs to be applied in extendPlugins in nuxt.config.js.
 */
function movePluginBeforeInitAuthPlugin (plugins, pluginName) {
  const indexOfPluginToMove = _getPluginIndex(plugins, pluginName)
  const indexOfNuxtFirePlugin = _getPluginIndex(plugins, 'firebase/service.auth.initialize')

  const fromIndex = indexOfPluginToMove
  const toIndex = indexOfNuxtFirePlugin + 1

  if (fromIndex === -1) {
    const msg = `Firebase-Module Helpers: Could not find a plugin that includes the name: ${pluginName}.`
    throw new Error(msg)
  }

  if (toIndex === -1) {
    const msg = 'Firebase-Module Helpers: Firebase-Module plugin is not registered.'
    throw new Error(msg)
  }

  if (toIndex > -1 && toIndex < plugins.length) {
    const removedElement = plugins.splice(fromIndex, 1)[0]
    plugins.splice(toIndex, 0, removedElement)
  }
}

function _getPluginIndex (plugins, pluginName) {
  function includesPlugin (pluginObject) {
    if (!pluginObject.src) {
      // If it's actually just a string and not an object
      return pluginObject.includes(pluginName)
    }
    return pluginObject.src.includes(pluginName)
  }
  return plugins.findIndex(x => includesPlugin(x))
}

module.exports = { movePluginBeforeInitAuthPlugin }
