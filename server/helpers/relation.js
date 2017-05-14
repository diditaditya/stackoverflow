const User = require('../models/user');
const Thread = require('../models/thread');
const Answer = require('../models/answer');
const Comment = require('../models/comment');
const Vote = require('../models/vote');

let relation = {};

relation.createThread = function(createdThread, threadStarter, callback) {
  User.findById(threadStarter.id, function(err, user) {
    if(user) {
      let threads = user.threads;
      threads.push(createdThread.id);
      User.update({_id: threadStarter.id}, {$set:{
        'username': user.username,
        'email': user.email,
        'password': user.password,
        'threads': threads,
        'answers': user.answers,
        'votes': user.votes
      }}, function(err, updated) {
        if(err) {
          callback(err);
        } else {
          callback(user);
        }
      });
    } else if(err) {
      callback(err);
    }
  });
}


module.exports = relation;
