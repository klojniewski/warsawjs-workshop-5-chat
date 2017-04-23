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

connection
  .on('connect', () => {
    console.log(`Client connected to: ${SERVER_ADDRESS}`)
  })
  .on('message', ({ body }) => {
    writeLine(`Server says: ${body}`)
  })

rl.setPrompt('> ')
rl.prompt()

rl.on('line', body => {
  connection.emit('message', { body })
  rl.prompt()
})
