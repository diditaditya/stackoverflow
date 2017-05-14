<template>
  <div id="app">
    <navbar :isloggedin="isloggedin" :logout="logout" :user="user"></navbar>
    <router-view v-on:checkloggedin="checkloggedin" :user="user" :isloggedin="isloggedin" v-on:dontShowThread="dontShowThread" v-on:showThread="showThread" v-on:postQuestion="appendThread" :threads="threads">
    </router-view>
    <thread-list :message="message" :threads="threads" v-if="showThreadList === true" v-on:dontShowThreadList="dontShowThread"></thread-list>
  </div>
</template>

<script>
import ThreadList from './components/ThreadList';
import Navbar from './components/Navbar';
import PostQuestion from "./components/PostQuestion";
import Login from "./components/Login";
import Thread from "./components/Thread";

export default {
  name: 'app',
  props: ['message', 'threads', 'loggedin'],
  computed: {
    threads2() {
      return this.$store.state.threads;
    }
  },
  data: function() {
    return {
      showThreadList: true,
      isloggedin: false,
      user: {
        id: '',
        username: '',
        email: '',
        threads: [],
        comments: [],
        votes: []
      }
    }
  },
  methods: {
    dontShowThread: function() {
      this.showThreadList = false;
    },
    showThread: function() {
      this.showThreadList = true;
    },
    checkloggedin: function() {
      if(localStorage.getItem('token')) {
        this.isloggedin = true;

        let api = 'http://localhost:3000/users'
        let body = {
          'token': localStorage.getItem('token')
        };

        let self = this;

        axios.post(api, body)
          .then(function(response) {
            self.user.username = response.data.username;
            self.user.id = response.data.id;
            self.user.email = response.data.email;
            self.user.threads = response.data.threads;
            self.user.answers = response.data.answers;
            self.user.votes = response.data.votes;
          })
          .catch(function(err) {
            console.log(err);
          });

      } else {
        this.isloggedin = false;
      }
      this.$emit("checkloggedin");
    },
    logout: function() {
      localStorage.clear();
      this.$store.state.currentUser = {};
      this.isloggedin = false;
    },
    appendThread: function(newThread) {
      console.log(newThread);
      this.$emit('appendThread', newThread);
    }
  },
  components: {
    ThreadList, Navbar
  },
  created: function() {
    this.showThreadList = true;
    this.checkloggedin();
  },
  beforeMount: function() {},
  mounted: function() {}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

/*
    <img src="./assets/logo.png">
*/
