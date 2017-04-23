class ChatServer {
  constructor ({ io, config }) {
    this._io = io
    this._config = config
  }
  init () {
    const io = this._io
    io.on('connection', socket => {
      const clientData = {
        login: null
      }
      // watch for messages
      socket
        .on('message', (body) => {
          // send received message to all clients
          if (clientData.login) {
            io.sockets.emit('message', { body, from: clientData.login })
          }
        })
        .on('login', (data) => {
          clientData.login = data.login
          const result = true
          socket.emit('login', { result })
        })
    })
    console.info(`Server started: http://${this._config.socketAddress}:${this._config.socketPort}`)
  }
}

module.exports = ChatServer
