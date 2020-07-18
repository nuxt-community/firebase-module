import createApp from './app.js'
<%
const { enabledServices, clientOnlyServices } = options
serverServices = enabledServices.filter(service => !clientOnlyServices.includes(service))
clientServices = enabledServices.filter(service => clientOnlyServices.includes(service))

const getServiceName = name => options.legacyMode ? name : name.split(/([A-Z])/).slice(-2).join('').toLowerCase()
serviceNames = enabledServices.reduce((acc, service) => {
  acc[service] = getServiceName(service)
  return acc
}, {})

for (const service of enabledServices) { %>
<%= `import ${service}Service from './service.${service}.js'`%><%
} %>

const appConfig = <%= serialize(options.config) %>

export default async (ctx, inject) => {
  <% if (options.lazy) { %>
  let firebase, session
  let firebaseReady = false

  const fire = {
    async appReady() {
      if (!firebaseReady) {
        ({ firebase, session } = await createApp(appConfig))
        firebaseReady = true;

        <% if (options.injectModule) { %>
        inject('fireObj', firebase)
        ctx.$fireObj = firebase
        <% } %>
      }
      return session
    },
    async ready() {
      await fire.appReady()

      const servicePromises = [
        <%= serverServices.reduce((acc, service) => `${acc}fire.${serviceNames[service]}Ready(session, firebase),\n        `, '') %>
      ]

      <% if (clientServices.length) { %>
      if (process.client) {
        Array.prototype.push.apply(servicePromises, [
          <%= clientServices.reduce((acc, service) => `${acc}fire.${serviceNames[service]}Ready(session, firebase),\n          `, '') %>
        ])
      }
      <% } %>

      await Promise.all(servicePromises)
      return session
    }
  }

  <% for (service of serverServices) { %>
  <% const serviceName = serviceNames[service] %>
  fire.<%= serviceName %> = null
  fire.<%= serviceName %>Ready = async () => {
    if (!fire.<%= serviceName %>) {
      await fire.appReady()
      fire.<%= serviceName %> = await <%= `${service}Service(session, firebase)` %>
    }

    return fire.<%= serviceName %>
  }
  <% } %>

  if (process.client) {
    <% for (service of clientServices) { %>
    <% const serviceName = serviceNames[service] %>
    fire.<%= serviceName %> = null
    fire.<%= serviceName %>Ready = async () => {
      if (!fire.<%= serviceName %>) {
        await fire.appReady()
        fire.<%= serviceName %> = await <%= `${service}Service(session, firebase)` %>
      }

      return fire.<%= serviceName %>
    }
    <% } %>
  }

  inject('fire', fire)
  ctx.$fire = fire

  <% } else { %>
  const { firebase, session } = await createApp(appConfig)

  const servicePromises = [
    <%= serverServices.reduce((acc, service) => `${acc}${service}Service(session, firebase),\n    `, '') %>
  ]

  <% if (clientServices.length) { %>
  if (process.client) {
    Array.prototype.push.apply(servicePromises, [
      <%= clientServices.reduce((acc, service) => `${acc}${service}Service(session, firebase),\n      `, '') %>
    ])
  }
  <% } %>

  <% /* No need to use process.client here, all client stuff will just be undefined on server */ %>
  const [
    <%= serverServices.map(getServiceName).join(',\n    ') + (clientServices.length ? ',' : '') %>
    <%= clientServices.map(getServiceName).join(',\n    ') %>
  ] = await Promise.all(servicePromises)

  <% if (options.legacyMode) { %>
  <% for (const service of serverServices) { %>
  inject('fire<%= options.injectionMapping[service] %>', <%= getServiceName(service) %>)
    <% if (options.injectModule) { %>
  inject('fire<%= options.injectionMapping[service] %>Obj', firebase.<%= options.serviceMapping[service] %>)
    <% } %>
  <% } %>

  if (process.client) {
    <% for (const service of clientServices) { %>
    inject('fire<%= options.injectionMapping[service] %>', <%= getServiceName(service) %>)
      <% if (options.injectModule) { %>
    inject('fire<%= options.injectionMapping[service] %>Obj', firebase.<%= options.serviceMapping[service].replace('-', '') %>)
      <% } %>
    <% } %>
  }
  <% } else { %>
  
  const fire = {
    <%= serverServices.map(getServiceName).join(',\n    ') + (clientServices.length ? ',' : '') %>
    <%= clientServices.map(getServiceName).join(',\n    ') %>
  }

  inject('fire', fire)
  ctx.$fire = fire
  <% } %>
  <% } %>
}
