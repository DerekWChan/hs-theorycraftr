var app = require('../../express');

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

app.post('/api/user', createUser);
// app.get('/api/user/:userId', findUserById);
app.get('/api/user', findAllUsers);
// app.put('/api/user/:userId', updateUser);
// app.delete('/api/user/:userId', deleteUser);

function createUser(req, res) {
  var newUser = req.body;
  users.push(newUser);
  res.send(newUser);
}

function findAllUsers(req, res) {
  var username = req.query.username;
  var password = req.query.password;

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
  } else if (username) {
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
    res.json(users);
  }
}
