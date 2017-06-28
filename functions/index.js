const functions = require("firebase-functions")
const next = require("next")

var app, handle

// FIXME: Firebase deploy command tries to load the code, causing an error,
// so, we delay app initialization
if (!/\/tmp/.test(__dirname)) {
  // NOTE: Dev mode doesn't work like a charm :/
  // (Same problem reported at https://github.com/zeit/next.js/issues/2123)
  app = next({ dev: false, conf: { assetPrefix: "/next", distDir: "next" } })
  handle = app.getRequestHandler()
}

exports.next = functions.https.onRequest((req, res) => {
  return app.prepare().then(() => handle(req, res))
})
