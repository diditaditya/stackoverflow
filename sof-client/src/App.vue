<template>
  <div id="app">
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#">
          <router-link to="/">
            <i class="glyphicon glyphicon-tasks"></i>
            StuckOverFlow
          </router-link>
        </a>
        <div class="navbar-right">
          <ul class="nav navbar-nav">
            <li>
              <a href="#">
                <router-link to="login">
                  Log In
                </router-link>
              </a>
            </li>
            <li><a href="#">Sign Up</a></li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
    <thread-list :message="message" :threads="threads"></thread-list>
  </div>
</template>

<script>
import ThreadList from './components/ThreadList';

export default {
  name: 'app',
  props: ['message', 'threads'],
  components: {
    ThreadList
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
