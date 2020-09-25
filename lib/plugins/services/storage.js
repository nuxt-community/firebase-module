<% const { serviceMapping, serviceOptions, writeImportStatement, writeInjections } = options %>

export default async function (session) {
  <%= writeImportStatement(options) %>

  const storageService = session.<%= serviceMapping.objectName %>()
  return storageService
}
