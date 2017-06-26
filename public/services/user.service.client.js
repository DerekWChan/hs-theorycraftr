(function() {
  angular
    .module('HearthstoneTheorycraftr')
    .factory('userService', userService);

  function userService($http) {
    var api = {
      register: register,
      login: login,
      isLoggedIn: isLoggedIn,
      checkAdmin: checkAdmin,
      logout: logout,
      updateUser: updateUser,
      deleteUser: deleteUser,
      findAllUsers: findAllUsers,
      findUserById: findUserById,
      findUserByCredentials: findUserByCredentials,
      findUserByUsername: findUserByUsername
    };
    return api;

    function register(newUser) {
      var url = '/api/register';
      return $http.post(url, newUser)
        .then(function(response) {
          return response.data;
        })
    }

    function login(username, password) {
      var url = '/api/login';
      var credentials = {
        username: username,
        password: password
      }

      return $http.post(url, credentials)
        .then(function(response) {
          return response.data;
        });
    }

    function isLoggedIn() {
      var url = '/api/loggedin';
      return $http.get(url)
        .then(function(response) {
          return response.data;
        });
    }

    function checkAdmin() {
      var url = "/api/checkAdmin";
      return $http.get(url)
        .then(function(response) {
          return response.data;
        });
    }

    function logout(user) {
      var url = '/api/logout';

      return $http.post(url)
        .then(function(response) {
          return response.data;
        });
    }

    function updateUser(userId, newInfo) {
      var url = '/api/user/' + userId;

      return $http.put(url, newInfo)
        .then(function(response) {
          return response.data;
        });
    }

    function deleteUser(userId) {
      var url = '/api/user/' + userId;

      return $http.delete(url)
        .then(function(response) {
          return response.data;
        });
    }

    function findAllUsers() {
      var url = '/api/user';

      return $http.get(url)
        .then(function(response) {
          return response.data;
        })
    }

    function findUserById(userId) {
      var url = '/api/user/' + userId;

      return $http.get(url)
        .then(function(response) {
          return response.data;
        });
    }

    function findUserByCredentials(username, password) {
      var url = '/api/user?username=' + username + '&password=' + password;

      return $http.get(url)
        .then(function(response) {
          return response.data;
        });
    }

    function findUserByUsername(username) {
      var url = '/api/user?username=' + username;

      return $http.get(url)
        .then(function(response) {
          return response.data;
        });
    }
  }
})();
