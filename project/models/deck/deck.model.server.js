var mongoose = require('mongoose');
var deckSchema = require('./deck.schema.server.js');
var deckModel = mongoose.model('DeckModel', deckSchema);

module.exports = deckModel;
