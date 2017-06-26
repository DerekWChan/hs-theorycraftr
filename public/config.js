(function() {
  angular
    .module("HearthstoneTheorycraftr")
    .config(configuration);

  function configuration($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "views/home/templates/home.view.client.html",
        controller: "homeController",
        controllerAs: "model",
        resolve: {
          currentUser: checkCurrentUser
        }
      })
      .when("/admin", {
        templateUrl: "views/admin/templates/admin.view.client.html",
        controller: "adminController",
        controllerAs: "model",
        resolve: {
          currentUser: checkAdmin
        }
      })
      .when("/admin/users", {
        templateUrl: "views/admin/templates/admin-users.view.client.html",
        controller: "adminUsersController",
        controllerAs: "model",
        resolve: {
          currentUser: checkAdmin
        }
      })
      .when("/login", {
        templateUrl: "views/user/templates/login.view.client.html",
        controller: "loginController",
        controllerAs: "model",
        resolve: {
          currentUser: checkCurrentUser
        }
      })
      .when("/register", {
        templateUrl: "views/user/templates/register.view.client.html",
        controller: "registerController",
        controllerAs: "model",
        resolve: {
          currentUser: checkCurrentUser
        }
      })
      .when("/search", {
        templateUrl: "views/search/templates/search.view.client.html",
        controller: "searchController",
        controllerAs: "model",
        resolve: {
          currentUser: checkCurrentUser
        }
      })
      .when("/profile/:userId", {
        templateUrl: "views/user/templates/profile.view.client.html",
        controller: "profileController",
        controllerAs: "model",
        resolve: {
          currentUser: checkCurrentUser
        }
      })
      .when("/user/:userId", {
        templateUrl: "views/user/templates/user-details.view.client.html",
        controller: "userDetailsController",
        controllerAs: "model",
        resolve: {
          currentUser: checkCurrentUser
        }
      })
      .when("/user/:userId/decks", {
        templateUrl: "views/deck/templates/deck-collection.view.client.html",
        controller: "deckCollectionController",
        controllerAs: "model",
        resolve: {
          currentUser: checkCurrentUser
        }
      })
      .when("/user/:userId/deck/:deckId/details", {
        templateUrl: "views/deck/templates/deck-details.view.client.html",
        controller: "deckDetailsController",
        controllerAs: "model",
        resolve: {
          currentUser: checkCurrentUser
        }
      })
      .when("/user/:userId/deck/new", {
        templateUrl: "views/deck/templates/deck-creator.view.client.html",
        controller: "deckCreatorController",
        controllerAs: "model",
        resolve: {
          currentUser: checkCurrentUser
        }
      })
      .when("/user/:userId/deck/:deckId/edit", {
        templateUrl: "views/deck/templates/deck-editor.view.client.html",
        controller: "deckEditorController",
        controllerAs: "model",
        resolve: {
          currentUser: checkCurrentUser
        }
      });

    // All users
    function checkCurrentUser($q, userService) {
      var deferred = $q.defer();

      userService.isLoggedIn()
        .then(function(currentUser) {
          if (currentUser === '0') {
            deferred.resolve({});
          } else {
            deferred.resolve(currentUser);
          }
        });
      return deferred.promise;
    }

    // Logged in users; members and admins
    function checkLoggedIn($q, $location, userService) {
      var deferred = $q.defer();

      userService.isLoggedIn()
        .then(function(currentUser) {
          if (currentUser === '0') {
            deferred.reject();
            $location.url('/login');
          } else {
            deferred.resolve(currentUser);
          }
        });
      return deferred.promise;
    }

    // Admins
    function checkAdmin($q, $location, userService) {
      var deferred = $q.defer();

      userService.checkAdmin()
        .then(function(currentUser) {
          if (currentUser === '0') {
            deferred.resolve({});
            $location.url('/');
          } else {
            deferred.resolve(currentUser);
          }
        });
      return deferred.promise;
    }
  }
})();
