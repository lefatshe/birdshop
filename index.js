// name of App 'Free Bird'
process.env.TMPDIR = 'tmp'; 
process.env.NODE_ENV = process.env.NODE_ENV || 'development' || 'production';

var mongoose = require('./config/mongoose');
var express = require('./config/express');
var passport = require('./config/passport');


var db = mongoose();
var app = express();
var passport = passport();

   
app.set('port', (process.env.PORT || 5000));


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});