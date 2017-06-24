var app = require('../../express');

var decks = [{
    _id: "1",
    creatorId: "1",
    name: "Burgle Rogue",
    playerClass: "Rogue",
    format: "Wild",
    description: "4THEMEMES",
    cards: [{
      "cardId": "EX1_116",
      "dbfId": "559",
      "name": "Leeroy Jenkins",
      "cardSet": "Classic",
      "type": "Minion",
      "faction": "Alliance",
      "rarity": "Legendary",
      "cost": 5,
      "attack": 6,
      "health": 2,
      "text": "<b>Charge</b>. <b>Battlecry:</b> Summon two 1/1 Whelps for your opponent.",
      "flavor": "At least he has Angry Chicken.",
      "artist": "Gabe from Penny Arcade",
      "collectible": true,
      "elite": true,
      "playerClass": "Neutral",
      "img": "http://media.services.zam.com/v1/media/byName/hs/cards/enus/EX1_116.png",
      "imgGold": "http://media.services.zam.com/v1/media/byName/hs/cards/enus/animated/EX1_116_premium.gif",
      "locale": "enUS",
      "mechanics": [{
          "name": "Charge"
        },
        {
          "name": "Battlecry"
        }
      ]
    }]
  },
  {
    _id: "2",
    creatorId: "1",
    name: "OTK Priest",
    playerClass: "Priest",
    format: "Wild",
    description: "Prophet Velen MVP",
    cards: {}
  },
  {
    _id: "3",
    creatorId: "1",
    name: "Dino Hunter",
    playerClass: "Hunter",
    format: "Standard",
    description: "rawr",
    cards: {}
  }
];

app.post('/api/user/:userId/deck', createDeck);
app.get('/api/user/:userId/deck/:deckId', findDeckById);
app.get('/api/user/:userId/decks', findAllDecksByUser);
app.put('/api/user/:userId/deck/:deckId', updateDeck);
app.delete('/api/user/:userId/deck/:deckId', deleteDeck);

function createDeck(req, res) {
  var newDeck = req.body;

  decks.push(newDeck);
  res.json(newDeck);
}

function updateDeck(req, res) {
  var deckId = req.params.deckId;
  var newInfo = req.body;

  for (var d in decks) {
    var deck = decks[d];
    if (deck._id === deckId) {
      for (var key in newInfo) {
        if (newInfo[key] !== '') {
          deck[key] = newInfo[key];
        }
      }
      res.sendStatus(200);
      return;
    }
  }
  res.sendStatus(404);
}

function deleteDeck(req, res) {
  var deckId = req.params.deckId;

  for (var d in decks) {
    var deck = decks[d];
    if (deck._id === deckId) {
      decks.splice(d, 1);
      res.sendStatus(200);
      return;
    }
  }
  res.sendStatus(404);
}

function findDeckById(req, res) {
  var deckId = req.params.deckId;

  for (var d in decks) {
    var deck = decks[d];
    if (deck._id === deckId) {
      res.json(deck);
      return;
    }
  }
  res.sendStatus(404);
}

function findAllDecksByUser(req, res) {
  var userId = req.params.userId;
  var decksFound = [];

  for (var d in decks) {
    var deck = decks[d];
    if (deck.creatorId === userId) {
      decksFound.push(deck);
    }
  }
  res.json(decksFound);
  res.sendStatus(200);
}
