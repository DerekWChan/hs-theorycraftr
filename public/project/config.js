(function() {
  angular
    .module("HearthstoneTheorycraftr")
    .config(Config);

  function Config($routeProvider) {
    $routeProvider
      .when("/home", {
        templateUrl: "views/home/templates/home.view.client.html",
        controller: "homeController",
        controllerAs: "model",
        resolve: {
          currentUser: checkCurrentUser
        }
      })
      .when("/login", {
        templateUrl: "views/user/templates/login.view.client.html",
        controller: "loginController",
        controllerAs: "model"
      })
      .when("/register", {
        templateUrl: "views/user/templates/register.view.client.html",
        controller: "registerController",
        controllerAs: "model"
      })
      .when("/search", {
        templateUrl: "views/search/templates/search.view.client.html",
        controller: "searchController",
        controllerAs: "model"
      })
      .when("/user/:userId", {
        templateUrl: "views/user/templates/profile.view.client.html",
        controller: "profileController",
        controllerAs: "model",
        resolve: {
          currentUser: checkLoggedIn,
        }
      })
      .when("/user/:userId/decks", {
        templateUrl: "views/deck/templates/deck-collection.view.client.html",
        controller: "deckCollectionController",
        controllerAs: "model",
        resolve: {
          currentUser: checkLoggedIn
        }
      })
      .when("/user/:userId/deck/:deckId/details", {
        templateUrl: "views/deck/templates/deck-details.view.client.html",
        controller: "deckDetailsController",
        controllerAs: "model"
      })
      .when("/user/:userId/deck/new", {
        templateUrl: "views/deck/templates/deck-creator.view.client.html",
        controller: "deckCreatorController",
        controllerAs: "model",
        resolve: {
          currentUser: checkLoggedIn
        }
      })
      .when("/user/:userId/deck/:deckId/edit", {
        templateUrl: "views/deck/templates/deck-editor.view.client.html",
        controller: "deckEditorController",
        controllerAs: "model",
        resolve: {
          currentUser: checkLoggedIn
        }
      });

    function checkLoggedIn($q, $location, userService) {
      var deferred = $q.defer();

      userService.checkLoggedIn()
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

    function checkCurrentUser($q, userService) {
      var deferred = $q.defer();

      userService.checkLoggedIn()
        .then(function(currentUser) {
          if (currentUser === '0') {
            deferred.resolve({});
          } else {
            deferred.resolve(currentUser);
          }
        });
      return deferred.promise;
    }

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
