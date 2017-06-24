var mongoose = require('mongoose');
var deckSchema = mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel"
  },
  name: String,
  createdOn: {
    type: Date,
    default: Date.now
  },
  playerClass: String,
  format: String,
  description: String,
  cards: [String]
}, {
  collection: "decks"
});

module.exports = deckSchema;
