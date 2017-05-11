const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let answerSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  thread: {type: Schema.Types.ObjectId, ref: 'Thread'},
  votes: [{type: Schema.Types.ObjectId, ref: 'Vote'}],
  voteCount: Number,
  createdAt: Date,
  updatedAt: Date,
  content: String
});

let answer = mongoose.model('Answer', answerSchema);

module.exports = answer;
