const level = require('level')
const thenLevel = require('then-levelup')
const bcrypt = require('bcrypt')

class LevelAuth {
  constructor (path) {
    this._db = thenLevel(level(path))
  }
  validate (login, password) {
    return this._db.get(login).then(passwordHash => {
      return bcrypt.compare(password, passwordHash).then(res => {
          return Promise.resolve(res)
      });
    }, error => {
      return false
    })
  }
  register (login, password) {
    return this._db.get(login).then({
    }, () => {
      return bcrypt.hash(password, 12).then(hashedPassword => {
        return this._db.put(login, hashedPassword).then(() => {
          return this._db.get(login);
        })
      })
    })
  }
}

module.exports = LevelAuth
