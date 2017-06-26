var mongoose = require('mongoose');
var userSchema = require('./user.schema.server.js');
var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.findAllUsers = findAllUsers;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.findUserByFacebookId = findUserByFacebookId;

module.exports = userModel;

function createUser(newUser) {
  newUser.role = 'Member';
  return userModel.create(newUser);
}

function updateUser(userId, newInfo) {
  return userModel.update({
    _id: userId
  }, {
    $set: newInfo
  });
}

function deleteUser(userId) {
  return userModel.remove({
    _id: userId
  });
}

function findAllUsers() {
  return userModel.find();
}

function findUserById(userId) {
  return userModel.findById(userId);
}

function findUserByCredentials(username, password) {
  return userModel.findOne({
    username: username,
    password: password
  });
}

function findUserByUsername(username) {
  return userModel.findOne({
    username: username
  });
}

function findUserByGoogleId(googleId) {
  return userModel.findOne({
    'google.id': googleId
  });
}

function findUserByFacebookId(facebookId) {
  return userModel.findOne({
    'facebook.id': facebookId
  });
}
