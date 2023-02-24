const router = require('express').Router();

const {
  getUserMe,
  editUser,
} = require('../controllers/users');

const {
  objectUserValidator,
} = require('../validators/usersCelebrate');

router.get('/users/me', getUserMe);

router.patch('/users/me', objectUserValidator, editUser);

module.exports = router;
