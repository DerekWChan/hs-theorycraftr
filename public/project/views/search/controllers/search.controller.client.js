(function() {
  angular
    .module('HearthstoneTheorycraftr')
    .controller('searchController', searchController);

  function searchController($route, deckService) {
    var model = this;
    model.searchDecks = searchDecks;

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
