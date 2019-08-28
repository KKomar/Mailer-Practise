var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');

var index = require("./routes");
var registration = require("./routes/registration");
var login = require("./routes/login");
var send = require("./routes/send");
var clients = require("./routes/clients");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 * 1024 }
}));
app.use(cors());
app.use(logger('dev'));
app.use(express.json({limit: '100MB'}));
app.use(express.urlencoded({ limit: '100MB', extended: false, parameterLimit: 50000 }));
// app.use(bodyParser.json({limit: "50mb"}));
// app.use(bodyParser.urlencoded({limit: "50mb", extended: false, parameterLimit:50000 }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", index);
app.use('/registration', registration);
app.use('/login', login);
app.use('/clients', clients);
app.use('/send', send);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;