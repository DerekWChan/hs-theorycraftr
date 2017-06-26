(function() {
  angular
    .module('HearthstoneTheorycraftr')
    .controller('profileController', profileController);

  function profileController($location, $routeParams, $route, userService) {
    var model = this;
    model.userId = $routeParams.userId;
    model.updateProfile = updateProfile;
    model.deleteUser = deleteUser;
    model.logout = logout;

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

    function updateProfile(newInfo) {
      if (model.user !== null) {
        userService.updateUser(model.userId, newInfo)
          .then(updateSuccess, updateFailure);

        function updateSuccess() {
          $route.reload();
        }

        function updateFailure() {
          model.message = "Unable to update profile.";
        }
      }
    }

    function deleteUser() {
      userService.deleteUser(model.userId)
      .then(deleteSuccess, deleteFailure);

      function deleteSuccess() {
        $location.url('/home');
      }

      function deleteFailure() {
        model.message = "Unable to delete profile.";
      }
    }

    function logout() {
      userService.logout()
        .then(function(response) {
          $location.url('/home');
        });
    }
  }
})();
