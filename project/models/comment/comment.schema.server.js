var mongoose = require('mongoose');
var commentSchema = mongoose.Schema({
  creatorId: String,
  creatorName: String,
  createdOn: {
    type: Date,
    default: Date.now
  },
  text: String
});

module.exports = commentSchema;
