import createApp from './app.js'
<%
const { enabledServices } = options
serverServices = enabledServices.filter(service => !service.clientOnly)
clientServices = enabledServices

for (const service of enabledServices) { %>
<%= `import ${service.id}Service from './service.${service.id}.js'`%><%
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

      let servicePromises = []

      <% if (serverServices.length) { %>
      if (process.server) {
        servicePromises = [
        <%= serverServices.reduce((acc, service) => `${acc}fire.${service.objectName}Ready(),\n        `, '') %>
        ]
      }
      <% } %>

      <% if (clientServices.length) { %>
      if (process.client) {
        servicePromises = [
        <%= clientServices.reduce((acc, service) => `${acc}fire.${service.objectName}Ready(),\n        `, '') %>
        ]
      }
      <% } %>

      await Promise.all(servicePromises)
      return session
    }
  }

  <% for (service of serverServices) { %>
  <% const serviceName = service.objectName %>
  fire.<%= serviceName %> = null
  fire.<%= serviceName %>Ready = async () => {
    if (!fire.<%= serviceName %>) {
      await fire.appReady()
      fire.<%= serviceName %> = await <%= `${service.id}Service(session, firebase, ctx, inject)` %>
    }

    return fire.<%= serviceName %>
  }
  <% } %>

  if (process.client) {
    <% for (service of clientServices) { %>
    <% const serviceName = service.objectName %>
    fire.<%= serviceName %> = null
    fire.<%= serviceName %>Ready = async () => {
      if (!fire.<%= serviceName %>) {
        await fire.appReady()
        fire.<%= serviceName %> = await <%= `${service.id}Service(session, firebase, ctx, inject)` %>
      }

      return fire.<%= serviceName %>
    }
    <% } %>
  }

  inject('fire', fire)
  ctx.$fire = fire

  <% } else { %>
  const { firebase, session } = await createApp(appConfig)

  let servicePromises = []

  <% if (serverServices.length) { %>
  if (process.server) {
    servicePromises = [
      <%= serverServices.reduce((acc, service) => `${acc}${service.id}Service(session, firebase, ctx, inject),\n    `, '') %>
    ]
  } 
  <% } %>

  <% if (clientServices.length) { %>
  if (process.client) {
    servicePromises = [
      <%= clientServices.reduce((acc, service) => `${acc}${service.id}Service(session, firebase, ctx, inject),\n      `, '') %>
    ]
  }
  <% } %>

  const [
    <%= enabledServices.map(service => service.id).join(',\n    ') %>
  ] = await Promise.all(servicePromises)
  
  <% if (options.legacyMode) { %>

  if (process.server) {
    <% for (const service of serverServices) { %>
    inject('<%= service.injectionNameOld %>', <%= service.id %>)
    <% if (options.injectModule) { %>
    inject('<%= service.injectionNameOld %>Obj', firebase.<%= service.objectName %>)
    <% } %>
    <% } %>
  }

  if (process.client) {
    <% for (const service of clientServices) { %>
    inject('<%= service.injectionNameOld %>', <%= service.id %>)
    <% if (options.injectModule) { %>
    inject('<%= service.injectionNameOld %>Obj', firebase.<%= service.objectName %>)
    <% } %>
    <% } %>
  }

  <% } else { %>
  
  const fire = {
    <%= enabledServices.map(service => `${service.objectName}: ${service.id}`).join(',\n    ') %>
  }

  <% if (options.injectModule && !options.legacyMode) { %>
    inject('fireObj', firebase)
    ctx.$fireObj = firebase
  <% } %>

  inject('fire', fire)
  ctx.$fire = fire
  <% } %>
  <% } %>
}
