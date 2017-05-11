<template>
  <div class="container login">
    <h2 class="text-center"><b>Log In</b></h2>
    <div class="row">
      <div class="col-md-4">
      </div>
      <div class="col-md-4">
        <form class="form-group text-left">
          <label for="username" style="margin-top: 5px">Username</label>
          <input type="text" class="form-control" id="username" placeholder="Username">
          <label for="password" class="text-left" style="margin-top: 5px">Password</label>
          <input type="password" class="form-control" id="password" placeholder="Password">
          <input type="submit" class="btn btn-primary padded" style="margin-top: 10px">
        </form>
      </div>
      </div class="col-md-4">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login'
}
</script>

<style scoped>


</style>
