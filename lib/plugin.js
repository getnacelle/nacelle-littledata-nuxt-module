export default ({ error }, inject) => {
  const getGoogleClientId = async () => {
    return new Promise((resolve) => {
      let gaClient = process.browser ? window.ga : undefined
      if (gaClient) {
        gaClient =
          gaClient ||
          function () {
            ;(gaClient.q = gaClient.q || []).push(arguments)
          }
        gaClient.l = +new Date()

        const fallback = window.setTimeout(function () {
          resolve('')
        }, 4000)
        gaClient(function () {
          window.clearTimeout(fallback)
          const tracker = gaClient.getAll()[0]
          const clientId = tracker && tracker.get('clientId')
          return resolve(clientId)
        })
      } else {
        const message = 'Google Client Id not found...'
        error({ statusCode: 403, message })
        reject(message)
      }
    })
  }
  inject('getLittleDataMetafield', async () => {
    return { key: 'google-clientID', value: await getGoogleClientId() }
  })
}
