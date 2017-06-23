(function() {
  angular
    .module('HearthstoneTheorycraftr')
    .controller('loginController', loginController);

  function loginController($location, userService) {
    var model = this;
    model.login = login;

    function login(username, password) {
      if (username === '' || typeof username === 'undefined' || username === null) {
        model.message = "Please type in a username.";
        return;
      }

      if (password === '' || typeof password === 'undefined' || password === null) {
        model.message = "Please type in a password.";
        return;
      }

      var found = userService.findUserByCredentials(username, password);

      if (found !== null) {
        $location.url("/user/" + found._id);
      } else {
        model.message = "Sorry, the user " + username + " was not found. Please try again."
      }
    }
  }
})();
