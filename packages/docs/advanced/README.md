# Advanced

## Firebase Auth in Universal Mode <Badge text="EXPERIMENTAL" type="warn"/>

The nuxt-fire plugin provides helpers for the easy setup of **server-side authentication** via WebTokens and Cookies for Firebase Auth in **Nuxt Universal Mode (SSR)**.

#### Step 1 - Initialize Firebase Auth

Use the [auth.initialize option](/options/#auth) with at least `onSuccessMutation` and `setAuthCookie = true` defined. Make sure to create the respective mutation that saves the authUser to the state.

#### Step 2 - Add the parseFirebaseAuthCookie() helper

Add the `parseFirebaseAuthCookie()` helper function as follows to your nuxtServerInit action and commit the authUser object to the mutation defined in step 1.

```js
import { parseFirebaseAuthCookie } from 'nuxt-fire/src/helpers'

export default {
  nuxtServerInit({ commit }, ctx) {
    const { authUser } = parseFirebaseAuthCookie({ commit, req: ctx.req })
    if (authUser) {
      commit('SET_AUTH_USER', {
        authUser
      })
    }
  }
}
```

#### Step 3 - Delete cookie at logout

Make sure to delete the cookie at logout, e.g. in an action:

```js
import Cookie from "js-cookie";

async logoutUser({ commit }) {
    await this.$fireAuth.signOut()
    // Reset store
    commit("RESET_STORE");
    // ADD THIS LINE
    Cookie.remove("nuxt_fire_auth_access_token");
  }
}
```

## Usage with vuexfire

This [example](https://github.com/lupas/nuxt-fire-vuexfire-example) shows how to use both vuexfire and nuxt-fire together, working with SSR.
