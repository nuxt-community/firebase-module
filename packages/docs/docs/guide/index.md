# Nuxt Firebase

<img src="/preview-dark.png" class="dark-only"/>
<img src="/preview.png" class="light-only"/>

::: danger IMPORTANT - Nuxt 3 not supported!

This module was written for **Nuxt 2** and does currently not support Nuxt 3. There are currently **no plans** to support Nuxt 3 in the near future in this module. However, you can take a look at VueFire Nuxt module for Nuxt 3 support

:::

::: warning Modular Mode (Firebase v9+)

This module does NOT support the new modular syntax from Firebase v9+.

If you plan to use the new modular mode of Version 9, we advise you to implement Firebase manually as described in the following medium article.

It is currently unclear when, and if, this module will support the new modular mode. See discussion.

:::

## What is this?

The Nuxt.js Firebase Module is a module that helps you integrate the Firebase JavaScript SDK into your application with ease. By simply configuring this module in your nuxt.config.js file, you can use all Firebase Services throughout your app.

By importing each individual Firebase service dynamically this module reduces bundle sizes and improves performance of your Nuxt.js app with Firebase.

The module additionally adds other perks such as a plugin that automated the setup of onAuthStateChanged() for Firebase Authentication or other helper functions that make your life with Firebase easier.

## How does it work?

The module adds a plugin to your Nuxt.js application that handles the initialization of each Firebase service (Authentication, Firestore, etc.). It then injects these services into the global context which makes them easily available throughout your application.
