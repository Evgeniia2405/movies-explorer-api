const bcrypt = require('bcrypt'); // импортируем bcrypt
const User = require('../models/user');

const { generateToken } = require('../utils/jwt');

const ConflictError = require('../errors/conflict-err');
const IncorrectError = require('../errors/incorrect-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const NotFoundError = require('../errors/not-found-err');
const {
  SOLT_ROUNDS,
} = require('../utils/constants');

const {
  MONGO_DUPLICATE_ERROR_CODE,
  MONGO_DUPLICATE_USER_ERROR_MESSAGE,
  MONGO_DUPLICATE_MAIL_ERROR_MESSAGE,
  DATA_USER_NOT_FOUND_ERROR_MESSAGE,
  INCORRECT_USER_DATA_ERROR_MESSAGE,
  AUTHORIZED_ERROR_MESSAGE,
} = require('../utils/errorCode');

const getUserMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) throw new NotFoundError(DATA_USER_NOT_FOUND_ERROR_MESSAGE);
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new IncorrectError(INCORRECT_USER_DATA_ERROR_MESSAGE));
    } else {
      next(err);
    }
  }
};

const register = async (req, res, next) => {
  try {
    const {
      email,
      password,
      name,
    } = req.body;
    const hash = await bcrypt.hash(password, SOLT_ROUNDS);
    const userNew = await User.create({
      email,
      password: hash,
      name,
    });
    res.send({
      email: userNew.email,
      name: userNew.name,
      id: userNew._id,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new IncorrectError(INCORRECT_USER_DATA_ERROR_MESSAGE));
    }
    if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
      next(new ConflictError(MONGO_DUPLICATE_USER_ERROR_MESSAGE));
    } else {
      next(err);
    }
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedError(AUTHORIZED_ERROR_MESSAGE);
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      // хеши не совпали — отклоняем промис
      throw new UnauthorizedError(AUTHORIZED_ERROR_MESSAGE);
    }
    // аутентификация успешна
    const token = generateToken({ _id: user._id });
    res.send({ message: 'Всё верно!', token });
  } catch (err) {
    next(err);
  }
};

const editUser = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { email, name },
      {
        new: true, // обработчик then получит на вход обновлённую запись
        runValidators: true, // данные будут валидированы перед изменением
      },
    );
    if (!user) throw new NotFoundError(DATA_USER_NOT_FOUND_ERROR_MESSAGE);
    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new IncorrectError(INCORRECT_USER_DATA_ERROR_MESSAGE));
    } else if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
      next(new ConflictError(MONGO_DUPLICATE_MAIL_ERROR_MESSAGE));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getUserMe,
  register,
  login,
  editUser,
};
