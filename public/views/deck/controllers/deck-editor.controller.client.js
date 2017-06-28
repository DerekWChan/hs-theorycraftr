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
          });
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
      if (model.deckList.length >= 30) {
        model.message = "Your deck is already full!";
        return;
      } else {
        deckService.findCardCopiesInDeck(card.cardId, model.deckId)
          .then(function(response) {
            // legendary check
            if (card.rarity === 'Legendary' && response.length >= 1) {
              model.message = "There can only be one \'" + card.name + "\' in a deck.";
              return;
            }
            if (response.length >= 2) { // max copy check
              model.message = "There are already two copies of \'" + card.name + "\' in your deck.";
              return;
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
      deckService.removeCardFromDeck(card._id, model.deckId)
        .then(function() {
          $route.reload();
        });
    }
  }
})();
