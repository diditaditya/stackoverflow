<template>
  <div class="container login">
    <h2 class="text-center"><b>Log In</b></h2>
    <div class="row">
      <div class="col-md-4">
      </div>
      <div class="col-md-4">
        <form v-on:submit.prevent="signin" class="form-group text-left">
          <label for="username" style="margin-top: 5px">Username</label>
          <input v-model="username" type="text" class="form-control" id="username" placeholder="Username">
          <label for="password" class="text-left" style="margin-top: 5px">Password</label>
          <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
          <input type="submit" class="btn btn-primary padded" style="margin-top: 10px" value="Sign in">
        </form>
        <p>{{ message }} </p>
      </div>
      </div class="col-md-4">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  props: [],
  data: function() {
    return {
      username: '',
      password: '',
      message: '',
      isloggedin: false
    }
  },
  methods: {
    dontShowThread: function() {
      this.$emit("dontShowThread");
    },
    signin: function() {

      if(this.username && this.password) {
        let api = 'http://localhost:3000/signin';
        let body = {
          username: this.username,
          password: this.password
        };

        let self = this;

        this.axios.post(api, body).then(function(response) {
          if(response.data.status === "success") {
            localStorage.setItem('token', response.data.token);
            self.username = response.data.user.username;
            self.checkloggedin(self.username);
            self.$store.state.currentUser = response.data.user;
            self.$router.push('/');
          } else {
            self.message = response.data.message;
          }

        }).catch(function(err) {
          console.log(err);
        });
      } else {
        this.message = "Username and password are required"
      }


    },
    checkloggedin: function() {
      if(localStorage.getItem('token')) {
        this.isloggedin = true;
        this.$emit("checkloggedin");
      } else {
        this.isloggedin = false;
      }

    }
  },
  created: function() {
    if(localStorage.getItem('token')) {
      this.message = 'You are already signed in, please log out first';
    }
  },
  mounted: function() {
    this.dontShowThread();
    console.log('in Login.vue mounted');
    if(localStorage.getItem('token')) {
      this.isloggedin = true;
    } else {
      this.isloggedin = false;
    }
    console.log('in log in, is user logged in? ', this.isloggedin);
  }
}
</script>

<style scoped>


</style>
