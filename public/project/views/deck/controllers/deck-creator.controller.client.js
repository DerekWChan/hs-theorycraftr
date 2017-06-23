(function() {
  angular
    .module('HearthstoneTheorycraftr')
    .controller('deckCreatorController', deckCreatorController);

  function deckCreatorController($location, $routeParams, deckService) {
    var model = this;
    model.userId = $routeParams.userId;
    model.createDeck = createDeck;

    function createDeck(name, playerClass, format) {
      if (name === '' || typeof name === 'undefined' || name === null) {
        model.message = "Please type in a name for your deck.";
        return;
      }

      if (playerClass === '' || typeof playerClass === 'undefined' || playerClass === null) {
        model.message = "Please select a class.";
        return;
      }

      if (format === '' || typeof format === 'undefined' || format === null) {
        model.message = "Please choose a format.";
        return;
      }
      var newDeck = {
        _id: (new Date()).getTime() + "",
        createdOn: new Date(),
        creatorId: model.userId,
        name: name,
        playerClass: playerClass,
        format: format
      }
      deckService.createDeck(newDeck);
      $location.url('/user/' + model.userId + '/deck/' + newDeck._id + '/edit');
    }
  }
})();
