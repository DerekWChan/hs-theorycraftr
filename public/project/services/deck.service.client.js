(function() {
  angular
    .module('HearthstoneTheorycraftr')
    .factory('deckService', deckService);

  function deckService($http) {
    var api = {
      createDeck: createDeck,
      updateDeck: updateDeck,
      deleteDeck: deleteDeck,
      findDeckById: findDeckById,
      findAllDecksByUser: findAllDecksByUser,
      findAllCardsForDeck: findAllCardsForDeck
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
  }
})();
