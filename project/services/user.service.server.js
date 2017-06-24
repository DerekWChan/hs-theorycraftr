var app = require('../../express');
var userModel = require('../models/user/user.model.server.js');

app.post('/api/user', createUser);
app.get('/api/user/:userId', findUserById);
app.get('/api/user', findAllUsers);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);

function createUser(req, res) {
  var newUser = req.body;

  userModel.createUser(newUser)
    .then(function(newUser) {
      res.json(newUser);
    });
}

function updateUser(req, res) {
  var userId = req.params.userId;
  var newInfo = req.body;

  userModel.updateUser(userId, newInfo)
    .then(function() {
      res.sendStatus(200);
    });
}

function deleteUser(req, res) {
  var userId = req.params.userId;

  userModel.deleteUser(userId)
    .then(function() {
      res.sendStatus(200);
    });
}

function findUserById(req, res) {
  var userId = req.params.userId;

  userModel.findUserById(userId)
    .then(function(user) {
      res.json(user);
    });
}

function findAllUsers(req, res) {
  var username = req.query.username;
  var password = req.query.password;

  // findUserByCredentials
  if (username && password) {
    userModel.findUserByCredentials(username, password)
      .then(
        function(user) {
          if (user) {
            res.json(user);
          } else {
            res.sendStatus(404);
          }
        });
      }
    // findUserByUsername
    else if (username) {
      userModel.findUserByUsername(username)
      .then(
        function(user) {
          if (user) {
            res.json(user);
          } else {
            res.sendStatus(404);
          }
        });
    } else {
      userModel.findAllUsers()
        .then(function(users) {
          res.json(users);
        });
    }
  }
