const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let threadSchema = new Schema({
  starter: {type: Schema.Types.ObjectId, ref: 'User'},
  createdAt: Date,
  UpdatedAt: Date,
  openStatus: Boolean,
  closedBy: {type: Schema.Types.ObjectId, ref: 'User'},
  title: String,
  question: String,
  answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
  votes: [{type: Schema.Types.ObjectId, ref: 'Vote'}],
  tags: [String]
});

let thread = mongoose.model('Thread', threadSchema);

module.exports = thread;
