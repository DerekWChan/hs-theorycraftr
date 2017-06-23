(function() {
  angular
    .module('HearthstoneTheorycraftr')
    .controller('deckEditorController', deckEditorController);

  function deckEditorController($location, $routeParams, deckService) {
    var model = this;
    model.userId = $routeParams.userId;
    model.deckId = $routeParams.deckId;
    model.updateDeck = updateDeck;
    model.deleteDeck = deleteDeck;

    function init() {
      model.deck = deckService.findDeckById(model.deckId);
    }
    init();

    function updateDeck(newInfo) {
      if (model.deck !== null) {
        deckService.updateDeck(model.deckId, newInfo);
        $location.url('/user/' + model.userId + '/decks');
      } else {
        model.message = "Unable to update deck.";
      }
    }

    function deleteDeck() {
      deckService.deleteDeck(model.deckId);
      $location.url('/user/' + model.userId + '/decks');
    }
  }
})();
