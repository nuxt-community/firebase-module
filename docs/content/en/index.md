---
title: Introduction
description: 'Easily integrate Firebase into your Nuxt project'
position: 1
category: ''
features:
  - Simple Setup – Minimal setup required to integrate all Firebase services into your Nuxt.js application.
  - Performant – The module uses dynamic imports of each individual Firebase service to reduce bundle sizes and  improve performance.
  - Additional Features – Enjoy the benefits of additional features such as automated setup of .onAuthStateChanged() for Firebase Authentication and more.
---

<img src="/preview.png" class="light-img" width="1280" height="640" alt="" />
<img src="/preview-dark.png" class="dark-img" width="1280" height="640" alt=""/>

Easily integrate [Firebase](https://firebase.google.com) into your [Nuxt.js](https://nuxtjs.org) project.

## Features

<list :items="features"></list>

## What is this?

The Nuxt.js Firebase Module is a module that helps you integrate the Firebase JavaScript SDK into your application with ease. By simply configuring this module in your nuxt.config.js file, you can use all Firebase Services throughout your app.

By importing each individual Firebase service dynamically this module reduces bundle sizes and improves performance of your Nuxt.js app with Firebase.

The module additionally adds other perks such as a plugin that automated the setup of onAuthStateChanged() fo Firebase Authentication or other helper functions that make your life with Firebase easier.

## How does it work?

The module adds a plugin to your Nuxt.js application that handles the initialization of each Firebase service (Authentication, Firestore, etc.). It then injects these services into the global context which makes them easily available throughout your application.

## Disclaimer

This module is meant for easy and quick set-up of Firebase in a Nuxt project. Due to the nature of this module, it is possibly not optimal for websites that need to be super performant and/or SEO friendly, since the module adds the Firebase services to the global scope. If you want your website to be more performant, you'd probably be better off by importing the services only in the files where you need them (i.e. by NOT using this module). That being said, the difference might be marginal depending on your project.

## Links

Collection of Links related to this module:

### Articles

- [Nuxt.js (v2), Firestore & SSR 🔥](https://medium.com/@pascalluther/nuxt-js-v2-firestore-ssr-938d8fb7d2b0?)  
  Medium Article about integrating Firestore with Nuxt.js v2.

- [Nuxt.js (v1), Firestore & SSR 🔥](https://medium.com/@pascalluther/nuxt-js-v1-firestore-and-ssr-73e3140574fc?) Medium Article about integrating Firestore with Nuxt.js v1.

### Videos

- [Nuxt Firebase로 블로그 만들어보기 12 파이어베이스 인증해보기](https://www.youtube.com/watch?v=Zd6PSfgH3t4) Tutorial video on how to integrate Firebase Auth with nuxt-fire (in Korean)

<p class="flex items-center">Enjoy light and dark mode:&nbsp;<app-color-switcher class="inline-flex ml-2"></app-color-switcher></p>
