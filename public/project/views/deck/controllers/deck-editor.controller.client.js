(function() {
  angular
    .module('HearthstoneTheorycraftr')
    .controller('deckEditorController', deckEditorController);

  function deckEditorController($location, $routeParams, $route, deckService) {
    var model = this;
    model.userId = $routeParams.userId;
    model.deckId = $routeParams.deckId;
    model.updateDeck = updateDeck;
    model.deleteDeck = deleteDeck;

    function init() {
      deckService.findDeckById(model.deckId)
        .then(deckFound, deckNotFound);

      function deckFound(response) {
        model.deck = response;
      }

      function deckNotFound() {
        model.deck = null;
      }
    }
    init();

    function updateDeck(newInfo) {
      if (model.deck !== null) {
        deckService.updateDeck(model.deckId, newInfo)
          .then(updateSuccess, updateFailure);

        function updateSuccess() {
          $route.reload();
        }

        function updateFailure() {
          model.message = "Unable to update deck.";
        }
      }
    }

    function deleteDeck() {
      deckService.deleteDeck(model.deckId)
        .then(deleteSuccess, deleteFailure);

        function deleteSuccess() {
          $location.url('/user/' + model.userId + '/decks');
        }

        function deleteFailure() {
          model.message = "Unable to delete deck.";
        };
    }
  }
})();
