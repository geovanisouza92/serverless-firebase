const httpProxy = require('http-proxy')

const target = 'http://localhost:5002/serverless-firebase/us-central1/next'

httpProxy.createProxyServer({ target }).listen(8000)
