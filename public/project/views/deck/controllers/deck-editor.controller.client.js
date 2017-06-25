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
    model.addCardToDeck = addCardToDeck;
    model.removeCardFromDeck = removeCardFromDeck;

    function init() {
      // Initialize model.deck
      deckService.findDeckById(model.deckId)
        .then(deckFound, deckNotFound);

      function deckFound(response) {
        model.deck = response;
        deckService.findAllCardsForDeck(response.format, response.playerClass)
          .then(function(response) {
            model.cardCatalog = response;
          });
      }

      function deckNotFound() {
        model.deck = null;
      }
    }
    init();

    function updateDeck(newInfo) {
      console.log(model.deck);
      if (model.deck !== null) {
        deckService.updateDeck(model.deckId, newInfo)
          .then(updateSuccess, updateFailure);

        function updateSuccess() {
          $route.reload();
        }

        function updateFailure() {
          model.message = "Unable to update deck";
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
        model.message = "Unable to delete deck";
      };
    }

    function addCardToDeck(card) {
      deckService.addCardToDeck(card, model.deckId)
        .then(addSuccess, addFailure);

      function addSuccess() {
        $route.reload();
      }

      function addFailure() {
        model.message = "Unable to add " + card.name;
      }
    }

    function removeCardFromDeck(card) {
      deckService.removeCardFromDeck(card, model.deckId)
        .then(function() {
          $route.reload();
        });
    }
  }
})();
