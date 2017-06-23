var app = require('../../express');

var users = [{
    _id: "1",
    registrationDate: "",
    username: "a",
    password: "a",
    email: "a@a.com"
  },
  {
    _id: "2",
    registrationDate: "",
    username: "b",
    password: "b",
    email: "b@b.com"
  },
  {
    _id: "3",
    registrationDate: "",
    username: "c",
    password: "c",
    email: "c@c.com"
  }
];

app.post('/api/user', createUser);
app.get('/api/user/:userId', findUserById);
app.get('/api/user', findAllUsers);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);

function createUser(req, res) {
  var newUser = req.body;
  users.push(newUser);
  res.json(newUser);
}

function updateUser(req, res) {
  var userId = req.params.userId;

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
  var userId = req.params.userId;

  for (var u in users) {
    var user = users[u];
    if (user._id === userId) {
      users.splice(u, 1);
      res.sendStatus(200);
      return;
    }
  }
  res.sendStatus(404);
}

function findUserById(req, res) {
  var userId = req.params.userId;

  for (var u in users) {
    var user = users[u];
    if (user._id === userId) {
      res.send(user);
      return;
    }
  }
  res.sendStatus(404);
}

function findAllUsers(req, res) {
  var username = req.query.username;
  var password = req.query.password;

  // findUserByCredentials
  if (username && password) {
    for (var u in users) {
      var user = users[u];
      if (user.username === username && user.password === password) {
        res.json(user);
        return;
      }
    }
    res.sendStatus(404);
    return;
  }
  // findUserByUsername
  else if (username) {
    for (var u in users) {
      var user = users[u];
      if (user.username === username) {
        res.json(user);
        return;
      }
    }
    res.sendStatus(404);
    return;
  } else {
    res.send(users);
  }
}
