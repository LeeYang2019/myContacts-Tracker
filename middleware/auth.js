const jwt = require('jsonwebtoken');
const config = require('config');

/**
 * Middleware function that takes in a header token and returns a verified user
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
module.exports = function (req, res, next) {
  //get token from header
  const token = req.header('x-auth-token');

  //check if token exists
  if (!token) {
    res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    //if token exists verify and return user
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    //assign user to user
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
