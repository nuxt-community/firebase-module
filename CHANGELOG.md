# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [7.5.0](https://github.com/nuxt-community/firebase-module/compare/v7.4.1...v7.5.0) (2021-02-18)


### Features

* **terminatedatabasesaftergenerate:** added 'terminateDatabasesAfterGenerate' config ([4df37a7](https://github.com/nuxt-community/firebase-module/commit/4df37a7add07caa711d556fc00c331ffe66e164e)), closes [#451](https://github.com/nuxt-community/firebase-module/issues/451)


### Bug Fixes

* **config:** made "databaseUrl" config value optional ([fbb4a7d](https://github.com/nuxt-community/firebase-module/commit/fbb4a7d92be913a81905a36405ee6cc80bdf2a67)), closes [#458](https://github.com/nuxt-community/firebase-module/issues/458)
* **firestore:** call useEmulator after enablePersistence to fix "already started" issue ([bc16b45](https://github.com/nuxt-community/firebase-module/commit/bc16b45a712e3c6400f7c9f8fa1af4233679b46c)), closes [#451](https://github.com/nuxt-community/firebase-module/issues/451)

### [7.4.1](https://github.com/nuxt-community/firebase-module/compare/v7.4.0...v7.4.1) (2021-01-20)


### Bug Fixes

* **auth:** fixes build error appearing when auth.initialize is not set ([71c3fb0](https://github.com/nuxt-community/firebase-module/commit/71c3fb024fe0795cfa67f4230dd1634acb785ac1)), closes [#446](https://github.com/nuxt-community/firebase-module/issues/446)

## [7.4.0](https://github.com/nuxt-community/firebase-module/compare/v7.3.3...v7.4.0) (2021-01-19)


### Features

* **auth:** added onIdTokenChanged() handlers to auth.initialize ([fcf0846](https://github.com/nuxt-community/firebase-module/commit/fcf08463621b36e597dc31d9c542c46632a5beb9)), closes [#411](https://github.com/nuxt-community/firebase-module/issues/411)

### [7.3.3](https://github.com/nuxt-community/firebase-module/compare/v7.3.2...v7.3.3) (2021-01-18)


### Bug Fixes

* **forceinject:** fixed issue in lazy-mode that did not allow to initialize services in nuxt plugins ([c5b5cb3](https://github.com/nuxt-community/firebase-module/commit/c5b5cb34148bda432d1320567cf5a9118bb394b0)), closes [#366](https://github.com/nuxt-community/firebase-module/issues/366)

### [7.3.2](https://github.com/nuxt-community/firebase-module/compare/v7.3.1...v7.3.2) (2021-01-17)


### Bug Fixes

* **forceinject:** fixed forceInject failing when ...ready() is called in a plugin in lazy mode ([c15222f](https://github.com/nuxt-community/firebase-module/commit/c15222fb3374aa7abadac9ed59c7fd4935d9d19a)), closes [#366](https://github.com/nuxt-community/firebase-module/issues/366)

### [7.3.1](https://github.com/nuxt-community/firebase-module/compare/v7.3.0...v7.3.1) (2021-01-17)


### Bug Fixes

* **lazy:** fixed fireModule not being injected if ready() functions are only called in V-components ([3f37365](https://github.com/nuxt-community/firebase-module/commit/3f37365dfa5091244569710f3865c00018468e71)), closes [#366](https://github.com/nuxt-community/firebase-module/issues/366)

## [7.3.0](https://github.com/nuxt-community/firebase-module/compare/v7.2.3...v7.3.0) (2020-12-28)


### Features

* **messaging sw:** allow users to inject a string into the messaging sw ([7e6174f](https://github.com/nuxt-community/firebase-module/commit/7e6174fc50aebc88f48228630580b9ede88fdcb1))

### [7.2.3](https://github.com/nuxt-community/firebase-module/compare/v7.2.2...v7.2.3) (2020-12-28)

### [7.2.2](https://github.com/nuxt-community/firebase-module/compare/v7.2.1...v7.2.2) (2020-12-23)


### Bug Fixes

* **auth:** fixed issue where Firestore did not work in SSR because of Auth not being initialized ([9482f16](https://github.com/nuxt-community/firebase-module/commit/9482f1650c31050265febd558d79d345791100d5))
* **firestore-emulator:** fixed issue that caused useEmulator to be triggered multiple times in SSR ([ebac666](https://github.com/nuxt-community/firebase-module/commit/ebac6669524100fe303e4ba30a69b332f241fb85)), closes [#390](https://github.com/nuxt-community/firebase-module/issues/390)
* **messaging:** fixed error with onFirebaseHosting in sw trying to load scripts from /__/ on lh ([383b9cd](https://github.com/nuxt-community/firebase-module/commit/383b9cdeb10c26233c4f8e73f0cedda31d7486d6)), closes [#379](https://github.com/nuxt-community/firebase-module/issues/379)

### [7.2.1](https://github.com/nuxt-community/firebase-module/compare/v7.2.0...v7.2.1) (2020-12-22)


### Bug Fixes

~~* **auth**: fixed 'auth' being initialized on server-side, which lead to a memory leak in SSR mode (daa9b9e), closes #399~~

⚠️⚠️⚠️ Release had a bug, please upgrade to v7.2.2. ⚠️⚠️

## [7.2.0](https://github.com/nuxt-community/firebase-module/compare/v7.1.2...v7.2.0) (2020-12-22)


### Features

* **auth:** added disableEmulatorWarnings option ([1de60b9](https://github.com/nuxt-community/firebase-module/commit/1de60b9c3cd4ea22df28beaf3a3646a8315fb5e6)), closes [#415](https://github.com/nuxt-community/firebase-module/issues/415)

### [7.1.2](https://github.com/nuxt-community/firebase-module/compare/v7.1.1...v7.1.2) (2020-12-08)


### Bug Fixes

* **types:** fixed fcmPublicVapidKey not correctly placed in .d.ts ([0c5c4a7](https://github.com/nuxt-community/firebase-module/commit/0c5c4a7077009294e60797dc3d4d0923bb907cf3))

### [7.1.1](https://github.com/nuxt-community/firebase-module/compare/v7.1.0...v7.1.1) (2020-11-14)


### Bug Fixes

* **auth-emulator-ssr:** call useEmulator in auth ssr service-worker, if emulator is in use ([004e696](https://github.com/nuxt-community/firebase-module/commit/004e696e90c0be06573a9038439fb910efaee84f))

## [7.0.0](https://github.com/nuxt-community/firebase-module/compare/v6.1.1...v7.0.0) (2020-10-31)

## [7.1.0](https://github.com/nuxt-community/firebase-module/compare/v7.0.2...v7.1.0) (2020-11-05)


### Features

* **emulators:** added options to connect to emulators for Firestore & RealtimeDB ([c724e1c](https://github.com/nuxt-community/firebase-module/commit/c724e1c3245620a62f54529b3929ea79f75c938f))

### [7.0.2](https://github.com/nuxt-community/firebase-module/compare/v7.0.1...v7.0.2) (2020-11-05)


### Bug Fixes

* **messaging:** fixed "actions" not properly passed to messaging-sw ([53d48f7](https://github.com/nuxt-community/firebase-module/commit/53d48f7db7c2b2af5bbf9870a19e01804053f139))
* found action is always first action ([31d0586](https://github.com/nuxt-community/firebase-module/commit/31d058611786b514e085f48d71f44120ef83559c))

## [7.0.1](https://github.com/nuxt-community/firebase-module/compare/v7.0.0...v7.0.1) (2020-11-05)

### Bug Fixes

* **types:** added missing types (emulatorHost etc.) ([2a76c6b](https://github.com/nuxt-community/firebase-module/commit/eec46c5ea92561076c4d6013750c0b708dbd981f))

## [7.0.0](https://github.com/nuxt-community/firebase-module/compare/v6.1.1...v7.0.0) (2020-10-31)


### Features

* **analytics.issupported:** added check whether browser supports Firebase Analytics before init ([52ec6ef](https://github.com/nuxt-community/firebase-module/commit/52ec6efa6c1cfbd0ddaac4a73676f948da4d807e))
* **auth:** added initialize.subscribeManually and removed "helper" function ([91ad279](https://github.com/nuxt-community/firebase-module/commit/91ad2792f142f7fcf22f0775242dc7330e485230))
* **firebase-v8:** updated code to work with Firebase v8+ ([4ae48b5](https://github.com/nuxt-community/firebase-module/commit/4ae48b51bc35f007c89bcc46febeded30f288893))
* **functions:** added emulatorHost option to Firebase Functions ([08db302](https://github.com/nuxt-community/firebase-module/commit/08db302013fdac1213e783f6cd860ca62cc15cbe))
* add support for lazy service loading ([4e96d28](https://github.com/nuxt-community/firebase-module/commit/4e96d28a43014c85a01a0c4c953f756bd2ec0812))


### Bug Fixes

* **analytics:** Fixed service naming issue ([addd317](https://github.com/nuxt-community/firebase-module/commit/addd317c7abf4ea9d70bd17943411f11cdaefac4))
* **auth:** Fixed initialize ([c4b203d](https://github.com/nuxt-community/firebase-module/commit/c4b203d5a6d1aea521e70097a47c1b104b02c044))
* **auth-credential:** fixed auth-credential import (require) ([faeed48](https://github.com/nuxt-community/firebase-module/commit/faeed4803908d7a262ac73759b1608ad91a6ef95))
* **auth-serverlogin:** fixed serverLogin issue (ctx.res missing) ([edd1a75](https://github.com/nuxt-community/firebase-module/commit/edd1a755401fcd25886644554325dcaf6778e89d))
* **fireObj:** fireObj was not injected in non-lazy + non-legacy mode ([dc66991](https://github.com/nuxt-community/firebase-module/commit/dc6699171c1e35552f7a02f093adb4ac329b9f46))
* **initauth:** async import of initAuth within auth plugin ([36eb8f4](https://github.com/nuxt-community/firebase-module/commit/36eb8f490797f9cc7a03216f18806c1a93cd8700))
* **initAuth:** Fixed mmissing options in initAuth & small lazy mode fix ([8e54384](https://github.com/nuxt-community/firebase-module/commit/8e54384dd1109439a0c33f358b1c30a009a27002))
* **legacymodeinfo:** fixed error 'Cannot use 'in' operator to search for 'legacyMode' in undefined ' ([0684e64](https://github.com/nuxt-community/firebase-module/commit/0684e64bb708a2b4fdee23b2c3a6d8f73f117a68))
* **loggerinfo:** added module name to legyMode info log because it's not clear on multi-line log ([cb85c29](https://github.com/nuxt-community/firebase-module/commit/cb85c291dec1508068b34b5d363bde601cdd1318))
* **naming:** Improved readability by consistanly naming services constants ([0d62e76](https://github.com/nuxt-community/firebase-module/commit/0d62e7618df69bb63fca01b7f3a3a214ed32d280))
* **netlify:** updated netlify.toml ([26f5aa9](https://github.com/nuxt-community/firebase-module/commit/26f5aa9aaa0ad1ff4dc6903178547acc1904097c))
* **packageejson:** missing comma ([a6669fc](https://github.com/nuxt-community/firebase-module/commit/a6669fc872751077b3b089648e76276ac20f1512))
* **remoteconfig:** fixed 'defaultConfig' being child of 'settings' instead of main obj ([7e1020c](https://github.com/nuxt-community/firebase-module/commit/7e1020c3c024c2b938f8a339a38d700036f46605))
* **static:** fixed static=true also dynamically importing the modules ([cf61833](https://github.com/nuxt-community/firebase-module/commit/cf61833da715799cf88914d45b8eed62993d6933))
* **ts:** Added ready() to $fire and added missing 'storage' ([bb78d3a](https://github.com/nuxt-community/firebase-module/commit/bb78d3a6e3348430201a0c8cf5220b981e6603db))
* **ts:** Fixed $fire.database ([6bd9df9](https://github.com/nuxt-community/firebase-module/commit/6bd9df9560436d3db59afaa8a88391a779024520))
* make initAuth work again ([db8a467](https://github.com/nuxt-community/firebase-module/commit/db8a467db2e865c4ea0c570cce276bf635400368))
* review comments ([f5265ae](https://github.com/nuxt-community/firebase-module/commit/f5265aecf210978ce333d6bd7621676a4ad12719))
* use existing injection name ([a6971ac](https://github.com/nuxt-community/firebase-module/commit/a6971acc0d440b3553975e40a09d819d0d8c1077))
* use service mapping ([33489a1](https://github.com/nuxt-community/firebase-module/commit/33489a17a1f35d95680f79ac98d31a16c1412df5))
* use service mapping ([bd16287](https://github.com/nuxt-community/firebase-module/commit/bd1628735f333b448562b9eda5cc5a9d3e9d9e06))

### [6.1.1](https://github.com/nuxt-community/firebase-module/compare/v6.1.0...v6.1.1) (2020-07-25)


### Bug Fixes

* **types:** improve typing of locals ([407eb2c](https://github.com/nuxt-community/firebase-module/commit/407eb2cd492adac282fd869d32eb9a2095e6060d))

## [6.1.0](https://github.com/nuxt-community/firebase-module/compare/v6.0.1...v6.1.0) (2020-06-29)


### Features

* **analytics:** added collectionEnabled option to analytics ([5da8a19](https://github.com/nuxt-community/firebase-module/commit/5da8a19e1b6b70f78c5d9701ecd71d767a4a4627))


### Bug Fixes

* typo in README ([c0158c9](https://github.com/nuxt-community/firebase-module/commit/c0158c90abeeceb2e39aa7c5322a365988de0623))

### [6.0.1](https://github.com/nuxt-community/firebase-module/compare/v6.0.0...v6.0.1) (2020-06-08)


### Bug Fixes

* **bug:** fixed "Cannot read property 'memoryOnly' of undefined" bug ([8f69cc3](https://github.com/nuxt-community/firebase-module/commit/8f69cc3681fbb9eab51817bcdcb5d9bc8240178e)), closes [#224](https://github.com/nuxt-community/firebase-module/issues/224)

## [6.0.0](https://github.com/nuxt-community/firebase-module/compare/v5.2.0...v6.0.0) (2020-06-07)


### ⚠ BREAKING CHANGES

* **messaging:** Messaging expects payloads to be delivered according to the new HTTP v1 API.

### Features

* **auth:** add idToken to user's payload ([97d8055](https://github.com/nuxt-community/firebase-module/commit/97d805591cbc3073417f755e0ae9e6c0ed20bed3)), closes [#202](https://github.com/nuxt-community/firebase-module/issues/202)
* **firestore:** added memoryOnly option to firestore ([efde3fe](https://github.com/nuxt-community/firebase-module/commit/efde3fedb448cc60661a3cf5f67e5d13b195d578)), closes [#135](https://github.com/nuxt-community/firebase-module/issues/135)
* **messaging:** implement notificationKey setting ([a985f02](https://github.com/nuxt-community/firebase-module/commit/a985f02e5e45b4c5c64bc4597bf9a41650f23bda))
* **messaging:** migrated to HTTP v1 API for messaging ([9c09a26](https://github.com/nuxt-community/firebase-module/commit/9c09a266472d90e9f9809312006476addddab64e))


### Bug Fixes

* **auth:** add 127.0.0.1 support ([c8b6114](https://github.com/nuxt-community/firebase-module/commit/c8b6114582cc1acc478b886bf5f05c5d05209fed)), closes [#203](https://github.com/nuxt-community/firebase-module/issues/203)
* **messaging:** only pass notificationKey to messaging sw ([5958b25](https://github.com/nuxt-community/firebase-module/commit/5958b251dcffeb5002408f4e275ad41886224b1c))
* **types:** specify preliminary types ([d03799c](https://github.com/nuxt-community/firebase-module/commit/d03799c87f23352bf9404a3abbafad98267fc43d))

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
