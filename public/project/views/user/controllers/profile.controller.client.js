(function() {
  angular
    .module('HearthstoneTheorycraftr')
    .controller('profileController', profileController);

  function profileController($location, $routeParams, userService) {
    var model = this;
    model.userId = $routeParams.userId;
    model.user = userService.findUserById(model.userId);
    model.updateProfile = updateProfile;
    model.deleteUser = deleteUser;

    function updateProfile(newInfo) {
      if (model.user !== null) {
        userService.updateUser(model.userId, newInfo);
        model.message = "Profile updated successfully!";
      } else {
        model.message = "Unable to update profile.";
      }
    }

    function deleteUser() {
      userService.deleteUser(model.userId);
      $location.url('/home');
    }
  }
})();
