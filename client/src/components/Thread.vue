<template>
  <div class="container">
    <div class="row">
      <div style="padding: 10px; border-bottom: 1px solid grey">
        <h2 class="text-capitalize">{{ threads2[index].title }}</h2>
      </div>
      <div class="row">
        <div class="col-md-3" style="min-height: 100px">
          <div class="row" style="margin-top: 50px">
            <span v-if="hasVotedQuestion === false" v-on:click="voteQuestionUp" class="glyphicon glyphicon-chevron-up text-center" style="font-size: 1.5em; cursor: pointer" title="well researched; useful question; clear"></span>
            <span style="font-size: 1.5em">{{ threads2[index].voteCount }}</span>
            <span v-if="hasVotedQuestion === false" v-on:click="voteQuestionDown" class="glyphicon glyphicon-chevron-down text-center" style="font-size: 1.5em; cursor: pointer" title="not well-researched; unclear"></span>
          </div>
        </div>
        <div class="col-md-6 text-left" style="margin-top: 25px; min-height: 100px; border-bottom: 3px solid grey">
          <div class="row" style="height: 80%">
            <div>
              <p>{{ threads2[index].question }}</p>
            </div>
            <div style="margin: 25px 0px 10px 0px">
              <span v-for="tag in threads2[index].tags" style="margin-left: 5px; display: inline">
                <span class="tag">{{ tag }}</span>
              </span>
              <!-- <h6 v-if="threads2[index].updatedAt">updated at:{{ convertTime(threads2[index].updatedAt) }}</h6> -->
            </div>
          </div>
          <div v-if="authorization === 'starter'" class="row text-right" style="margin: 10px">
            <textarea v-if="showEditQuestion === true" v-model="edittedQuestion" id="answer" rows="7" class="form-control" style="margin-bottom: 10px"></textarea>
            <button v-if="showEditQuestion === true" v-on:click="closeEditQuestion" class="btn btn-info">Cancel</button>
            <button v-if="showEditQuestion === false" v-on:click="showEditFormQuestion" class="btn btn-warning">Edit Question</button>
            <button v-if="showEditQuestion === true" v-on:click="editQuestion" class="btn btn-warning">Edit Question</button>
            <button v-on:click="deleteQuestion" class="btn btn-danger">Delete Question</button>
          </div>
        </div>
        <div class="col-md-3" style="min-height: 100px; margin-top: 15px">
          <h5>Posted by</h5>
          <h4>{{ threads2[index].starter.username }}</h4>
          <p>at {{ convertTime(threads2[index].createdAt) }}</p>
        </div>
      </div>

      <div class="container" style="margin-top: 25px">
        <div v-for="(answer, index) in answers" class="row">
          <div class="row">
            <div class="col-md-3">
              <div class="row" style="margin-top: 15px">
                <!-- <span v-if="checkIfHasVotedAnswer(index)" v-on:click="voteAnswerUp(index)" class="glyphicon glyphicon-chevron-up text-center" style="font-size: 1.5em" title="useful answer; clear"></span>
                <span style="font-size: 1.5em">{{ answer.voteCount }}</span>
                <span v-if="checkIfHasVotedAnswer(index)" v-on:click="voteAnswerDown(index)" class="glyphicon glyphicon-chevron-down text-center" style="font-size: 1.5em" title="not answering anything; unclear"></span> -->
              </div>
            </div>
            <div class="col-md-6 text-left" style="margin-top: 25px; min-height: 100px; border-bottom: 1px solid grey">
              <p>{{ answer.content }}</p>
              <div v-if="currentUser.id === answer.user" class="row text-right" style="margin: 10px">
                <!-- <textarea v-if="answer.showEditAnswer === true" v-model="edittedAnswer" id="answer" rows="7" class="form-control" style="margin-bottom: 10px"></textarea>
                <button v-if="answer.showEditAnswer === true" v-on:click="closeEditAnswer(index)" class="btn btn-info">Cancel</button>
                <button v-if="answers[index].showEditAnswer === false" v-on:click="showEditFormAnswer(index)" class="btn btn-warning">Edit Answer</button>
                <button v-if="answers[index].showEditAnswer === true" v-on:click="editAnswer(index)" class="btn btn-warning">Edit Answer</button> -->
                <button v-on:click="deleteReply(index)" class="btn btn-danger">Delete Answer</button>
              </div>
            </div>
            <div class="col-md-3" style="margin-top: 15px">
              <h5>Replied by</h5>
              <h4>{{ getUser(answer.user) }}</h4>
              <p>at {{ convertTime(answer.createdAt) }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="container" style="margin-top: 50px">
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6 text-left">
            <form v-if="isloggedin" v-on:submit.prevent="postAnswer" class="form-group">
              <label for="answer">Share your answer or reply?</label>
              <textarea v-model="newAnswer" id="answer" rows="7" class="form-control" placeholder="Your answer here" value=""></textarea>
              <input class="btn btn-primary" type="submit" style="margin-top: 10px" value="Post your Reply">
            </form>
            <div v-else class="">
              <p>Please <router-link to="/login"> <a href="#">sign in</a> </router-link> to answer the question.</p>
            </div>
          </div>
          <div class="col-md-3"></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Thread',
  props: [],
  computed: {
    threads2() {
      return this.$store.getters.threads2;
    },
    thread2() {
      return this.$store.getters.threads2[this.index];
    },
    users2() {
      return this.$store.getters.users2;
    },
    currentUser() {
      return this.$store.getters.currentUser;
    },
    answers() {
      return this.$store.getters.threads2[this.index].answers;
    }
  },
  data: function() {
    return {
      index: this.$route.params.index,
      isloggedin: false,
      authorization: '',
      hasVotedQuestion: false,
      newAnswer : '',
      showEditQuestion: false,
      edittedQuestion : ''
    }
  },
  methods: {
    convertTime: function(time) {
      let oriTime = new Date(time);
      let year = oriTime.getFullYear();
      let month = oriTime.getMonth() + 1;
      let date = oriTime.getDate();
      let hour = oriTime.getHours();
      let minute = oriTime.getMinutes();
      let second = oriTime.getSeconds();

      return `${year}-${month}-${date} ${hour}:${minute}:${second}`
    },
    dontShowThread: function() {
      this.$emit("dontShowThread");
    },
    checkAuth: function() {
      if(localStorage.getItem('token')) {
        this.isloggedin = true;

        let api = 'http://localhost:3000/users'
        let body = {
          'token': localStorage.getItem('token')
        };

        let self = this;

        axios.post(api, body)
          .then(function(response) {
            console.log(response);
            self.$store.state.currentUser = response.data;
            if(response.data.id === self.thread2.starter.id) {
              self.authorization = "starter";
            } else {
              self.authorization = "other";
            }
          })
          .catch(function(err) {
            console.log(err);
          });

      } else {
        self.authorization = "other";
      }
    },
    deleteQuestion: function() {
      if(confirm("Do you want to delete the question? \n WARNING: This will delete the thread")) {
        let body = {
          threadId: this.threads2[this.index].id
        };
        let api = 'http://localhost:3000/thread/' + body.threadId;
        let self = this;
        axios.delete(api, body)
          .then(function(response) {
            if(response.data.status === "success") {

              let userId = self.currentUser.id;
              let newThreads = self.currentUser.threads;
              let indexInUserThreads = newThreads.indexOf(self.threads2[self.index].id);
              newThreads.splice(indexInUserThreads, 1);
              let userUpdatebody = {
                threads: newThreads
              };
              let api = 'http://localhost:3000/user/' + userId;
              axios.put(api, userUpdatebody)
                .then(function(response) {
                  if(response.data.status === "success") {
                    console.log(response);
                    self.$store.state.threads2.splice(self.index,1);
                    self.$router.push("/");
                  } else {
                    console.log(response);
                  }
                })
                .catch(function(err) {
                  console.log(err);
                });
            } else {
              console.log(response);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    postAnswer: function() {
      if(this.newAnswer.length > 0) {
        let postAnswerBody = {
          user: this.currentUser.id,
          thread: this.threads2[this.index].id,
          content: this.newAnswer
        };
        let api = 'http://localhost:3000/answers';
        let self = this;
        axios.post(api, postAnswerBody)
          .then(function(response) {
            if(response.data.status === 'success') {

              console.log(response.data);
              let completeAnswer = response.data.answer;

              let answers = self.answers.map(function(answer) {
                return answer._id;
              });

              answers.push(response.data.answer._id);

              let updateThreadBody = {
                answers: answers
              };

              let api = 'http://localhost:3000/thread/' + self.threads2[self.index].id;

              axios.put(api, updateThreadBody)
                .then(function(response) {
                  console.log(response);
                  self.$store.state.threads2[self.index].answers.push(completeAnswer);
                  document.getElementById("answer").value = "";
                })
                .catch(function(err) {
                  console.log(err);
                });

            } else {
              console.log(response);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    getUser: function(userId) {
      let match = this.users2.filter(function(user) {
        return user._id === userId
      });
      return match[0].username;
    },
    deleteReply: function(index) {
      if(confirm('Do you really want to delete the answer?')) {
        let answerId = this.answers[index]._id;

        let answers = this.answers;

        let api = 'http://localhost:3000/answer/' + answerId;
        let self = this;
        //console.log('at the beginning: ', self.$store.state.threads2[self.index].answers);
        axios.delete(api)
          .then(function(response) {
            answers.splice(index, 1);
            let url = 'http://localhost:3000/thread/' + self.thread2.id;
            let body = {
              answers: answers
            };
            axios.put(url, body)
              .then(function(response) {
                console.log(response);
              })
              .catch(function(err) {
                console.log(err);
              });
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    editQuestion: function() {

      let threadId = this.threads2[this.index].id;
      let body = {
        question: this.edittedQuestion
      };
      let api = "http://localhost:3000/thread/" + threadId;
      let self = this;
      axios.put(api, body)
        .then(function(response) {
          if(response.data.status === "success") {
            console.log(response);
            self.$store.state.threads2[self.index].question = self.edittedQuestion;
            self.closeEditQuestion();
          } else {
            console.log(response);
          }
        })
        .catch(function(err) {
          console.log(err);
        });

    },
    closeEditQuestion: function() {
      this.showEditQuestion = false;
    },
    showEditFormQuestion: function() {
      this.showEditQuestion = true;
      this.edittedQuestion = this.threads2[this.index].question;
    },
    showEditFormAnswer: function(index) {
      this.threads2[this.index].answers[index].showEditAnswer = true;
      this.edittedAnswer = this.answers[index].content;
    },
    closeEditAnswer: function(index) {
      this.answers[index].showEditAnswer = false;
    },
    voteQuestionUp: function() {
      if(localStorage.getItem('token')) {
        let userId = this.currentUser.id;
        let threadId = this.threads2[this.index].id;
        let createVoteBody = {
          userId: userId,
          parent: {thread: threadId},
          vote: "up"
        };
        let self = this;
        let url = 'http://localhost:3000/votes';
        axios.post(url, createVoteBody)
          .then(function(response) {
            if(response.data.status === "success") {
              let newVote = response.data.vote;
              let url = 'http://localhost:3000/thread/' + threadId;
              let votes = self.threads2[self.index].votes || [];
              votes.push(newVote._id);
              let voteCount = self.threads2[self.index].voteCount;
              let updateThreadBody = {
                votes: votes,
                voteCount: voteCount + 1
              };
              axios.put(url, updateThreadBody)
                .then(function(response) {
                  self.$store.state.threads2[self.index].votes.push(newVote);
                  self.$store.state.threads2[self.index].voteCount += 1;
                  self.hasVotedQuestion = true;
                  console.log(response.data);
                })
                .catch(function(err) {
                  console.log(err);
                });
            } else {
              console.log(response.data);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      } else {
        alert('You must sign in first before voting!');
      }
    },
    voteQuestionDown: function() {
      if(localStorage.getItem('token')) {
        let userId = this.currentUser.id;
        let threadId = this.threads2[this.index].id;
        let createVoteBody = {
          userId: userId,
          parent: {thread: threadId},
          vote: "down"
        };
        let self = this;
        let url = 'http://localhost:3000/votes';
        axios.post(url, createVoteBody)
          .then(function(response) {
            if(response.data.status === "success") {
              let newVote = response.data.vote;
              let url = 'http://localhost:3000/thread/' + threadId;
              let votes = self.threads2[self.index].votes || [];
              votes.push(newVote._id);
              let voteCount = self.threads2[self.index].voteCount;
              console.log('voteCount: ', voteCount);
              let updateThreadBody = {
                votes: votes,
                voteCount: voteCount - 1
              };
              axios.put(url, updateThreadBody)
                .then(function(response) {
                  self.$store.state.threads2[self.index].votes.push(newVote);
                  self.$store.state.threads2[self.index].voteCount -= 1;
                  self.hasVotedQuestion = true;
                  console.log(response.data);
                })
                .catch(function(err) {
                  console.log(err);
                });
            } else {
              console.log(response.data);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      } else {
        alert('You must sign in first before voting!');
      }
    },
    checkIfHasVotedQuestion: function() {
      let self = this;
      console.log('currentUser.id',self.currentUser.id);
      console.log('threads2: ',this.threads2[this.index]);
      this.threads2[this.index].votes.forEach(function(vote) {
        if(vote.user === self.currentUser.id) {
          console.log('question user vote: ', vote.user);
          console.log('he has voted!');
          self.hasVotedQuestion = true;
        }
      });
    },
    checkIfHasVotedAnswer: function(index) {
      let self = this;
      this.answers[index].votes.forEach(function(vote) {
        if(vote.user === self.currentUser.id) {
          console.log('question user vote: ', vote.user);
          console.log('he has voted!');
          self.answer[index].hasVotedQuestion = true;
        }
      });
    },
    checkHasVotedForAllAnswer: function() {
      let self = this;
      for(let i = 0; i < self.answers.length; i++) {
        self.checkIfHasVotedAnswer(i);
      }
    },
    voteAnswerUp: function(index) {
      if(localStorage.getItem('token')) {
        let userId = this.currentUser.id;
        let answerId = this.answers[index].id;
        let createVoteBody = {
          userId: userId,
          parent: {answer: answerId},
          vote: "up"
        };
        let self = this;
        let url = 'http://localhost:3000/votes';
        axios.post(url, createVoteBody)
          .then(function(response) {
            if(response.data.status === "success") {
              let newVote = response.data.vote;
              let url = 'http://localhost:3000/answer/' + answerId;
              let votes = self.answers[index].votes;
              votes.push(newVote._id);
              let voteCount = self.answers[index].voteCount;
              let updateAnswerBody = {
                votes: votes,
                voteCount: voteCount + 1
              };
              axios.put(url, updateAnswerBody)
                .then(function(response) {
                  self.$store.state.threads2[self.index].answers[index].votes.push(newVote);
                  self.$store.state.threads2[self.index].answers[index].voteCount += 1;
                  self.answers[index].hasVotedAnswer = true;
                  console.log(response.data);
                })
                .catch(function(err) {
                  console.log(err);
                });
            } else {
              console.log(response.data);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      } else {
        alert('You must sign in first before voting!');
      }
    },
    voteAnswerDown: function(index) {
      if(localStorage.getItem('token')) {
        let userId = this.currentUser.id;
        let answerId = this.answers[index].id;
        let createVoteBody = {
          userId: userId,
          parent: {answer: answerId},
          vote: "down"
        };
        let self = this;
        let url = 'http://localhost:3000/votes';
        axios.post(url, createVoteBody)
          .then(function(response) {
            if(response.data.status === "success") {
              let newVote = response.data.vote;
              let url = 'http://localhost:3000/answer/' + answerId;
              let votes = self.answers[index].votes;
              votes.push(newVote._id);
              let voteCount = self.answers[index].voteCount;
              let updateAnswerBody = {
                votes: votes,
                voteCount: voteCount - 1
              };
              axios.put(url, updateAnswerBody)
                .then(function(response) {
                  self.$store.state.threads2[self.index].answers[index].votes.push(newVote);
                  self.$store.state.threads2[self.index].answers[index].voteCount -= 1;
                  self.answers[index].hasVotedAnswer = true;
                  console.log(response.data);
                })
                .catch(function(err) {
                  console.log(err);
                });
            } else {
              console.log(response.data);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      } else {
        alert('You must sign in first before voting!');
      }
    }
  },
  created: function() {
    this.dontShowThread();
    this.checkIfHasVotedQuestion();
    console.log('threads2: ',this.threads2[this.index]);
    console.log('currentUser: ', this.currentUser);
  },
  mounted: function() {
    this.checkAuth();
    this.thread2.answers.map(function(answer) {
      answer.showEditAnswer = false;
    });
    this.answers.map(function(answer) {
      answer.hasVotedAnswer = false;
    });
    // this.checkHasVotedForAllAnswer();
  }
}
</script>

<style>

.tag {
  padding: 3px;
  border: 1px solid grey;
  border-radius: 25px;
  background-color: grey;
  color: white;
}

</style>
