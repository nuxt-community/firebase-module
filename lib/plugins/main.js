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

  <%/****************************************
  **************** LAZY MODE **************
  ****************************************/%>
  <% if (options.lazy) { %>
  let firebase, session
  let firebaseReady = false

  const fire = {
    async appReady() {
      if (!firebaseReady) {
        ({ firebase, session } = await createApp(appConfig, ctx))
        firebaseReady = true;

        <% if (options.injectModule) { %>
        forceInject(ctx, inject, "fireModule", firebase)
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
        <%= serverServices.reduce((acc, service) => `${acc}fire.${service.id}Ready(),\n        `, '') %>
        ]
      }
      <% } %>

      <% if (clientServices.length) { %>
      if (process.client) {
        servicePromises = [
        <%= clientServices.reduce((acc, service) => `${acc}fire.${service.id}Ready(),\n        `, '') %>
        ]
      }
      <% } %>

      await Promise.all(servicePromises)
      return session
    }
  }

  if (process.server) {
  <% for (service of serverServices) { %>
  <% const serviceName = service.id %>
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

  if (process.client) {
    <% for (service of clientServices) { %>
    <% const serviceName = service.id %>
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


  <%/****************************************
  ************* NON-LAZY MODE *************
  ****************************************/%>
  <% } else { %>
  const { firebase, session } = await createApp(appConfig, ctx)

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
  
  const fire = {
    <%= enabledServices.map(service => `${service.id}: ${service.id}`).join(',\n    ') %>
  }

  <% if (options.injectModule) { %>
    inject('fireModule', firebase)
    ctx.$fireModule = firebase
  <% } %>

  inject('fire', fire)
  ctx.$fire = fire
  <% } %>
}


<%/*************************************
************* HELPERS********************
****************************************/%>
<%/**
Custom inject function that is able to overwrite previously injected values,
which original inject doesn't allow to do.
This method is copied from https://github.com/nuxt-community/sentry-module/blob/master/lib/plugin.lazy.js#L189
which is adapted from the inject method in nuxt/vue-app/template/index.js
Fixes https://github.com/nuxt-community/firebase-module/issues/366
**/%>
function forceInject (ctx, inject, key, value) {
  inject(key, value)
  const injectKey = '$' + key
  ctx[injectKey] = value 
  if (typeof window !== "undefined" && window.<%= globals.nuxt %>) {
  // If clause makes sure it's only run when ready() is called in a component, not in a plugin.
    window.<%= globals.nuxt %>.$options[injectKey] = value
  }
}