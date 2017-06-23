(function() {
  angular
    .module('HearthstoneTheorycraftr')
    .factory('userService', userService);

  function userService($http) {
    var users = [{
        _id: "1",
        username: "a",
        password: "a",
        email: "a@a.com"
      },
      {
        _id: "2",
        username: "b",
        password: "b",
        email: "b@b.com"
      },
      {
        _id: "3",
        username: "c",
        password: "c",
        email: "c@c.com"
      }
    ];
    var api = {
      createUser: createUser,
      updateUser: updateUser,
      deleteUser: deleteUser,
      findUserById: findUserById,
      findUserByCredentials: findUserByCredentials,
      findUserByUsername: findUserByUsername
    };
    return api;

    function createUser(newUser) {
      var url = "/api/user";
      return $http.post(url, newUser)
        .then(function(response) {
          return response.data;
        });
    }

    function updateUser(userId, newInfo) {
      for (var u in users) {
        var user = users[u];
        if (user._id === userId) {
          for (var key in newInfo) {
            if (newInfo[key] !== '') {
              user[key] = newInfo[key];
            }
          }
        }
      }
    }

    function deleteUser(userId) {
      for (var u in users) {
        var user = users[u];
        if (user._id === userId) {
          users.splice(u, 1);
        }
      }
    }

    function findUserById(userId) {
      for (var u in users) {
        var user = users[u];
        if (user._id === userId) {
          return user;
        }
      }
      return null;
    }

    function findUserByCredentials(username, password) {
      for (var u in users) {
        var user = users[u];
        if (user.username === username && user.password === password) {
          return user;
        }
      }
      return null;
    }

    function findUserByUsername(username) {
      var url = "/api/user?username=" + username;
      return $http.get(url)
        .then(function(response) {
          return response.data;
        });
    }
  }
})();
