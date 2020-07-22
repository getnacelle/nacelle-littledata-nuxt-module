# nacelle-littledata-nuxt-module

Adds Nuxt plugin for integrating [LittleData](https://www.littledata.io/) in your [Nacelle](https://getnacelle.com/) Nuxt project.

## Requirements

- A Nacelle project set up locally. See https://docs.getnacelle.com for getting started.
- Google Analytics set up. See https://docs.getnacelle.com/deployment/deployment-netlify.html#facebook-google-anaytics-tracker-variables for getting started
- LittleData [setup](https://headlessdemo.littledata.io/).

### Add Module to Nacelle

Once you have Nacelle, Google Analytics and LittleData set up you can install this module in your project from `npm`:

```
npm install @nacelle/nacelle-littledata-nuxt-module --save
```

After the package has installed, open `nuxt.config.js`. Under `modules` add `@nacelle/nacelle-littledata-nuxt-module` to the array. It should look something like this:

```
modules: [
  '@nuxtjs/pwa',
  '@nuxtjs/dotenv',
  '@nacelle/nacelle-nuxt-module',
  '@nuxtjs/sitemap',
  '@nacelle/nacelle-littledata-nuxt-module'
],
```

Then add your the little data client id to your checkout process in `cart.js` by using the new function that has been added to your project `$getLittleDataMetafield` like so:

```
const processCheckoutObject = await this.$nacelle.checkout
  .process({
    cartItems: getters.checkoutLineItems,
    checkoutId: getters.checkoutIdForBackend,
    metafields: [await this.$getLittleDataMetafield()]
  })
  ...
```
