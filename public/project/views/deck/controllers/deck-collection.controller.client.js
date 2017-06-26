(function() {
  angular
    .module('HearthstoneTheorycraftr')
    .controller('deckCollectionController', deckCollectionController);

  function deckCollectionController($location, $routeParams, currentUser, deckService) {
    var model = this;
    model.currentUser = currentUser;
    model.userId = $routeParams.userId;

    function init() {
      deckService.findAllDecksByUser(model.userId)
        .then(decksFound);

      function decksFound(response) {
        model.decks = response;
      }
    }
    init();
  }
})();
