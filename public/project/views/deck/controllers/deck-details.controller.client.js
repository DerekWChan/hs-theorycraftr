(function() {
  angular
    .module('HearthstoneTheorycraftr')
    .controller('deckDetailsController', deckDetailsController);

  function deckDetailsController($location, $routeParams, deckService) {
    var model = this;
    model.userId = $routeParams.userId;
    model.deckId = $routeParams.deckId;

    function init() {
      // Initialize model.deck
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
  }
})();
