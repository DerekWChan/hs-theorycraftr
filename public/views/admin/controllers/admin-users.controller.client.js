(function() {
  angular
    .module('HearthstoneTheorycraftr')
    .controller('adminUsersController', adminUsersController);

  function adminUsersController($location, $route, userService) {
    var model = this;
    model.createUser = createUser;
    model.updateUser = updateUser;
    model.deleteUser = deleteUser;

    function init() {
      userService.findAllUsers()
        .then(function(response) {
          model.allUsers = response;
        });
    }
    init();

    function createUser(newUser) {
      userService.register(newUser)
        .then(function(response) {
          $route.reload();
        });
    }

    function updateUser(userId, newInfo) {
      userService.updateUser(userId, newInfo)
        .then(function(response) {
          $route.reload();
        });
    }

    function deleteUser(userId) {
      userService.deleteUser(userId)
        .then(function(respose) {
          $route.reload();
        });
    }
  }
})();
