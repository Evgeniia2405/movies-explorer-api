const jwt = require('jsonwebtoken');

const UnauthorizedErr = require('../errors/unauthorized-err');

const config = require('../utils/config');

const { UNAUTHORIZED_ERROR_MESSAGE } = require('../utils/errorCode');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedErr(UNAUTHORIZED_ERROR_MESSAGE);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, config.JWT_KEY);
  } catch (err) {
    next(new UnauthorizedErr(UNAUTHORIZED_ERROR_MESSAGE));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
