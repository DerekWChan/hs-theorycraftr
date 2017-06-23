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

      userService
        .findUserByUsername(username)
        .then(
          function() {
            model.message = "The username " + username + " is not available.";
          },
          function() {
            var newUser = {
              _id: (new Date()).getTime() + "",
              registrationDate: new Date(),
              username: username,
              password: password
            }
            return userService
              .createUser(newUser)
              .then(function(newUser) {
                $location.url('/user/' + newUser._id);
              });
          });
    }
  }
})();
