(function() {
  angular
    .module('HearthstoneTheorycraftr')
    .controller('deckDetailsController', deckDetailsController);

  function deckDetailsController($location, $routeParams, $route, deckService) {
    var model = this;
    model.userId = $routeParams.userId;
    model.deckId = $routeParams.deckId;
    model.upvoteDeck = upvoteDeck;
    model.addCommentToDeck = addCommentToDeck;

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

    function upvoteDeck() {
      deckService.upvoteDeck(model.deckId)
        .then(function(response) {
          $route.reload();
        })
    }

    function addCommentToDeck(newComment) {
      if (newComment !== undefined) {
        deckService.addCommentToDeck(newComment, model.deckId)
          .then(function(response) {
            $route.reload();
          });
      }
    }
  }
})();
