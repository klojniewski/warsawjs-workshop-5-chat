class Auth {
  constructor (userPasswords) {
    this._userPasswords = new Map()
    Object.keys(userPasswords).forEach(login => {
      this._userPasswords.set(login, userPasswords[login])
    })
  }
  validate (login, password) {
    if (this._userPasswords.has(login) &&  this._userPasswords.get(login) === password) {
      return Promise.resolve(true)
    } else {
      return Promise.resolve(false)
    }
  }
  register (login, password) {
    if (!this._userPasswords.has(login)) {
      this._userPasswords.set(login, password)
      return Promise.resolve(true)
    } else {
      return Promise.resolve(false)
    }
  }
}

module.exports = Auth
