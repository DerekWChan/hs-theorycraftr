(function() {
  angular
    .module('HearthstoneTheorycraftr')
    .factory('deckService', deckService);

  function deckService() {
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
    var api = {
      createDeck: createDeck,
      updateDeck: updateDeck,
      deleteDeck: deleteDeck,
      findDeckById: findDeckById,
      findAllDecksByUser: findAllDecksByUser
    };
    return api;

    function createDeck(newDeck) {
      decks.push(newDeck);
    }

    function updateDeck(deckId, newInfo) {
      for (var d in decks) {
        var deck = decks[d];
        if (deck._id === deckId) {
          for (var key in newInfo) {
            if (newInfo[key] !== '') {
              deck[key] = newInfo[key];
            }
          }
        }
      }
    }

    function deleteDeck(deckId) {
      for (var d in decks) {
        var deck = decks[d];
        if (deck._id === deckId) {
          decks.splice(d, 1);
        }
      }
    }

    function findDeckById(deckId) {
      for (var d in decks) {
        var deck = decks[d];
        if (deck._id === deckId) {
          return deck;
        }
      }
      return null;
    }

    function findAllDecksByUser(userId) {
      var decksFound = [];

      for (var d in decks) {
        var deck = decks[d];
        if (deck.creatorId === userId) {
          decksFound.push(deck);
        }
      }
      return decksFound;
    }
  }
})();
