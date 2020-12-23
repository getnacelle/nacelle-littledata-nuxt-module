export const getGoogleClientId = (error) => {
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
          const message = `Google Client Id not found: ${err}`;

          if (typeof error === "function") {
            error({ statusCode: 403, message });
          }

          reject(message);
        }
      });
    } else {
      console.warn(
        "Could not initiate Littledata. " +
          "This can be a result of a browser extension which blocks GA, " +
          "or a missing `nacelle.gaID` in nuxt.config.js"
      );

      resolve("");
    }
  });
};

export default ({ error }, inject) => {
  inject("getLittleDataMetafield", async () => {
    return { key: "google-clientID", value: await getGoogleClientId(error) };
  });
};
