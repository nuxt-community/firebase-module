<% const { serviceMapping, serviceOptions, writeImportStatement, writeInjections } = options %>

export default async function (session) {
  <%= writeImportStatement(options) %>

  const realtimeDbService = session.<%= serviceMapping.objectName %>()
  return realtimeDbService
}
