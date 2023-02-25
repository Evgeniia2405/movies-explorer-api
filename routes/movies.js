const router = require('express').Router();

const {
  getMovies,
  saveMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  objectMovieValidator,
  objectMovieIdValidator,
} = require('../validators/moviesCelebrate');

router.get('/movies', getMovies);

router.post('/movies', objectMovieValidator, saveMovie);

router.delete('/movies/:_id', objectMovieIdValidator, deleteMovie);

module.exports = router;
