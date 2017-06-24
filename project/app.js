var mongoose = require('mongoose');

mongoose.Promise = require('q').Promise;
mongoose.connect('mongodb://localhost/hs-theorycraftr');

require('./services/user.service.server.js');
require('./services/deck.service.server.js');
