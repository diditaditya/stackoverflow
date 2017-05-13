<template>
  <div id="app">
    <navbar :isloggedin="isloggedin" :logout="logout"></navbar>
    <router-view v-on:checkloggedin="checkloggedin"></router-view>
    <thread-list :message="message" :threads="threads"></thread-list>
  </div>
</template>

<script>
import ThreadList from './components/ThreadList';
import Navbar from './components/Navbar';

export default {
  name: 'app',
  props: ['message', 'threads', 'loggedin'],
  data: function() {
    return {
      isloggedin: false,
      username: ''
    }
  },
  methods: {
    alert: function() {
      alert('in App.vue alert method!');
      this.$emit("alert");
    },
    checkloggedin: function() {
      console.log('in App.vue checkloggedin');
      if(localStorage.getItem('token')) {
        this.isloggedin = true;
      } else {
        this.isloggedin = false;
      }
      console.log('is user logged in? ', this.isloggedin);
      this.$emit("checkloggedin");
    },
    logout: function() {
      localStorage.clear();
      this.isloggedin = false;
    }
  },
  components: {
    ThreadList, Navbar
  },
  created: function() {
    console.log('in App.vue created');
    this.checkloggedin();
  },
  beforeMount: function() {
    console.log('in App.vue beforeMount');
  },
  mounted: function() {
    console.log('in App.vue mounted');
  }
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
