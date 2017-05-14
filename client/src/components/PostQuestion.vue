<template>
  <div class="container">
    <div class="col-md-3"></div>
    <div class="col-md-6">
      <form v-on:submit.prevent="postQuestion" class="form-group text-left">
        <label for="title">Title</label>
        <input v-model="thread.title" id="title" class="form-control" type="text" placeholder="Title">
        <label for="question" style="margin-top: 10px">Question</label>
        <textarea v-model="thread.question" id="question" rows="10" class="form-control" placeholder="Your question here"></textarea>
        <label for="tags" style="margin-top: 10px">Tags</label>
        <input v-model="thread.tags" id="tags" class="form-control" type="text" placeholder="Tags, separated by spaces, max. 5 tags">
        <input type="submit" class="btn btn-primary" value="Post Your Question" style="margin-top: 20px">
      </form>
      <p>{{ message }}</p>
    </div>
    <div class="col-md-3"></div>
  </div>

</template>

<script>
export default {
  name: 'postQuestion',
  props: ['isloggedin', 'user'],
  computed: {
    threads2() {
      return this.$store.getters.threads2;
    },
    currentUser() {
      return this.$store.getters.currentUser;
    }
  },
  data: function() {
    return {
      thread: {
        starter: '',
        title: '',
        question: '',
        tags: '',
      },
      message: ''
    }
  },
  methods: {
    testRouterPush: function() {
      this.$router.push('/');
    },
    dontShowThread: function() {
      this.$emit('dontShowThread');
    },
    checkloggedin: function() {
      if(localStorage.getItem('token')) {

        let api = 'http://localhost:3000/users'
        let body = {
          'token': localStorage.getItem('token')
        };

        let self = this;

        axios.post(api, body)
          .then(function(response) {
            if(!response.data.id) {
              self.$router.push('/login');
            } else {
              self.$store.state.currentUser = response.data;
            }
          })
          .catch(function(err) {
            console.log(err);
          });

      } else {
        this.$router.push('/login');
      }
    },
    postQuestion: function() {

      if(this.thread.title && this.thread.question) {

        let tags = this.thread.tags;
        if(tags) {
          tags = tags.split(" ");
        } else {
          tags = [];
        }

        let body = {
          starter: this.user.id,
          title: this.thread.title,
          question: this.thread.question,
          votes: [],
          voteCount: 0,
          tags: tags
        };

        let self = this;

        let api = 'http://localhost:3000/threads';

        axios.post(api, body)
          .then(function(response) {
            let newThread = {
              id: response.data.thread._id,
              starter: {
                id: self.user.id,
                username: self.user.username
              },
              title: self.thread.title,
              question: self.thread.question,
              createdAt: response.data.thread.createdAt,
              updatedAt: response.data.thread.updatedAt,
              voteCount: response.data.thread.voteCount,
              votes: response.data.thread.votes,
              tags: response.data.thread.tags,
              answers: response.data.thread.answers
            };
            console.log(newThread);
            if(response.data.status === "success") {
              console.log(response.data);
              let threads = self.currentUser.threads;
              threads.push(response.data.id);
              let api = 'http://localhost:3000/user/'+self.currentUser.id;
              axios.put(api, {threads: threads})
                .then(function(response) {
                  console.log(response.data);
                  self.$emit('postQuestion', newThread);
                  self.$store.state.threads2.push(newThread);
                  self.$router.push("/");
                })
                .catch(function(err) {
                  console.log(err);
                });
            }
          })
          .catch(function(err) {
            console.log(err);
          });

      } else {
        this.message = "Title and Question cannot be empty";
      }
    }
  },
  created: function() {
    this.checkloggedin();
  },
  mounted: function() {
    this.checkloggedin();
    this.dontShowThread();
  }
}
</script>
