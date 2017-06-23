(function() {
  angular
    .module('HearthstoneTheorycraftr')
    .controller('deckDetailsController', deckDetailsController);

  function deckDetailsController($location, $routeParams, deckService) {
    var model = this;
    model.userId = $routeParams.userId;
    model.deckId = $routeParams.deckId;

    function init() {
      model.deck = deckService.findDeckById(model.deckId);
    }
    init();
  }
})();
