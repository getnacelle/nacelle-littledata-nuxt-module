# [DEPRECATED]

This package is deprecated. To integrate a third party script with your Nuxt project, follow our docs here: https://docs.getnacelle.com/nuxt/external-scripts.html

# Nacelle Littledata Nuxt Module

Integrate [Littledata](https://www.littledata.io/) in your [Nacelle](https://getnacelle.com/) [Nuxt Starter](https://docs.getnacelle.com/nuxt/intro-nuxt.html) project

# nacelle-littledata-nuxt-module

This plugin makes it easier to add the Google Analytics client ID to checkout attributes, as documented in step 4 of Littledata's [headless setup guide](https://headlessdemo.littledata.io/).

## Prerequisites

- A Nacelle project [set up locally](https://docs.getnacelle.com/quick-start.html).
- Google Analytics [set up in the Nacelle Nuxt Starter](https://docs.getnacelle.com/deployment/deployment-netlify.html#facebook-google-anaytics-tracker-variables).
- Littledata [set up](https://headlessdemo.littledata.io/).

### Add Module to Nacelle

Once you have Nacelle, Google Analytics and Littledata set up you can install this module in your project from `npm`:

```
npm install @nacelle/nacelle-littledata-nuxt-module --save
```

In `nuxt.config.js`, add `@nacelle/nacelle-littledata-nuxt-module` to the `modules` array:

```js
modules: [
  // ...other modules,
  '@nacelle/nacelle-littledata-nuxt-module'
],
```

Finally, use the `$getLittledataMetafield` function to add the Google Analytics client ID to `$nacelle.checkout.process`:

```js
const processCheckoutObject = await this.$nacelle.checkout.process({
  cartItems: getters.checkoutLineItems,
  checkoutId: getters.checkoutIdForBackend,
  metafields: [await this.$getLittledataMetafield()],
});
```
