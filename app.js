const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const pkg = require('./package.json');

const env = process.env.NODE_ENV || 'development';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// expose package.json to views
app.use(function (req, res, next) {
    res.locals.pkg = pkg;
    res.locals.env = env;
    next();
});

app.use('/', require('./routes/index'));
app.use('/', require('./routes/card/create'));
app.use('/', require('./routes/card/find'));
app.use('/', require('./routes/card/remove'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    let message = 'An error occurred. Please try again later.';
    let statusCode = err.status || 500;

    if (req.app.get('env') === 'development' && statusCode > 400 && statusCode < 500) {
        message = err.message;
    }

    // render the error page
    res.status(statusCode);
    return res.json({
        'message': message
    });
});

module.exports = app;
