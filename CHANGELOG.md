# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [5.2.0](https://github.com/nuxt-community/firebase-module/compare/v5.0.7...v5.2.0) (2020-05-01)


### Features

* **auth:** implement full ssr support ([17c0968](https://github.com/nuxt-community/firebase-module/commit/17c09686deb471da6faddcec16e140ab3013bdbd))
* **auth:** implement session manager ([5106f44](https://github.com/nuxt-community/firebase-module/commit/5106f448c3b15d14143f7e29f354f0fe47e929c9))


### Bug Fixes

* **helpers:** helper plugins are now exported as CommonJS instaed of ES6 ([806ecce](https://github.com/nuxt-community/firebase-module/commit/806ecce0a3b85478ef71a383e6a64c018c1b76e2))
* **main:** move messaging support check below import statement ([ca02c10](https://github.com/nuxt-community/firebase-module/commit/ca02c1061840f6bf652fe2ef9c36b7050dcfb0ad))
* **main:** remove references to removed session manager template ([9bf87a3](https://github.com/nuxt-community/firebase-module/commit/9bf87a32b73d07a9f64c58a1163d78df20e5c548))
* **manager:** use common js syntax for module imports/exports ([be6ac76](https://github.com/nuxt-community/firebase-module/commit/be6ac76ebd7d235c92b1195226e1000041a9fe19))
* **module:** remove unnecessary deps and simplify options resolution ([2501896](https://github.com/nuxt-community/firebase-module/commit/25018966f1ce52de8fdaa9685efe511b65ea6968))
* **ssr:** avoid using session manager for simple user injection ([8f26383](https://github.com/nuxt-community/firebase-module/commit/8f26383577c9fdc8edb1ccf9e6328fc0a4f1ec4c))
* **ssr:** check for req existence in ssr auth calls ([675aeed](https://github.com/nuxt-community/firebase-module/commit/675aeedecd70b1461d155b07689ca238ba5ed083))
* **templates:** improve type checks for more stability ([11d1f25](https://github.com/nuxt-community/firebase-module/commit/11d1f25ed3303aef24f0f7b159ec509de402d5ea))
* **types:** update credential option to allow ServiceAccount object ([427347d](https://github.com/nuxt-community/firebase-module/commit/427347d3a60f6bd07beb4f54ea7ed7b64e58e3cb))
* syntax on firebase module ([d3da4e9](https://github.com/nuxt-community/firebase-module/commit/d3da4e9506e9abce72ab345d22cbeada01ed91a9))

### [5.0.7](https://github.com/nuxt-community/firebase-module/compare/v5.0.6...v5.0.7) (2020-04-06)


### Bug Fixes

* **ssr-auth:** fixed a regression bug in ssr auth ([01411b3](https://github.com/nuxt-community/firebase-module/commit/01411b3fcfe3300065aaf1fff443eb83928ac755))

### [5.0.6](https://github.com/nuxt-community/firebase-module/compare/v5.0.5...v5.0.6) (2020-03-30)


### Bug Fixes

* **auth:** move ssrAuth plugin to the bottom of the module ([b7d5fe3](https://github.com/nuxt-community/firebase-module/commit/b7d5fe3bff89ff434c957411e7d1da438bd88a74))

### [5.0.5](https://github.com/nuxt-community/firebase-module/compare/v5.0.4...v5.0.5) (2020-03-30)

### [5.0.4](https://github.com/nuxt-community/firebase-module/compare/v5.0.3...v5.0.4) (2020-03-30)


### Bug Fixes

* **auth:** use plugin instead of middleware for ssr authentication ([9171b34](https://github.com/nuxt-community/firebase-module/commit/9171b34c75ba7b048a2270f00d41206f7daf2cb1))

### [5.0.3](https://github.com/nuxt-community/firebase-module/compare/v5.0.2...v5.0.3) (2020-03-18)

### [5.0.2](https://github.com/nuxt-community/firebase-module/compare/v5.0.1...v5.0.2) (2020-03-16)

### [5.0.1](https://github.com/nuxt-community/firebase-module/compare/v5.0.0...v5.0.1) (2020-03-15)


### Bug Fixes

* **module:** fix firebase-auth-sw only loaded when serverLogin === true ([35c434b](https://github.com/nuxt-community/firebase-module/commit/35c434b4a36cf69b72e4ee03828b04eb10217997))

## [5.0.0](https://github.com/nuxt-community/firebase-module/compare/v4.2.2...v5.0.0) (2020-03-15)


### ⚠ BREAKING CHANGES

* **auth:** moved sessionLifetime configuration key
* **auth:** moved configuration key
* **auth:** api changes
* **auth:** success mutation/action properties removed in lieu of sign in/out mutations/actions
* **auth:** set user object on res.locals.user as stipulated with @lupas

### Features

* **auth:** finialize server auth after tests ([2f829a4](https://github.com/nuxt-community/firebase-module/commit/2f829a4fd25d0999c14c9b5fb7b613f8a96c641a))
* **auth:** implement ignorePaths config for ssr functionality ([82a6c2d](https://github.com/nuxt-community/firebase-module/commit/82a6c2dcd8ebf895e9f9d8c71f6327642120d680)), closes [#87](https://github.com/nuxt-community/firebase-module/issues/87) [#117](https://github.com/nuxt-community/firebase-module/issues/117)
* **auth:** implement persistence preset for auth service ([b576f23](https://github.com/nuxt-community/firebase-module/commit/b576f23e3dffccb0874b4a6572e097d80a9d886a)), closes [#122](https://github.com/nuxt-community/firebase-module/issues/122)
* **auth:** implement server side authentication ([b545b74](https://github.com/nuxt-community/firebase-module/commit/b545b7495dfd4f696fd4972a7919c3a2784bd36c))
* **auth:** implement server side client sdk sessions ([3e07b01](https://github.com/nuxt-community/firebase-module/commit/3e07b0128410c594b0d3eaab3dddd25fd0cb314e))
* **auth:** implement sign in/out mutations and actions ([4b4800e](https://github.com/nuxt-community/firebase-module/commit/4b4800e2cc328f62952ebe062c4519b08d97a24b)), closes [#118](https://github.com/nuxt-community/firebase-module/issues/118)
* **auth:** simplify auth state changed handler ([02b13a2](https://github.com/nuxt-community/firebase-module/commit/02b13a244c2aa44bc23dcebe065cb900984d6c58))


### Bug Fixes

* **auth:** update createServerMiddleware function to be default export ([1d6eb46](https://github.com/nuxt-community/firebase-module/commit/1d6eb464c04d4189fcbdd72cba3dd4be12823d87))
* **auth:** update import statement to point to correct file ([2e299af](https://github.com/nuxt-community/firebase-module/commit/2e299afa81278dec40919b0b6d8ef215d71e89a4))
* **auth:** update variable names in render:routeDone ([a93ed39](https://github.com/nuxt-community/firebase-module/commit/a93ed39cc00b67e2b16da17a5a5b66bb0c9403c0))
* **auth:** use error logger on auth verification failure ([82e1a82](https://github.com/nuxt-community/firebase-module/commit/82e1a82763b8cb63fc32b17c0fb89dae39ab2c02))
* **types:** augment correct interface in http module ([7704581](https://github.com/nuxt-community/firebase-module/commit/7704581c9286b1f9f2d086c0893b91e6d6c2a925))
* **types:** update AuthServiceConfig interface ([577c880](https://github.com/nuxt-community/firebase-module/commit/577c880c5c397ae89df8fb7f95c12e9c5d220ab2))
* **types:** update server response augmentation ([0419d12](https://github.com/nuxt-community/firebase-module/commit/0419d129936689df2773edddfd89538814d0ac1e))
* **types:** update types to make ssr options optional ([99bfcde](https://github.com/nuxt-community/firebase-module/commit/99bfcdea9b906e0354f93f4e00c6e236be7a2068))


* **auth:** update documentation ([316894b](https://github.com/nuxt-community/firebase-module/commit/316894b47aafcc53e7f1497608db1f3bf935759a))

### [4.2.2](https://github.com/nuxt-community/firebase-module/compare/v4.2.1...v4.2.2) (2020-03-10)

### [4.2.1](https://github.com/nuxt-community/firebase-module/compare/v4.2.0...v4.2.1) (2020-03-10)

## [4.2.0](https://github.com/nuxt-community/firebase-module/compare/v4.1.0...v4.2.0) (2020-03-10)


### Features

* add option to add fireStore.settings() in nuxt.config.js ([21e32c1](https://github.com/nuxt-community/firebase-module/commit/21e32c1d57457370efc0a8e679033335ee656c09))


### Bug Fixes

* updated firebase version for firebase-auth-sw ([2d460a8](https://github.com/nuxt-community/firebase-module/commit/2d460a856fb234a4f9e005c85a7029baadccde01))

## [4.1.0](https://github.com/nuxt-community/firebase-module/compare/v4.0.0...v4.1.0) (2020-02-28)


### Features

* use consola instead of console ([1d209d8](https://github.com/nuxt-community/firebase-module/commit/1d209d8cb62c549f562036bf7e60690e15bcdbf6))


### Bug Fixes

* add types ([cd8ef74](https://github.com/nuxt-community/firebase-module/commit/cd8ef7470ff7c2844f58c540a4d302a76f3c2ad8))
* added links to license ([d3320e8](https://github.com/nuxt-community/firebase-module/commit/d3320e8ce57fa7bc11e6bfb4a246fc1f59771152))
* delete broken "related" link ([e845d40](https://github.com/nuxt-community/firebase-module/commit/e845d4001114f0d3fa1727dc01d72541cd08eec6))
* re-added unintentionally removed isEmpty() ([559b510](https://github.com/nuxt-community/firebase-module/commit/559b5101e4927a41fb0c105abdede7a443668eb3))
