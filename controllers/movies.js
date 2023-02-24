const Movie = require('../models/movie');
const ForbiddenError = require('../errors/forbidden-err');
const IncorrectError = require('../errors/incorrect-err');
const NotFoundError = require('../errors/not-found-err');

const {
  INCORRECT_MOVIES_DATA_ERROR_MESSAGE,
  DATA_MOVIES_NOT_FOUND_ERROR_MESSAGE,
  FORBIDDEN_ERROR_MESSAGE,
} = require('../utils/errorCode');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

const saveMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create({ ...req.body, owner: req.user._id });
    await movie.populate('owner');
    res.send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      throw new IncorrectError(INCORRECT_MOVIES_DATA_ERROR_MESSAGE);
    } else {
      next(err);
    }
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params._id);
    if (!movie) throw new NotFoundError(DATA_MOVIES_NOT_FOUND_ERROR_MESSAGE);
    if (movie.owner.toString() !== req.user._id) throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE);
    await movie.delete();
    res.send(movie);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new IncorrectError(INCORRECT_MOVIES_DATA_ERROR_MESSAGE));
    } else {
      next(err);
    }
  }
};
// sdasdasds

module.exports = {
  getMovies,
  saveMovie,
  deleteMovie,
};
