var app = require('../../express');
var unirest = require('unirest');
var deckModel = require('../models/deck/deck.model.server.js');

app.post('/api/user/:userId/deck', createDeck);
app.post('/api/decks/search', searchDecks);
app.get('/api/decks', findAllDecks);
app.get('/api/user/:userId/deck/:deckId', findDeckById);
app.get('/api/user/:userId/decks', findAllDecksByUser);
app.get('/api/user/:userId/deck/:deckId/catalog', findAllCardsForDeck);
app.put('/api/user/:userId/deck/:deckId', updateDeck);
app.put('/api/user/:userId/deck/:deckId/cards/add', addCardToDeck);
app.put('/api/user/:userId/deck/:deckId/cards/remove', removeCardFromDeck);
app.put('/api/user/:userId/deck/:deckId/comment/new', addCommentToDeck);
app.put('/api/user/:userId/deck/:deckId/upvote', upvoteDeck);
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

function findAllDecks(req, res) {
  deckModel.findAllDecks()
    .then(function(decks) {
      res.json(decks);
    });
}

function searchDecks(req, res) {
  var searchTerms = req.body;

  deckModel.searchDecks(searchTerms)
    .then(function(decks) {
      res.json(decks);
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

function findAllCardsForDeck(req, res) {
  var format = req.query.format;
  var playerClass = req.query.playerClass;

  unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/" + playerClass + "?collectible=1")
    .header("X-Mashape-Key", "7IgAiQK5C5msh3xE6nKH4BYZGKihp1ZHiyejsn91ZKfHr3qHjg")
    .end(function(result) {
      res.json(result.body);
      return;
    });
}

function addCardToDeck(req, res) {
  var deckId = req.params.deckId;
  var card = req.body;
  card.copyNum = new Date().getTime();

  deckModel.addCardToDeck(card, deckId)
    .then(function() {
      res.sendStatus(200);
    });
}

function removeCardFromDeck(req, res) {
  var deckId = req.params.deckId;
  var card = req.body;

  deckModel.removeCardFromDeck(card, deckId)
    .then(function() {
      res.sendStatus(200);
    });
}

function addCommentToDeck(req, res) {
  var deckId = req.params.deckId;
  var newComment = req.body;

  deckModel.addCommentToDeck(newComment, deckId)
    .then(function() {
      res.sendStatus(200);
    })
}

function upvoteDeck(req, res) {
  var deckId = req.params.deckId;

  deckModel.upvoteDeck(deckId)
    .then(function() {
      res.sendStatus(200);
    });
}
