const functions = require('firebase-functions')
const url = require('url')
const next = require('next')

var app, handle

if (!/\/tmp/.test(__dirname)) {
  // NOTE: Dev mode doesn't work like a charm :/
  // (Same problem reported at https://github.com/zeit/next.js/issues/2123)
  // NOTE: Probably this should be a configuration
  const dev = /* process.env.NODE_ENV !== 'production' */ false
  const conf = {
    // NOTE: Probably this should be a configuration
    assetPrefix: '/serverless-firebase/us-central1/next',
    distDir: 'next'
  }

  // FIXME: Firebase deploy command tries to load the code, causing an error,
  // so, we delay app initialization
  app = next({ dev, conf })
  handle = app.getRequestHandler()
}

exports.next = functions.https.onRequest((req, res) => {
  return app.prepare().then(() =>
    handle(req, res, url.parse(req.url, true))
  )
})
