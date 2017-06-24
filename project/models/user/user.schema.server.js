var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  registrationDate: {
    type: Date,
    default: Date.now
  }
  // firstName: String,
  // lastName: String,
  // email: String,
  // decks: [{
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "DeckModel"
  // }]
}, {
  collection: "users"
});

module.exports = userSchema;
