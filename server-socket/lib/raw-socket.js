var WebSocketServer = require('websocket').server
var http = require('http')

function RawSocket (RawSocketPort, callback) {
  var PORT = RawSocketPort || 3000

  var server = http.createServer(function (request, response) {
    console.log((new Date()) + ' Received request for ' + request.url)
    response.writeHead(404)
    response.end()
  })
  server.listen(PORT, function () {
    console.log((new Date()) + ' Server is listening on port ' + PORT)
  })

  var wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
  })

  function originIsAllowed (origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true
  }

  wsServer.on('request', function (request) {

    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject()
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.')
      return
    }

    var connection = request.accept('arduino', request.origin)
    console.log((new Date()) + ' Connection accepted.')

    connection.on('message', function (message) {
      console.log('DATa ', message);
      if (message.type === 'utf8') {
        // console.log('Received Message: ' + message.utf8Data)
        callback(message.utf8Data)
        console.log(message.utf8Data)
        //connection.sendUTF(message.utf8Data)
      } else if (message.type === 'binary') {
        console.log('Received Binary Message of ' + message.binaryData.length + ' bytes')
        connection.sendBytes(message.binaryData)
      }
    })

    connection.on('close', function (reasonCode, description) {
      console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.')
    })

    connection.sendUTF('Hallo Client!')
  })

  return wsServer
}
module.exports = RawSocket
