// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ThreadList from "./components/ThreadList"

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App :threads="threads" :message="message"></App>',
  components: { App, ThreadList },
  data: {
    threads: [],
    message: 'up and running'
  },
  methods: {
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
    }
  },
  created: function() {
    this.fetchThreads();
  }
})
