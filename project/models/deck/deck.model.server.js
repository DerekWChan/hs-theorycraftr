var mongoose = require('mongoose');
var deckSchema = require('./deck.schema.server.js');
var deckModel = mongoose.model('DeckModel', deckSchema);

deckModel.createDeck = createDeck;
deckModel.updateDeck = updateDeck;
deckModel.deleteDeck = deleteDeck;
deckModel.findDeckById = findDeckById;
deckModel.findAllDecksByUser = findAllDecksByUser;
deckModel.addCardToDeck = addCardToDeck;
deckModel.removeCardFromDeck = removeCardFromDeck;

module.exports = deckModel;

function createDeck(newDeck) {
  return deckModel.create(newDeck);
}

function updateDeck(deckId, newInfo) {
  return deckModel.update({
    _id: deckId
  }, {
    $set: newInfo
  });
}

function deleteDeck(deckId) {
  return deckModel.remove({
    _id: deckId
  });
}

function findDeckById(deckId) {
  return deckModel.findById(deckId);
}

function findAllDecksByUser(userId) {
  return deckModel.find({
    _user: userId
  });
}

function addCardToDeck(card, deckId) {
  return deckModel.update({
    _id: deckId
  }, {
    $push: {
      cards: {
        $each: [card],
        $sort: {
          cost: 1
        }
      }
    }
  });
}

function removeCardFromDeck(card, deckId) {
  return deckModel.update({
    _id: deckId
  }, {
    $pull: {
      cards: card
    }
  });
}
