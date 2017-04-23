const config = require('./config/env.json')
const SERVER_ADDRESS = `http://${config.address}:${config.port}`
const connection = require('socket.io-client')(SERVER_ADDRESS)
const readline = require('readline')
const util = require('util')
const EOL = require('os').EOL

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

// fake authorization
connection.emit('login', {
  login: `chris-${Date.now()}`,
  pass: 'koko12'
})

// subscribe to events
connection
  .on('message', message => {
    writeLine(`${message.from}: ${message.body}`)
  })
  .on('login', result => {
    if (result) {
      writeLine(`Successfully logged in!`)
    } else {
      writeLine(`Wrong login or password`)
    }
  })

rl.setPrompt('> ')
rl.prompt()

rl.on('line', body => {
  connection.emit('message', body)
  rl.prompt()
})


