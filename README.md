# nacelle-littledata-nuxt-module

Adds a Nuxt plugin for integrating [Littledata](https://www.littledata.io/) in your [Nacelle](https://getnacelle.com/) Nuxt project. This plugin makes it easier to add the Google Analytics clientId to checkout attributes, as documented in step 4 of Littledata's [headless setup guide](https://headlessdemo.littledata.io/).

## Requirements

- A Nacelle project [set up locally](https://docs.getnacelle.com/quick-start.html).
- Google Analytics [set up for Nacelle](https://docs.getnacelle.com/deployment/deployment-netlify.html#facebook-google-anaytics-tracker-variables).
- Littledata [setup](https://headlessdemo.littledata.io/).

### Add Module to Nacelle

Once you have Nacelle, Google Analytics and Littledata set up you can install this module in your project from `npm`:

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

Then add the Google Analytics client ID to your checkout process in `cart.js` by using the new function that has been added to your project `$getLittledataMetafield` like so:

```
const processCheckoutObject = await this.$nacelle.checkout
  .process({
    cartItems: getters.checkoutLineItems,
    checkoutId: getters.checkoutIdForBackend,
    metafields: [await this.$getLittledataMetafield()]
  })
  ...
```
