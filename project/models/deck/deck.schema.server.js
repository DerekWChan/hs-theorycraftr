var mongoose = require('mongoose');
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
  cards: [{
    cardId: String,
    dbfId: String,
    name: String,
    cardSet: String,
    type: String,
    faction: String,
    rarity: String,
    cost: Number,
    attack: Number,
    health: Number,
    text: String,
    artist: String,
    collectible: Boolean,
    elite: Boolean,
    playerClass: String,
    img: String,
    imgGold: String,
    locale: String,
    mechanics: [{
      name: String
    }]
  }]
}, {
  collection: 'decks'
});

module.exports = deckSchema;
