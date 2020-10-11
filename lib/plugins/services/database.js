<% const { serviceMapping, serviceOptions, writeImportStatement, writeInjections } = options %>

export default async function (session) {
  <%= writeImportStatement(options) %>

  const databaseService = session.<%= serviceMapping.id %>()
  return databaseService
}
