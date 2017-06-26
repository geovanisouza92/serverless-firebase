const functions = require('firebase-functions')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const next = require('next')

// NOTE: Dev mode doesn't work like a charm :/
// (Same problem reported at https://github.com/zeit/next.js/issues/2123)
const app = next({ dev: false })
const handle = app.getRequestHandler()

exports.next = functions.https.onRequest((req, res) => {
  return app.prepare().then(() => handle(req, res))
})
