var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let methodOverride = require('method-override')
var session = require('express-session');
var passport = require('passport')


// load the env vars
require('dotenv').config();

var app = express();

//connect to the MongoDB with mongoose
require('./config/database');

//configure passport.js
require('./config/passport');

//routers
var indexRouter = require('./routes/index');
var categoriesRouter = require('./routes/categories')
var linksRouter = require('./routes/links')
var usersRouter = require('./routes/users');
var favouritesRouter = require('./routes/favourites')

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware
app.use(methodOverride('_method'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'ResourceVault',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())


//Routes
app.use('/', indexRouter);
app.use('/categories', categoriesRouter);
app.use('/', linksRouter);
app.use('/', usersRouter);
app.use('/', favouritesRouter);

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
