(function() {
  angular
    .module('HearthstoneTheorycraftr')
    .factory('deckService', deckService);

  function deckService($http) {
    var api = {
      createDeck: createDeck,
      updateDeck: updateDeck,
      deleteDeck: deleteDeck,
      findAllDecks: findAllDecks,
      searchDecks: searchDecks,
      findDeckById: findDeckById,
      findAllDecksByUser: findAllDecksByUser,
      findAllCardsForDeck: findAllCardsForDeck,
      addCardToDeck: addCardToDeck,
      removeCardFromDeck: removeCardFromDeck
    };
    return api;

    function createDeck(newDeck) {
      var url = "/api/user/:userId/deck"

      return $http.post(url, newDeck)
        .then(function(response) {
          return response.data;
        });
    }

    function updateDeck(deckId, newInfo) {
      var url = '/api/user/:userId/deck/' + deckId;

      return $http.put(url, newInfo)
        .then(function(response) {
          return response.data;
        });
    }

    function deleteDeck(deckId) {
      var url = '/api/user/:userId/deck/' + deckId;

      return $http.delete(url)
        .then(function(response) {
          return response.data;
        });
    }

    function findAllDecks() {
      var url = '/api/decks';

      return $http.get(url)
        .then(function(response) {
          return response.data;
        });
    }

    function searchDecks(query) {
      var url = '/api/decks/search';

      return $http.get(url, query)
        .then(function(response) {
          return response.data;
        });
    }

    function findDeckById(deckId) {
      var url = '/api/user/:userId/deck/' + deckId;

      return $http.get(url)
        .then(function(response) {
          return response.data;
        });
    }

    function findAllDecksByUser(userId) {
      var url = '/api/user/' + userId + '/decks';

      return $http.get(url)
        .then(function(response) {
          return response.data;
        });
    }

    function findAllCardsForDeck(format, playerClass) {
      var url = '/api/user/:userId/deck/:deckId/catalog?format=' + format + '&playerClass=' + playerClass;

      return $http.get(url)
        .then(function(response) {
          return response.data;
        });
    }

    function addCardToDeck(card, deckId) {
      var url = '/api/user/:userId/deck/' + deckId + '/cards/add';

      return $http.put(url, card)
        .then(function(response) {
          return response.data;
        });
    }

    function removeCardFromDeck(card, deckId) {
      var url = '/api/user/:userId/deck/' + deckId + '/cards/remove';

      return $http.put(url, card)
        .then(function(response) {
          return response.data;
        });
    }
  }
})();
