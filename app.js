var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
 
//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
 
var app = express();
const port = 3030;
 
// view engine setup
app.engine('pug', require('pug').__express)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'))
app.use(express.static('files'))
app.use(express.static('views'))
app.use(express.static(path.join(__dirname, 'public')));
 
// app.use(requestHandler()) // ? Ez minek?
 
//For non existing paths
//app.use('/static', express.static('public'))
 
const generalRouter = require('./routes/general');
const homeRouter = require('./routes/home');
const calendarRouter = require('./routes/calendar');
const sdkRouter = require('./routes/sdkHandler');
 
//Responses
app.get('/', function (req, res) {
    res.render('FrontEnd/homepage')
  })

app.get('/login', function (req, res) {
    res.render('FrontEnd/login-page')
  })
 
app.get('/settings', function (req, res) {
    res.render('FrontEnd/settings')
  })
app.get('/mydrone', function (req, res) {
    res.render('FrontEnd/my-drone')
  })
app.get('/history', function (req, res) {
    res.render('FrontEnd/history-page')
  })
  app.get('/rawdata', function (req, res) {
      res.render('FrontEnd/backend-data')
    })
app.get('/control', function (req, res) {
    res.render('FrontEnd/drone-controller')
  })

  app.get('/asd', (req,res) =>{
    res.render('index', {
      title: 'Hello, world!',
      content: 'How are you?'
    })
  })

/*
app.post('/submitSdkRequest', function (req, res) {
    res.send(data)
  })
  
app.post('/testSubmitRequest', function (req, res) {
    res.send(data)
  })
*/


 
  app.post('/', function (req, res) {
    res.send('Got a POST request')
  })
 
  app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user')
  })
 
  app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user')
  })
 
  app.use('/', generalRouter);
  app.use('/home', homeRouter);
  app.use('/calendar', calendarRouter);
  app.use('/sdkHandler', sdkRouter);
 
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
 
app.listen(port, () => {
  console.log(`Drone app listening at http://localhost:${port}`);
});


 
module.exports = app;