const router = require('express').Router();

const {
  register,
  login,
} = require('../controllers/users');

const {
  objectSignUpValidator,
  objectSignInValidator,
} = require('../validators/authCelebrate');

router.post('/signup', objectSignUpValidator, register);

router.post('/signin', objectSignInValidator, login);

module.exports = router;
