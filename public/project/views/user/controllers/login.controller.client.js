(function() {
  angular
    .module('HearthstoneTheorycraftr')
    .controller('loginController', loginController);

  function loginController($location, userService) {
    var model = this;
    model.login = login;

    function login(user) {
      if (username === '' || typeof username === 'undefined' || username === null) {
        model.message = "Please type in a username.";
        return;
      }

      if (password === '' || typeof password === 'undefined' || password === null) {
        model.message = "Please type in a password.";
        return;
      }

      userService.login(user)
        .then(userFound, userNotFound);

      function userFound(response) {
          $location.url("/user/" + response._id);
        }
      }

      function userNotFound() {
        model.message = "Sorry, the user " + username + " was not found. Please try again."
      }
    }
  }
})();
