var mongoose = require('mongoose');
var cardSchema = mongoose.Schema({
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
});

module.exports = cardSchema;
