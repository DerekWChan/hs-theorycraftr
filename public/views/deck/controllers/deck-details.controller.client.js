(function() {
  angular
    .module('HearthstoneTheorycraftr')
    .controller('deckDetailsController', deckDetailsController);

  function deckDetailsController($location, $routeParams, $route, currentUser, deckService) {
    var model = this;
    model.currentUser = currentUser;
    model.deckId = $routeParams.deckId;
    model.addCommentToDeck = addCommentToDeck;
    model.upvoteDeck = upvoteDeck;

    function init() {
      // Initialize model.deck
      deckService.findDeckById(model.deckId)
        .then(deckFound, deckNotFound);

      function deckFound(response) {
        model.deck = response;
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


    function addCommentToDeck(newComment) {
      if (newComment !== undefined) {
        newComment.userId = currentUser._id;
        newComment.username = currentUser.username;
        deckService.addCommentToDeck(newComment, model.deckId)
          .then(function(response) {
            $route.reload();
          });
      }
    }

    function upvoteDeck() {
      deckService.upvoteDeck(model.deckId)
        .then(function(response) {
          $route.reload();
        })
    }
  }
})();
