<% const { serviceMapping, serviceOptions, writeImportStatement, writeInjections } = options %>

export default async function (session) {
  // Firebase Performance can only be initiated on client side
  if (!process.client) {
    return
  }

  <%= writeImportStatement(options) %>

  const performanceService = session.<%= serviceMapping.objectName %>()
  return performanceService
}
