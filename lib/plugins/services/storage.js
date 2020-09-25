<% const { service, serviceOptions, writeImportStatement, writeInjections } = options %>

export default async function (session) {
  <%= writeImportStatement(options) %>

  const storageService = session.<%= service %>()
  return storageService
}
