const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { limiter } = require('./middlewares/rateLimit');
const centralErrorHandler = require('./middlewares/centralErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { cors } = require('./middlewares/cors');

const config = require('./utils/config');

const app = express();

const router = require('./routes');

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
  await mongoose.connect(config.MONGO_URL, {});
  console.log(`Server connect db ${config.MONGO_URL}`);
  await app.listen(config.PORT);
  console.log(`Server listen port ${config.PORT}`);
}

connect();
