(function() {
  angular
    .module('HearthstoneTheorycraftr')
    .controller('deckEditorController', deckEditorController);

  function deckEditorController($location, $routeParams, $route, currentUser, deckService) {
    var model = this;
    model.currentUser = currentUser;
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
        deckService.catalogAllCardsForDeck(model.deck.format, model.deck.playerClass)
          .then(function(response) {
            model.cardCatalog = response;
          });
        deckService.findAllCardsInDeck(model.deck._id)
          .then(function(response) {
            model.deckList = response;
          })
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
          $location.url('/user/' + model.userId + '/decks');
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
      if (model.deck._cards.length === 30) {
        model.message = "Your deck is already full!";
      } else {
        deckService.findCardCopiesInDeck(card.cardId, model.deckId)
          .then(function(response) {
            if (response.length === 2) {
              model.message = "There can only be two copies of " + card.name + " in a deck!";
            } else {
              deckService.addCardToDeck(card, model.deckId)
                .then(function() {
                  $route.reload();
                });
            }
          });
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
