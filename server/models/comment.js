const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let commentSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  answer: {type: Schema.Types.ObjectId, ref: 'Answer'},
  votes: [{type: Schema.Types.ObjectId, ref: 'Vote'}],
  createdAt: Date,
  content: String
});

let comment = mongoose.model('Comment', threadSchema);

module.exports = comment;
