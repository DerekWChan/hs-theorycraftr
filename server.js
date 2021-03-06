var app = require('./express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'process.env.SESSION_SECRET'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.express.static(__dirname + '/public'));

require("./project/app.js");

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('That minion\'s attack is over ' + port + '!');
});
