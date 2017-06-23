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

      var found = userService.findUserByUsername(username);

      if (found !== null) {
        model.message = "The username " + username + " is not available.";
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

      var newUser = {
        _id: (new Date()).getTime() + "",
        registrationDate: new Date(),
        username: username,
        password: password
      }
      userService.createUser(newUser);
      $location.url('/user/' + newUser._id);
    }
  }
})();
