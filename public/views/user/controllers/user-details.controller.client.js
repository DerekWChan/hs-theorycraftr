(function() {
  angular
    .module('HearthstoneTheorycraftr')
    .controller('userDetailsController', userDetailsController);

  function userDetailsController($routeParams, currentUser, userService) {
    var model = this;
    model.currentUser = currentUser;
    model.userId = $routeParams.userId;

    function init() {
      userService.findUserById(model.userId)
        .then(userFound, userNotFound);

        function userFound(response) {
          model.user = response;
        }

        function userNotFound() {
          model.user = null;
        }
    }
    init();
  }
})();
