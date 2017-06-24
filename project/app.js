var mongoose = require("mongoose");

mongoose.Promise = require('q').Promise;
mongoose.connect('mongodb://127.0.0.1/hs-theorycraftr');

require('./services/user.service.server.js');
require('./services/deck.service.server.js');
