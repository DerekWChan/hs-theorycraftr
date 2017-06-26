var mongoose = require('mongoose');
var connectionString = 'mongodb://127.0.0.1:27017/hs-theorycraftr';

if (process.env.MLAB_USERNAME) {
  var username = process.env.MLAB_USERNAME;
  var password = process.env.MLAB_PASSWORD;
  connectionString = 'mongodb://' + username + ':' + password;
  connectionString += '@ds139362.mlab.com:39362/heroku_nzzfqv1s';
}

mongoose.Promise = require('q').Promise;
mongoose.connect(connectionString);

require('./services/user.service.server.js');
require('./services/deck.service.server.js');
