const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let voteSchema = new Schema({
  parent: {
    thread: {type: Schema.Types.ObjectId, ref: 'Thread'},
    answer: {type: Schema.Types.ObjectId, ref: 'Answer'},
    comment: {type: Schema.Types.ObjectId, ref: 'Comment'}
  },
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  createdAt: Date,
  vote: String
});

let vote = mongoose.model('Vote', voteSchema);

module.exports = vote;
