var express = require('../../express');
var app = express();

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
app.get('/api/user/:userId', findUserById);
app.get('/api/user', findUserByCredentials);
app.get('/api/user', findUserByUsername);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);

function createUser(req, res) {
  var newUser = req.body;
  users.push(newUser);
  res.json(newUser);
}
