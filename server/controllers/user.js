const User = require('../models/user');

let userControl = {
  showAll: function(req, res) {
    User.find({}).populate(['threads', 'answers', 'votes']).exec((err, users) => {
      if(err) {
        res.send(err);
      } else {
        res.send(users);
      }
    });
  },
  showById: function(req, res) {
    User.findOne({'username': req.params.user}).populate(['threads', 'answers', 'votes']).exec((err, user) => {
      if (err) {
        res.send(err);
      } else {
        res.send(user);
      }
    });
  },
  update: function(req, res) {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        res.send(err);
      } else {
        let threads = req.body.threads || user.threads;
        let answers = req.body.answers || user.answers;
        let votes = req.body.votes || user.votes;
        User.update({_id: req.params.id}, {$set:{
          'username': user.username,
          'email': user.email,
          'password': user.password,
          'threads': threads,
          'answers': answers,
          'votes': votes
        }}, (err, updated) => {
          if (err) {
            console.log('goes to error in local user update');
            res.send(err);
          } else {
            console.log('local user is updated');
            res.send(updated);
          }
        });
      }
    });
  },
  delete: function(req, res) {
    User.findByIdAndRemove(req.params.id, (err, user) => {
      if(err) {
        res.send(err);
      } else {
        let response = {
          id: req.params.id,
          status: 'success',
          message: 'user is sucessfully deleted'
        };
        res.send(response);
      }
    });
  },
  register: function(req, res) {
    if(req.status === 'failed') {
      console.log(req.message);
      res.send({status: req.status, message: req.message});
    } else {
      res.send({status: req.status, message: req.message, user: req.user});
    }
  },
  localSignin: function(req, res) {
    console.log('status: ', req.user.status);
    console.log('message: ', req.user.message);
    if(req.user.status === "failed") {
      res.send({status: req.user.status, message: req.user.message});
    }
    if(req.user.status === "success"){
      res.send(req.user)
    } else {
      res.send('error');
    }
  }
}

module.exports = userControl;
