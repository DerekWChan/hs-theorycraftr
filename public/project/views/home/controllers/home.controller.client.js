(function() {
  angular
    .module('HearthstoneTheorycraftr')
    .controller('homeController', homeController);

  function homeController(deckService) {
    var model = this;
    model.searchDecks = searchDecks;

    function init() {
      deckService.findAllDecks()
        .then(function(response) {
          model.allDecks = response;
        });
    }
    init();

    function searchDecks(searchTerms) {
      if (searchTerms !== undefined) {
        deckService.searchDecks(searchTerms)
          .then(function(response) {
            model.decksFound = response;
          });
      }
    }
  }
})();
