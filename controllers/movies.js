const Movie = require('../models/movie');
const ForbiddenError = require('../errors/forbidden-err');
const IncorrectError = require('../errors/incorrect-err');
const NotFoundError = require('../errors/not-found-err');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

const saveMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    } = req.body;
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner: req.user._id,
    });
    await movie.populate('owner');
    res.send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      throw new IncorrectError('Переданы некорректные данные при сохранении фильма');
    }
    next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params._id);
    if (!movie) throw new NotFoundError('Фильм с указанным _id не найден');
    if (movie.owner.toString() !== req.user._id) throw new ForbiddenError('Это карточка другого пользователя, вы не можете ее удалить');
    await movie.delete();
    res.send(movie);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new IncorrectError('Переданы некорректные данные фильма'));
    }
    next(err);
  }
};
// sdasdasds

module.exports = {
  getMovies,
  saveMovie,
  deleteMovie,
};
