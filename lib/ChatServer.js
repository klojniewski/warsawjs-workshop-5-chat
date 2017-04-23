class ChatServer {
  constructor ({ io, config, auth }) {
    this._io = io
    this._config = config
    this._auth = auth
  }
  init () {
    const io = this._io
    io.on('connection', socket => {
      const clientData = {
        login: null
      }
      // watch for messages
      socket
        .on('message', body => {
          // send received message to all clients
          if (clientData.login) {
            io.sockets.emit('message', { body, from: clientData.login })
          }
        })
        .on('login', data => {
          clientData.login = data.login
          this._auth.validate(data.login, data.password).then(result => {
            socket.emit('login', result)
            io.sockets.emit('userEnter', data.login)
          })
        })
        .on('register', data => {
          this._auth.register(data.login, data.password).then(result => {
            socket.emit('register', result)
          })
        })
        .on('disconnect', info => {
          io.sockets.emit('userLeft', clientData.login)
        })
    })
    console.info(`Server started: http://${this._config.socketAddress}:${this._config.socketPort}`)
  }
}

module.exports = ChatServer
