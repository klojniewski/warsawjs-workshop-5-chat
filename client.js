const config = require('./config/env.json')
const SERVER_ADDRESS = `http://${config.address}:${config.port}`
const connection = require('socket.io-client')(SERVER_ADDRESS)
const readline = require('readline')
const util = require('util')
const EOL = require('os').EOL
const colors = require('colors')// eslint-disable-line

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const writeLine = function (line, ...args) {
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  process.stdout.write(util.format(line, ...args) + EOL)
  rl.prompt(true)
}

let credentials = {
  login: null,
  password: null,
  isLoggedIn: false
}

let connected = false

const sendLogin = function () {
  connection.emit('login', credentials)
}

const chatCommands = {
  login: (login, password) => {
    credentials = {
      login,
      password
    }
    if (connected) {
      sendLogin()
    }
  }
}

// subscribe to events
connection
  .on('connect', () => {
    connected = true
    writeLine(`Connected to server: ${SERVER_ADDRESS}`.yellow)
    if (connected && credentials.login) {
      sendLogin()
    }
  })
  .on('disconnect', () => {
    connected = false
    writeLine(`Disconnected from the server.`.yellow)
  })
  .on('message', message => {
    writeLine(`${message.from}: ${message.body}`)
  })
  .on('login', result => {
    if (result) {
      rl.setPrompt(`${credentials.login} > `)
      writeLine(`Successfully logged in as "${credentials.login}"!`.green)
      credentials.isLoggedIn = true
    } else {
      writeLine(`Wrong login or password`.red)
    }
  })

rl.setPrompt('> ')
rl.prompt()

rl.on('line', body => {
  if (body.charAt(0) === '/') {
    const params = body.split(' ')
    const commandName = params[0].substring(1)
    if (chatCommands[commandName]) {
      chatCommands[commandName].apply(undefined, [params[1], params[2]])
    }
  } else {
    if (credentials.isLoggedIn) {
      connection.emit('message', body)
    } else {
      writeLine(`Please login before sending the message.`.red)
    }
  }
  rl.prompt()
})
