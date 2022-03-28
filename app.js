const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const { ValidationError } = require('express-validation');

const indexRouter = require('./routes/index');
const postRouter = require('./routes/post');

const app = express();

require('./db');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/post', postRouter);

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(500).json(err);
});

module.exports = app;
