const config = require('./config.json');
const io = require('socket.io')(config.port);

console.info(`Server started: http://${config.address}:${config.port}`)

io.on('connection', socket => {
  let login = null
  // watch for messages
  socket.on('message', ({ body }) => {
    // send received message to all clients
    io.sockets.emit('message', { body })
  })
})
