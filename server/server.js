// Starts two processes
// 1. subscribes to cached list of all known Nomad streams, and updates database (currently firebase)
// 2. starts http server that exposes endpoint for new streams to announce their existence

const http = require('http')
const R = require('ramda')
const Nomad = require('nomad-stream')

const serverPort = 9000

const compositeId = 'QmUhdBEXkXaRbdMHdTczPqcRyM6DciPJcjNkVogeTuwr4J'

const nomad = new Nomad()

let latestMessage = { key: '' }

function requestHandler(req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')

  const method = req.method
  const url = req.url
  // console.log(`received request ${method} to ${url}`)

  res.end(JSON.stringify(latestMessage))
}

// HTTP Server
const server = http.createServer(requestHandler)
server.listen(serverPort, (err) => {
  if (err) {
    console.log(`http server error: ${err}`)
  }
  console.log(`server is listening on ${serverPort}`)
})

nomad.subscribe(compositeId, (message) => {
  console.log(`got message ${message.message}`)
  latestMessage = message.message
})
