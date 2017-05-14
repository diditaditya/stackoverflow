// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'
import { store } from './store/store'

import Navbar from "./components/Navbar"
import ThreadList from "./components/ThreadList"

Vue.use(VueAxios, axios)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router,
  template: '<App :threads="threads" :message="message" v-on:alert="test" v-on:appendThread="appendThread"></App>',
  components: { App, ThreadList, Navbar },
  data: {
    threads: [],
    loggedin: false,
    message: 'up and running'
  },
  methods: {
    test: function() {
      alert('in Main.js test method!');
    },
    fetchThreads: function() {
      let self = this;
      let url = "http://localhost:3000/threads";
      axios.get(url)
        .then(function(response) {
          console.log(response);
          self.threads = response.data;
          self.$store.state.threads2 = response.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    fetchUsers: function() {
      let self = this;
      let url = "http://localhost:3000/users";
      axios.get(url)
        .then(function(response) {
          console.log(response.data);
          self.$store.state.users2 = response.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    fetchAnswers: function() {
      let self = this;
      let url = "http://localhost:3000/answers";
      axios.get(url)
        .then(function(response) {
          console.log(response.data);
          self.$store.state.answers2 = response.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    checkloggedin: function() {
      if(localStorage.getItem('token')) {
        this.loggedin = true;
      } else {
        this.loggedin = false;
      }
    },
    appendThread: function(newThread) {
      console.log(newThread);
      this.threads.push(newThread);
    }
  },
  created: function() {
    this.fetchThreads();
    this.fetchUsers();
    this.fetchAnswers();
    this.checkloggedin();
  }
})
