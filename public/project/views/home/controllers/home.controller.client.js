(function() {
  angular
    .module('HearthstoneTheorycraftr')
    .controller('homeController', homeController);

  function homeController(userService, deckService) {
    var model = this;

    function init() {
      userService.findAllUsers()
        .then(usersFound);

      function usersFound(response) {
        model.allUsers = response;
      }

      deckService.findAllDecks()
        .then(decksFound);

      function decksFound(response) {
        model.allDecks = response;
      }
    }
    init();
  }
})();
