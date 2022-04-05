const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

// My Module
const {connection} = require('./db');
const authenticationRouter = require('./routes/authentication');
const produkRouter = require('./routes/produk');
const pageSettingRouter = require('./routes/pageSetting');
const indexRouter = require('./routes/index');
const artikelRouter = require('./routes/artikel');
const User = require("./model/user");

const app = express();

//Db Connection
connection();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: false, limit: '50mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//session
app.use(session({
    secret: 'SeeN',
    saveUninitialized: true,
    resave: false
}));

//flash
app.use(flash());

//passport
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());


// use route
app.use('/', authenticationRouter);
app.use('/', produkRouter);
app.use('/', pageSettingRouter);
app.use('/', indexRouter);
app.use('/', artikelRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
