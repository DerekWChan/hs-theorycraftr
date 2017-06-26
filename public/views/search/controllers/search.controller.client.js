(function() {
  angular
    .module('HearthstoneTheorycraftr')
    .controller('searchController', searchController);

  function searchController($route, currentUser, deckService) {
    var model = this;
    model.currentUser = currentUser;
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
