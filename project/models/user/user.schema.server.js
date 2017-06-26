var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  role: {
    type: String,
    default: 'Guest',
    enum: ['Guest', 'Member', 'Admin']
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  firstName: String,
  lastName: String,
  email: String,
  google: {
    id: String,
    token: String
  },

  facebook: {
    id: String,
    token: String
  },
  _decks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DeckModel'
  }]
}, {
  collection: 'users'
});

module.exports = userSchema;
