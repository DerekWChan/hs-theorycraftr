(function() {
  angular
    .module('HearthstoneTheorycraftr')
    .controller('deckCreatorController', deckCreatorController);

  function deckCreatorController($location, $routeParams, currentUser, deckService) {
    var model = this;
    model.currentUser = currentUser;
    model.userId = $routeParams.userId;
    model.createDeck = createDeck;

    function createDeck(name, playerClass, format) {
      if (name === '' || typeof name === 'undefined' || name === null) {
        model.message = "Please type in a name for your deck.";
        return;
      }

      if (format === '' || typeof format === 'undefined' || format === null) {
        model.message = "Please choose a format.";
        return;
      }

      if (playerClass === '' || typeof playerClass === 'undefined' || playerClass === null) {
        model.message = "Please select a class.";
        return;
      }

      var newDeck = {
        _user: model.userId,
        username: currentUser.username,
        name: name,
        format: format,
        playerClass: playerClass
      }

      deckService.createDeck(newDeck)
        .then(function(response) {
          $location.url('/user/' + model.userId + '/deck/' + response._id + '/edit');
        });
    }
  }
})();
