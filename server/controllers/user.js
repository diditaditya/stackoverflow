const User = require('../models/user');
const Thread = require('../models/thread');
const Vote = require('../models/vote');
const bcrypt = require('bcrypt');
let saltRounds = 10;
const JWTCheck = require('../helpers/jwtCheck');

let userControl = {
  showAll: function(req, res) {
    User.find({}).populate(['threads', 'answers', 'votes']).exec((err, users) => {
      if(err) {
        res.send(err);
      } else {
        users.forEach((user) => {
          user.password = '';
        });
        res.send(users);
      }
    });
  },
  showById: function(req, res) {
    User.findById(req.params.id).populate(['threads', 'answers', 'votes']).exec((err, user) => {
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
        let comments = req.body.comments || user.comments;
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
            let response = {
              status: 'success',
              message: 'user has been successfully updated',
              updated: updated
            };
            res.send(response);
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
      let username = req.body.username;
      let email = req.body.email;
      let password = req.body.password;
      User.findOne({'local.username': username}, function(err, user) {
        if(err) {
          let response = {
            status: 'failed',
            message: 'error in finding the user in database'
          };
          res.send(response);
        }
        if(user) {
          let response = {
            status: 'failed',
            message: 'username is already taken'
          };
          res.send(respose);
        } else {
          let newUser = new User();
          newUser.username = username;
          newUser.email = email;
          bcrypt.hash(password, saltRounds, function(err, hashed) {
            if(err) {
              let response = {
                status: 'failed',
                message: 'error hashing password'
              };
              res.send(response);
            }
            newUser.password = hashed;
            newUser.save((err) => {
              if(err) {
                let response = {
                  status: 'failed',
                  message: 'error in saving user'
                };
                res.send(response);
              }
              let response = {
                status: 'sucess',
                message: 'user is successfully registered'
              };
              res.send(response);
            });
          });
        }
      });
  },
  signIn: function(req, res) {
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
  },
  checkJwt: function(req, res) {
    let token = req.headers['x-access-token'] || req.body.token;
    JWTCheck(token, function(data) {
      if(data) {
        res.send(data);
      } else {
        res.send(err);
      }
    })

  }
}

module.exports = userControl;
