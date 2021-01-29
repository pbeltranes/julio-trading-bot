const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
// const moment = require('moment')
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config()
// Services
const db = require('./src/loaders/mongodb');
const julios = require('./src/services/julio');
// const cron = require('./API/v1/services/cron')

const app = express();
const corsOptions = {};
// // Routes
// const routesV1 = require('./API/v1/routes')
// Expert.xmlToJson({date: moment().subtract(1, 'days'), type: 'Ingresadas'})

app.use(cors(corsOptions));
app.use(helmet());
// app.options('*', cors())
app.use(express.json());

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cookieParser());

app.get('/', (req, res) => {
  res.status(200).send('API LD :D');
});
// app.use('/api/v1', routesV1)
app.use((req, res, next) => {
  next(createError(404));
});
db.init();

julios.getMarketValues();
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  return res.status(404).send();
});

module.exports = app;
