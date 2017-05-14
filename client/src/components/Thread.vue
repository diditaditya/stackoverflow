<template>
  <div class="container">
    <div class="row">
      <div style="padding: 10px; border-bottom: 1px solid grey">
        <h2 class="text-capitalize">{{ threads2[index].title }}</h2>
      </div>
      <div class="row">
        <div class="col-md-3" style="min-height: 100px"></div>
        <div class="col-md-6 text-left" style="margin-top: 25px; min-height: 100px; border-bottom: 3px solid grey">
          <div class="row" style="height: 80%">
            <p>{{ threads2[index].question }}</p>
          </div>
          <div v-if="authorization === 'starter'" class="row text-right" style="margin: 10px">
            <button class="btn btn-warning">Edit Question</button>
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
            <div class="col-md-3"></div>
            <div class="col-md-6 text-left" style="margin-top: 25px; min-height: 100px; border-bottom: 1px solid grey">
              <p>{{ answer.content }}</p>
              <div v-if="currentUser.id === answer.user" class="row text-right" style="margin: 10px">
                <button class="btn btn-warning">Edit Answer</button>
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
            <form v-on:submit.prevent="postAnswer" class="form-group">
              <label for="answer">Share your answer or reply?</label>
              <textarea v-model="newAnswer" id="answer" rows="7" class="form-control" placeholder="Your answer here" value=""></textarea>
              <input class="btn btn-primary" type="submit" style="margin-top: 10px" value="Post your Reply">
            </form>
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
      authorization: '',
      newAnswer : ''
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
                //console.log('before: ', self.$store.state.threads2[self.index].answers);
                //console.log('deleted index ', index);
                //self.$store.state.threads2[self.index].answers.splice(index, 1);
                //console.log('after: ', self.$store.state.threads2[self.index].answers);
              })
              .catch(function(err) {
                console.log(err);
              });
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    }
  },
  created: function() {
    this.dontShowThread();
  },
  mounted: function() {
    this.checkAuth();
  }
}
</script>
