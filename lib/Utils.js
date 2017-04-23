const util = require('util')
const EOL = require('os').EOL

const writeLine = function (line, ...args) {
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  process.stdout.write(util.format(line, ...args) + EOL)
  rl.prompt(true)
}

module.exports.writeLine = writeLine
