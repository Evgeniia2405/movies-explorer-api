const INCORRECT_DATA_ERROR_CODE = 400;
const UNAUTHORIZED_ERROR_CODE = 401;
const AUTHORIZED_BUT_FORBIDDEN_ERROR_CODE = 403;
const DATA_NOT_FOUND_ERROR_CODE = 404;
const CONFLICT_ERROR_CODE = 409;
const DEFAULT_ERROR_CODE = 500;
const MONGO_DUPLICATE_ERROR_CODE = 11000;

const UNAUTHORIZED_ERROR_MESSAGE = 'Необходима авторизация';
const INCORRECT_USER_DATA_ERROR_MESSAGE = 'Переданы некорректные данные пользователя';
const INCORRECT_MOVIES_DATA_ERROR_MESSAGE = 'Переданы некорректные данные фильма';
const AUTHORIZED_ERROR_MESSAGE = 'Неправильные почта или пароль';
const FORBIDDEN_ERROR_MESSAGE = 'Нельзя удалить фильм сохраненный другим пользователем';
const DATA_USER_NOT_FOUND_ERROR_MESSAGE = 'Пользователь с указанным _id не найден';
const DATA_MOVIES_NOT_FOUND_ERROR_MESSAGE = 'Фильм с указанным _id не найден';
const PAGE_NOT_FOUND_ERROR_MESSAGE = 'Ошибка 404: несуществующая страница';
const MONGO_DUPLICATE_USER_ERROR_MESSAGE = 'Такой пользователь уже существует';
const MONGO_DUPLICATE_MAIL_ERROR_MESSAGE = 'Такая почта уже существует';

module.exports = {
  INCORRECT_DATA_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
  AUTHORIZED_BUT_FORBIDDEN_ERROR_CODE,
  DATA_NOT_FOUND_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  MONGO_DUPLICATE_ERROR_CODE,
  MONGO_DUPLICATE_USER_ERROR_MESSAGE,
  MONGO_DUPLICATE_MAIL_ERROR_MESSAGE,
  DATA_USER_NOT_FOUND_ERROR_MESSAGE,
  INCORRECT_USER_DATA_ERROR_MESSAGE,
  AUTHORIZED_ERROR_MESSAGE,
  INCORRECT_MOVIES_DATA_ERROR_MESSAGE,
  DATA_MOVIES_NOT_FOUND_ERROR_MESSAGE,
  FORBIDDEN_ERROR_MESSAGE,
  UNAUTHORIZED_ERROR_MESSAGE,
  PAGE_NOT_FOUND_ERROR_MESSAGE,
};
