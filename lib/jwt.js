const jwt = require('jsonwebtoken')
const config = require('../config')
const { errors } = require('../utils/constants')

/* -- TOKEN HANDLERS --*/
exports.generateToken = (doc) => jwt.sign(doc, config.jwtSecret, {
  expiresIn: config.jwtExpiresIn,
});

exports.validateToken = (token) => {
  if (token) {
    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
      try {
        if (err || !decoded) {
          return { error: errors.AUTHENTICATION_FAILED }
        }
        return decoded
      } catch (error) {
        console.log(error)
        return { error: errors.AUTHENTICATION_FAILED }
      }
    });
  }
  return { error: errors.NO_TOKEN_PROVIDED }
};