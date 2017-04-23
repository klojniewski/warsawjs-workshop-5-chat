const config = require('./config/env.json');
const yaml = require('js-yaml')
const fs = require('fs')
const ChatServer = require('./lib/ChatServer')
const socketio = require('socket.io')

try {
  const config = yaml.safeLoad(fs.readFileSync('./config/env.yaml', 'utf8'));
  const io = new socketio(config.socketPort)
  const server = new ChatServer ({ io, config })
  server.init()
} catch (e) {
  console.log(e);
}
