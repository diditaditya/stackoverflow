const Vote = require('../models/vote');

let voteControl = {
  showAll: function(req, res) {
    Vote.find({}).populate(['parent.thread', 'parent.answer', 'parent.comment', 'user'])
    .exec((err, votes) => {
      if(err) {
        res.send(err);
      } else {
        // let response = [];
        // votes.map((vote, index) => {
        //   let threadData = {
        //     id: thread._id,
        //     starter: {
        //       id: thread.starter._id,
        //       username: thread.starter.username
        //     },
        //     title: thread.title,
        //     question: thread.question,
        //     createdAt: thread.createdAt,
        //     updatedAt: thread.updatedAt,
        //     openStatus: thread.openStatus,
        //     voteCount: thread.voteCount,
        //     tags: thread.tags,
        //     answers: thread.answers
        //   };
        //   response.push(threadData);
        // });
        res.send(votes);
      }
    });
  },
  showById: function(req, res) {
    Vote.findById(req.params.voteId).populate(['parent.thread', 'parent.answer', 'parent.comment', 'user'])
    .exec((err, vote) => {
      if (err) {
        res.send(err);
      } else {
        res.send(vote);
      }
    });
  },
  create: function(req, res) {
    if(req.body.userId && req.body.parent && req.body.vote) {
      let newVote = new Vote({
        user: req.body.userId,
        createdAt: new Date(),
        parent: req.body.parent,
        vote: req.body.vote
      });
      newVote.save((err) => {
        if(err) {
          console.log('error saving new vote');
        } else {
          let response = {
            status: "success",
            message: "vote is successfully created",
            id: newVote._id,
            vote: newVote
          };
          res.send(response);
        }
      });
    } else {
      let response = {
        status: "failed",
        message: "userId, parent, and vote are required",
        body: {
          userId: req.body.userId,
          parent: req.body.parent,
          vote: req.body.vote
        }
      };
      res.send(response);
    }
  },
  update: function(req, res) {
    Vote.findById(req.params.voteId, (err, vote) => {
      if (err) {
        res.send(err);
      } else {
        Vote.update({_id: req.params.voteId}, {$set:{
          user: thread.starter,
          createdAt: thread.createdAt,
          parent: thread.parent,
          vote: req.body.vote || thread.votes
        }}, (err, updated) => {
          if (err) {
            console.log('error in vote update');
            res.send(err);
          } else {
            console.log('tvote is updated');
            let response = {
              status: 'success',
              thread: vote
            }
            res.send(response);
          }
        });
      }
    });
  },
  delete: function(req, res) {
    Vote.findByIdAndRemove(req.params.voteId, (err, vote) => {
      if(err) {
        res.send(err);
      } else {
        let response = {
          id: req.params.voteId,
          status: 'success',
          message: 'vote is sucessfully deleted'
        };
        res.send(response);
      }
    });
  }
}

module.exports = voteControl;
