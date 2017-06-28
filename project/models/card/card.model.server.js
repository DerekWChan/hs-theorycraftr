var mongoose = require('mongoose');
var cardSchema = require('./card.schema.server.js');
var cardModel = mongoose.model('CardModel', cardSchema);

cardModel.addCardToDeck = addCardToDeck;
cardModel.removeCardFromDeck = removeCardFromDeck;
cardModel.findAllCardsInDeck = findAllCardsInDeck;
cardModel.findCardCopiesInDeck = findCardCopiesInDeck;

module.exports = cardModel;

function addCardToDeck(card, deckId) {
  card._deck = deckId;
  return cardModel.create(card);
}

function removeCardFromDeck(cardId, deckId) {
  return cardModel.remove({
    _id: cardId,
    _deck: deckId
  });
}

function findAllCardsInDeck(deckId) {
  return cardModel.find({
      _deck: deckId
    })
    .sort({
      cost: 1,
      name: 1
    });
}

function findCardCopiesInDeck(cardId, deckId) {
  return cardModel.find({
    _deck: deckId,
    cardId: cardId
  });
}
