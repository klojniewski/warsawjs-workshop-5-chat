class ChatServer {
  constructor ({ io, config }) {
    this._io = io
    this._config = config
  }
  init () {
    const io = this._io
    io.on('connection', socket => {
      let login = null
      // watch for messages
      socket.on('message', ({ body }) => {
        // send received message to all clients
        io.sockets.emit('message', { body })
      })
    })
    console.info(`Server started: http://${this._config.socketAddress}:${this._config.socketPort}`)
  }
}

module.exports = ChatServer
