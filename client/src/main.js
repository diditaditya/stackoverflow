// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'
import Navbar from "./components/Navbar"
import ThreadList from "./components/ThreadList"
import Login from "./components/Login"

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App :threads="threads" :message="message" v-on:alert="test"></App>',
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
    }
  },
  created: function() {
    this.fetchThreads();
    this.checkloggedin();
  }
})
