var mongoose = require('mongoose');
var cardSchema = require('./card.schema.server.js');
var cardModel = mongoose.model('CardModel', cardSchema);

cardModel.addCardToDeck = addCardToDeck;
cardModel.findAllCardsInDeck = findAllCardsInDeck;
cardModel.findCardCopiesInDeck = findCardCopiesInDeck;

module.exports = cardModel;

function addCardToDeck(card, deckId) {
  card._deck = deckId;
  return cardModel.create(card);
}

function findAllCardsInDeck(deckId) {
  return cardModel.find({
    _deck: deckId
  });
}

function findCardCopiesInDeck(cardId, deckId) {
  return cardModel.find({
    _deck: deckId,
    cardId: cardId
  });
}
