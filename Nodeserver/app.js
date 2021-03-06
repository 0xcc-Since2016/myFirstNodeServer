var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes 	   = require('./routes/index');
var filmDetail = require('./routes/filmDetail');
var session    = require('./routes/session');
var picksit    = require('./routes/picksit');
var bill       = require('./routes/bill'); 
var seaRch     = require('./routes/seaRch');
var finish     = require('./routes/finish');
var res        = require('./routes/res');
var nores      = require('./routes/nores');

//var reg    = require('./routes/reg');
//var login  = require('./routes/login');
//var logout = require('./routes/logout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieParser('0xcc'));
//app.use(session({secret : '0xcc'})); Why Cannot Use Session?.
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/filmDetail', filmDetail);
app.use('/session', session);
app.use('/picksit', picksit);
app.use('/bill', bill);
app.use('/seaRch',seaRch);
app.use('/finish',finish);
app.use('/res',res);
app.use('/nores',nores);
//app.use('/login', login);
//app.use('/logout', logout);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(80);
module.exports = app;
