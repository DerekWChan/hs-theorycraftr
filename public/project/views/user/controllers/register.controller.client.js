(function() {
  angular
    .module('HearthstoneTheorycraftr')
    .controller('registerController', registerController);

  function registerController($location, userService) {
    var model = this;
    model.registerUser = registerUser;

    function register(username, password, confirmPassword) {
      if (username === '' || typeof username === 'undefined' || username === null) {
        model.message = "Please type in a username.";
        return;
      }

      if (password === '' || typeof password === 'undefined' || password === null) {
        model.message = "Please type in a password.";
        return;
      }

      if (password !== confirmPassword) {
        model.message = "The passwords do not match.";
        return;
      }

      userService.findUserByUsername(username)
        .then(usernameUnavailable, usernameAvailable);

      function usernameUnavailable() {
        model.message = "The username " + username + " is not available.";
      }

      function usernameAvailable() {
        var newUser = {
          username: username,
          password: password
        };

        return userService.register(user)
          .then(function(response) {
            $location.url('/user/' + response._id);
          });
      }
    }
  }
})();
