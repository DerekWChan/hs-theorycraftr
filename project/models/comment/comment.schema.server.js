var mongoose = require('mongoose');
var commentSchema = mongoose.Schema({
  // _user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'UserModel'
  // },
  createdOn: {
    type: Date,
    default: Date.now
  },
  text: String
});

module.exports = commentSchema;
