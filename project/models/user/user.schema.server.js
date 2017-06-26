var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  roles: [{
    type: String,
    default: 'GUEST',
    enum: ['GUEST', 'MEMBER', 'ADMIN']
  }],
  registrationDate: {
    type: Date,
    default: Date.now
  },
  firstName: String,
  lastName: String,
  email: String,
  _decks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DeckModel'
  }]
}, {
  collection: 'users'
});

module.exports = userSchema;
