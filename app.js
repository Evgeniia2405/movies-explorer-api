const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { limiter } = require('./middlewares/rateLimit');
const centralErrorHandler = require('./middlewares/centralErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { cors } = require('./middlewares/cors');

dotenv.config();

const app = express();

const {
  PORT = 4000,
  MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;

const router = require('./routes/index');

app.use(cors);

app.use(requestLogger); // подключаем логгер запросов

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(limiter);

mongoose.set('strictQuery', false);

app.use('/', router);

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate

app.use(centralErrorHandler);

async function connect() {
  await mongoose.connect(MONGO_URL, {});
  console.log(`Server connect db ${MONGO_URL}`);
  await app.listen(PORT);
  console.log(`Server listen port ${PORT}`);
}

connect();
