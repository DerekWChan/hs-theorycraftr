var app = require('../../express');
var userModel = require('../models/user/user.model.server.js');

app.post('/api/user', createUser);
// app.get('/api/user/:userId', findUserById);
// app.get('/api/user', findAllUsers);
// app.put('/api/user/:userId', updateUser);
// app.delete('/api/user/:userId', deleteUser);

function createUser(req, res) {
  console.log('SERVERSIDE!');
  var newUser = req.body;
  console.log(newUser);

  userModel.createUser(newUser)
    .then(function(newUser) {
        console.log('RETURNING FROM THE DATABASE');
        res.json(newUser);
      });
}

// function updateUser(req, res) {
//   var userId = req.params.userId;
//   var newInfo = req.body;
//
//   userModel.updateUser(userId, newInfo)
//     .then(function() {
//       res.sendStatus(200);
//     });
// }
//
// function deleteUser(req, res) {
//   var userId = req.params.userId;
//
//   userModel.deleteUser(userId)
//     .then(function() {
//       res.sendStatus(200);
//     });
// }
//
// function findUserById(req, res) {
//   var userId = req.params.userId;
//
//   userModel.findUserById(userId)
//     .then(function(user) {
//       res.json(user);
//     });
// }
//
// function findAllUsers(req, res) {
//   var username = req.query.username;
//   var password = req.query.password;
//
//   // findUserByCredentials
//   if (username && password) {
//     for (var u in users) {
//       var user = users[u];
//       if (user.username === username && user.password === password) {
//         res.json(user);
//         return;
//       }
//     }
//     res.sendStatus(404);
//     return;
//   }
//   // findUserByUsername
//   else if (username) {
//     for (var u in users) {
//       var user = users[u];
//       if (user.username === username) {
//         res.json(user);
//         return;
//       }
//     }
//     res.sendStatus(404);
//     return;
//   } else {
//     res.send(users);
//     return;
//   }
// }
