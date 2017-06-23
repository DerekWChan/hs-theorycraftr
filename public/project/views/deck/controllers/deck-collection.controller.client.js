(function() {
  angular
    .module('HearthstoneTheorycraftr')
    .controller('deckCollectionController', deckCollectionController);

  function deckCollectionController($location, $routeParams, deckService) {
    var model = this;
    model.userId = $routeParams.userId;

    function init() {
      model.decks = deckService.findAllDecksByUser(model.userId);
    }
    init();
  }
})();
