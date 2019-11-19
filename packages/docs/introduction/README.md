# Introduction

<p align="center"><img align="center" height="300px" src="https://nuxt-fire-demo.firebaseapp.com/logo_text.png"/></p>

<p align="center">
  <a href="https://www.npmjs.com/package/nuxt-fire"><img src="https://badgen.net/npm/dm/nuxt-fire" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/nuxt-fire"><img src="https://badgen.net/npm/v/nuxt-fire" alt="Version"></a>
  <a href="https://www.npmjs.com/package/nuxt-fire"><img src="https://badgen.net/npm/license/nuxt-fire" alt="License"></a>
 </p>
</p>

## What is Nuxt-Fire?

Nuxt-Fire is a Nuxt.js module that helps you integrate the Firebase JavaScript SDK into your application with ease. By simply configuring Nuxt-Fire in your nuxt.config.js file, you can use all Firebase Servics throughout your app.

By importing each individual Firebase service dynamically Nuxt-Fire reduces bundle sizes and improves performance of your Nuxt.js app with Firebase.

Nuxt-Fire additionally ads other perks such as a plugin that automated the setup of onAuthStateChanged() fo Firebase Authentication or other helper functions that make your life with Fiebase easier.

## How does it work?

The Nuxt-Fire module adds a plugin to your Nuxt.js application that handles the initialization of each Firebase service (Authentication, Firestore, etc.). It then injects these services into the global context which makes them easily available throughout your application.

## Disclaimer

This module is meant for easy and quick set-up of Firebase in a Nuxt project. Due to the nature of this module, it is possibly not optimal for websites that need to be super performant and/or SEO friendly, since the module adds the Firebase services to the global scope. If you wan't your website to be more performant, you'd probably be better off by importing the services only in the files where you need them (i.e. by NOT using this module). That being said, the difference might be marginal depending on your project.
