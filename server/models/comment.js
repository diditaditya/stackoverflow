const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let commentSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  answer: {type: Schema.Types.ObjectId, ref: 'Answer'},
  createdAt: Date,
  content: String
});

let comment = mongoose.model('Comment', commentSchema);

module.exports = comment;
