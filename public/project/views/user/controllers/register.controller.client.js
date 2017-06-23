(function() {
  angular
    .module('HearthstoneTheorycraftr')
    .controller('registerController', registerController);

  function registerController($location, userService) {
    var model = this;
    model.registerUser = registerUser;

    function registerUser(username, password, confirmPassword) {
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
          _id: (new Date()).getTime() + "",
          registrationDate: new Date(),
          username: username,
          password: password
        };

        return userService.createUser(newUser)
          .then(function(user) {
            $location.url('/user/' + user._id);
          });
      }
    }
  }
})();
