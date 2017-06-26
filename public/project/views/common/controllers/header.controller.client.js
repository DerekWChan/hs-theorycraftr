(function() {
  angular
    .module('HearthstoneTheorycraftr')
    .controller('headerController', headerController);

  function headerController($location) {
    console.log('boop');
    model = this;

    model.goToProfile = goToProfile;

    function goToProfile() {
      console.log('/user/' + localStorage.currentUser);
      if (localStorage.getItem('currentUser') !== null) {
        $location.url('/user/' + localStorage.currentUser);
      }
    }
  }
})();
