var mongoose = require('mongoose');
var cardSchema = require('../card/card.schema.server.js');
var commentSchema = require('../comment/comment.schema.server.js');
var deckSchema = mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel'
  },
  name: String,
  createdOn: {
    type: Date,
    default: Date.now
  },
  format: String,
  playerClass: String,
  description: String,
  _cards: {
    type: [cardSchema]
  },
  upvotes: {
    type: Number,
    default: 0
  },
  _comments: {
    type: [commentSchema]
  }
}, {
  collection: 'decks'
});

module.exports = deckSchema;
