const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authConfig = require('../config/auth.config');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    req.authenticated = false;
    req.userId = null;
    return next();
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, authConfig.secret);

    req.userId = decoded.id;
    req.user = await User.findOne({_id: decoded.id});
    req.authenticated = true;
    return next();
  } catch (e) {
    return res.status(401).send({error: 'Invalid token'});
  }
};