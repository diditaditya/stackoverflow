const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  threads: [{type: Schema.Types.ObjectId, ref: 'Thread'}],
  answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
  votes: [{type: Schema.Types.ObjectId, ref: 'Vote'}]
});

let user = mongoose.model('User', userSchema);

module.exports = user;
