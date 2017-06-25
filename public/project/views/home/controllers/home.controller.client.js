(function() {
  angular
    .module('HearthstoneTheorycraftr')
    .controller('homeController', homeController);

  function homeController($route, userService, deckService) {
    var model = this;
    model.searchDecks = searchDecks;

    function init() {
      userService.findAllUsers()
        .then(usersFound);

      function usersFound(response) {
        model.allUsers = response;
      }

      deckService.findAllDecks()
        .then(function(response) {
          model.allDecks = response;
        });
    }
    init();

    function searchDecks(query) {
      deckService.searchDecks(query)
        .then(function(response) {
          model.allDecks = response;
          $route.reload();
        });
    }
  }
})();
