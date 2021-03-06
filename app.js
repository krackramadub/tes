var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
var user_data = require('./routes/user_data');
var avatar = require('./routes/avatar');
var api = require('./routes/api');
var moderationRouter = require('./routes/moderation'); //подключение модуля поддержки

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//jwt secret
app.set('secret', 'qweasdetwfhsdfhasdbqweuabsd');

app.use(logger('dev'));
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', user_data.router);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(moderationRouter);
app.use('/avatar', avatar);
app.use('/api', api);
app.use('/avatar', avatar);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
