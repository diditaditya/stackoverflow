<template>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#">
        <router-link to="/">
          <i class="glyphicon glyphicon-tasks"></i>
          StuckOverFlow
        </router-link>
      </a>
      <div class="navbar-right" v-if="isloggedin === false">
        <ul class="nav navbar-nav">
          <li>
            <a href="#">
              <router-link to="login">
                Log In
              </router-link>
            </a>
          </li>
          <li>
            <a href="#">
              <router-link to="signup">
                Sign Up
              </router-link>
            </a>
          </li>
        </ul>
      </div>
      <div class="navbar-right" v-else>
        <ul class="nav navbar-nav">
          <li><a class="text-capitalize"><b>{{ user.username }}</b></a></li>
          <li><a href="#" v-on:click="logout">Log Out</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'navbar',
    props: ['isloggedin', 'logout', 'user'],
    methods: {

    }
  }
</script>
