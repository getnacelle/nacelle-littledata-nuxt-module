export const getGoogleClientId = () => {
  return new Promise((resolve, reject) => {
    let gaClient = process.client ? window.ga : undefined;

    if (gaClient) {
      gaClient =
        gaClient ||
        function () {
          (gaClient.q = gaClient.q || []).push(arguments);
        };

      gaClient.l = +new Date();

      const fallback = setTimeout(() => resolve(""), 4000);

      gaClient(function () {
        try {
          const tracker = gaClient.getAll()[0];
          const clientId = tracker && tracker.get("clientId");

          clearTimeout(fallback);

          return resolve(clientId);
        } catch (err) {
          reject(`Google Analytics Client ID not found: ${err}`);
        }
      });
    } else {
      console.warn(
        "Could not send GA client ID to Littledata due to missing `window.ga` - " +
          "this can be a result of a browser extension which blocks GA, " +
          "or a missing `nacelle.gaID` in nuxt.config.js"
      );

      resolve("");
    }
  });
};

export default (_ctx, inject) => {
  inject("getLittledataMetafield", async () => {
    return { key: "google-clientID", value: await getGoogleClientId() };
  });
};
