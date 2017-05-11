const Answer = require('../models/answer');

let answerControl = {
  showAll: function(req, res) {
    Answer.find({}).populate(['user', 'thread', 'votes']).exec((err, answers) => {
      if(err) {
        res.send(err);
      } else {
        res.send(answers);
      }
    });
  },
  showById: function(req, res) {
    Answer.findById(req.params.answerId).populate(['user', 'thread', 'votes']).exec((err, answer) => {
      if (err) {
        res.send(err);
      } else {
        res.send(answer);
      }
    });
  },
  create: function(req, res) {
    let newAnswer = new Answer({
      user: req.body.user,
      thread: req.body.thread,
      createdAt: new Date(),
      voteCount: 0,
      content: req.body.content
    });
    newAnswer.save((err) => {
      if(err) {
        console.log('error saving new answer');
      } else {
        let response = {
          status:"success",
          message: "answer is successfully created",
          id: newAnswer._id
        };
        res.send(response);
      }
    });
  },
  update: function(req, res) {
    Answer.findById(req.params.answerId, (err, answer) => {
      if (err) {
        res.send(err);
      } else {
        Answer.update({_id: req.params.answerId}, {$set:{
          user: answer.user,
          createdAt: answer.createdAt,
          updatedAt: req.body.updatedAt || answer.updatedAt,
          content: req.body.content || thread.content,
          votes: req.body.votes || answer.votes,
          voteCount: req.body.voteCount || answer.voteCount
        }}, (err, updated) => {
          if (err) {
            console.log('error in answer update');
            res.send(err);
          } else {
            console.log('answer is updated');
            res.send(updated);
          }
        });
      }
    });
  },
  delete: function(req, res) {
    Answer.findByIdAndRemove(req.params.answerId, (err, answer) => {
      if(err) {
        res.send(err);
      } else {
        let response = {
          id: req.params.answerId,
          status: 'success',
          message: 'answer is sucessfully deleted'
        };
        res.send(response);
      }
    });
  }
}

module.exports = answerControl;
