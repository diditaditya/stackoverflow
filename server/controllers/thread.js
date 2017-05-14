const Thread = require('../models/thread');
const Relation = require('../helpers/relation');

let threadControl = {
  showAll: function(req, res) {
    Thread.find({}).populate(['starter', 'votes', 'answers', 'answers.user']).exec((err, threads) => {
      if(err) {
        res.send(err);
      } else {
        let response = [];
        threads.map((thread, index) => {
          let threadData = {
            id: thread._id,
            starter: {
              id: thread.starter._id,
              username: thread.starter.username
            },
            title: thread.title,
            question: thread.question,
            createdAt: thread.createdAt,
            updatedAt: thread.updatedAt,
            openStatus: thread.openStatus,
            votes: thread.votes,
            voteCount: thread.voteCount,
            tags: thread.tags,
            answers: thread.answers
          };
          response.push(threadData);
        });
        res.send(response);
      }
    });
  },
  showById: function(req, res) {
    Thread.findById(req.params.threadId).populate(['starter', 'answers', 'votes', 'closedBy']).exec((err, thread) => {
      if (err) {
        res.send(err);
      } else {
        res.send(thread);
      }
    });
  },
  create: function(req, res) {
    if(req.body.title && req.body.question) {
      let newThread = new Thread({
        starter: req.body.starter,
        createdAt: new Date(),
        title: req.body.title,
        question: req.body.question,
        openStatus: true,
        closedBy: null,
        votes: [],
        voteCount: 0,
        tags: req.body.tags
      });
      newThread.save((err) => {
        if(err) {
          console.log('error saving new thread');
        } else {
          let response = {
            status: "success",
            message: "thread is successfully created",
            id: newThread._id,
            thread: newThread
          };
          res.send(response);
        }
      });
    } else {
      let response = {
        status: 'failed',
        message: 'title and question are required'
      };
      res.send(response);
    }
  },
  update: function(req, res) {
    Thread.findById(req.params.threadId, (err, thread) => {
      if (err) {
        res.send(err);
      } else {
        Thread.update({_id: req.params.threadId}, {$set:{
          starter: thread.starter,
          createdAt: thread.createdAt,
          updatedAt: new Date(),
          openStatus: thread.openStatus,
          closedBy: thread.closedBy,
          title: req.body.title || thread.title,
          question: req.body.question || thread.question,
          answers: req.body.answers || thread.answers,
          votes: req.body.votes || thread.votes,
          voteCount: req.body.voteCount || thread.voteCount,
          tags: req.body.tags || thread.tags
        }}, (err, updated) => {
          if (err) {
            console.log('error in thread update');
            res.send(err);
          } else {
            console.log('thread is updated');
            let response = {
              status: 'success',
              thread: thread
            }
            res.send(response);
          }
        });
      }
    });
  },
  close: function(req, res) {
    let closerId = req.body.id;
    Thread.findById(req.params.threadId, (err, thread) => {
      if (err) {
        res.send(err);
      } else {
        Thread.update({_id: req.params.threadId}, {$set:{
          started: thread.starter,
          createdAt: thread.createdAt,
          updatedAt: thread.updatedAt,
          openStatus: false,
          closedBy: closerId,
          title: thread.title,
          question: thread.question,
          answers: thread.answers,
          votes: thread.votes,
          tags: thread.tags
        }}, (err, updated) => {
          if (err) {
            console.log('error in thread update');
            res.send(err);
          } else {
            console.log('thread is sucessfully closed');
            res.send(updated);
          }
        });
      }
    });
  },
  delete: function(req, res) {
    Thread.findByIdAndRemove(req.params.threadId, (err, thread) => {
      if(err) {
        res.send(err);
      } else {
        let response = {
          id: req.params.threadId,
          status: 'success',
          message: 'thread is sucessfully deleted'
        };
        res.send(response);
      }
    });
  }
}

module.exports = threadControl;
