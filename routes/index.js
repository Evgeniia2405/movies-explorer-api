const router = require('express').Router();
const authRouter = require('./auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');

const { PAGE_NOT_FOUND_ERROR_MESSAGE } = require('../utils/errorCode');

router.use('/', authRouter);

router.use(auth);

router.use('/', usersRouter);
router.use('/', moviesRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError(PAGE_NOT_FOUND_ERROR_MESSAGE));
});

module.exports = router;
