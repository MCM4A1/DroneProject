var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

//USE "npm run dev"  to start
 
var app = express();
const port = 3030;
 
// view engine setup
app.engine('pug', require('pug').__express)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))
app.use(express.static('files'))
app.use(express.static('views'))
app.use(express.static(path.join(__dirname, 'public')));

 
const generalRouter = require('./routes/general');
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
app.get('/auto', function (req, res) {
    res.render('FrontEnd/automatization')
  })




 
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