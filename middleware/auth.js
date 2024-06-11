const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization');

    if (!token) {
      throw new Error('No token provided');
    }

    if (!token.startsWith('Bearer ')) {
      throw new Error('Invalid token format');
    }

    const tokenWithoutBearer = token.replace('Bearer ', '');
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id, 'tokens.token': tokenWithoutBearer });

    if (!user) {
      throw new Error('User not found');
    }

    req.token = tokenWithoutBearer;
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error.message);
    res.status(401).send({ error: 'Authentication failed' });
  }
};

module.exports = auth;
