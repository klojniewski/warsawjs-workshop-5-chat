const config = require('./config/env.json')
const userPasswords = require('./users.json')
const yaml = require('js-yaml')
const fs = require('fs')
const ChatServer = require('./lib/ChatServer')
const Auth = require('./lib/Auth')
const socketio = require('socket.io')

class App {
  init () {
    const auth = new Auth(userPasswords)
    const config = yaml.safeLoad(fs.readFileSync('./config/env.yaml', 'utf8'));
    const io = new socketio(config.socketPort)
    const server = new ChatServer ({ io, config, auth })
    server.init()
  }
}

const chatApp = new App()
chatApp.init()
