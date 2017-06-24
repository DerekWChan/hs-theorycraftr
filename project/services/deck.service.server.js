var app = require('../../express');
var deckModel = require('../models/deck/deck.model.server.js');

app.post('/api/user/:userId/deck', createDeck);
app.get('/api/user/:userId/deck/:deckId', findDeckById);
app.get('/api/user/:userId/decks', findAllDecksByUser);
app.put('/api/user/:userId/deck/:deckId', updateDeck);
app.delete('/api/user/:userId/deck/:deckId', deleteDeck);

function createDeck(req, res) {
  var newDeck = req.body;

  deckModel.createDeck(newDeck)
    .then(function(newDeck) {
      res.json(newDeck);
    });
}

function updateDeck(req, res) {
  var deckId = req.params.deckId;
  var newInfo = req.body;

  deckModel.updateDeck(deckId, newInfo)
    .then(function() {
      res.sendStatus(200);
    });
}

function deleteDeck(req, res) {
  var deckId = req.params.deckId;

  deckModel.deleteDeck(deckId)
    .then(function() {
      res.sendStatus(200);
    });
}

function findDeckById(req, res) {
  var deckId = req.params.deckId;

  deckModel.findDeckById(deckId)
    .then(function(deck) {
      res.json(deck);
    });
}

function findAllDecksByUser(req, res) {
  var userId = req.params.userId;

  deckModel.findAllDecksByUser(userId)
    .then(function(decks) {
      res.json(decks);
    });
}
