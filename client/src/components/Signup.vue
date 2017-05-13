<template>
  <div class="container signup">
    <h2 class="text-center"><b>Sign Up</b></h2>
    <div class="row">
      <div class="col-md-4">
      </div>
      <div class="col-md-4">
        <form v-on:submit.prevent="signup" class="form-group text-left">
          <label for="username" style="margin-top: 5px">Username</label>
          <input v-model="username" type="text" class="form-control" id="username" placeholder="Username">
          <label for="email" style="margin-top: 5px">Email</label>
          <input v-model="email" type="email" class="form-control" id="email" placeholder="email">
          <label for="password" class="text-left" style="margin-top: 5px">Password</label>
          <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
          <input type="submit" class="btn btn-primary padded" style="margin-top: 10px" value="Sign up">
        </form>
        <p style="color: red"> {{ message }} </p>
        <p></p>
        <p>Already have an account? <a href="#">Sign in</a></p>

      </div>
      </div class="col-md-4">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'signup',
  props: [],
  data: function() {
    return {
      username: '',
      email: '',
      password: '',
      message: ''
    }
  },
  methods: {
    isUsernameValid: function(username) {
      if(username.length < 3) {
        this.message = 'username is too short';
        return false;
      } else if(/^[0-9]/.test(password)) {
        this.message = 'username cannot start with numbers';
        return false;
      } else if(/[!@#$%^&*\(\)<,>.+=?]/.test(username)) {
        this.message = 'username cannot contain special characters';
        return false;
      } else {
        return true;
      }
    },
    isEmailValid: function(email) {
      if(!(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))) {
        this.message = 'email is invalid';
        return false;
      } else {
        return true;
      }
    },
    isPasswordValid: function(password) {
      if(password.length < 7) {
        this.message = 'password is too short';
        return false;
      } else {
        return true;
      }
    },
    signup: function() {
      console.log('username: ', this.username);
      console.log('username length: ', this.username.length);
      console.log('email: ', this.email);
      console.log('password: ', this.password);
      if(this.username.length > 0 && this.email.length > 0 && this.password.length > 0) {
        if(this.isUsernameValid(this.username)) {
          if(this.isEmailValid(this.email)) {
            if(this.isPasswordValid(this.password)) {
              let self = this;
              let body = {
                username: this.username,
                email: this.email,
                password: this.password
              };
              let api = 'http://localhost:3000/signup';
              this.axios.post(api, body)
                .then(function(response) {
                  console.log(response.data);
                }).catch(function(err) {
                  console.log(err);
                });
            }
          }
        }
      } else {
        this.message = 'username, email, and password may not be empty';
      }
    }
  }
}
</script>

<style scoped>


</style>
