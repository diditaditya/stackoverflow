<template>
  <div class="container">
    <div v-if="isloggedin === false" class="hello">
      <h1><b>{{ msg }}</b></h1>
      <h4><q>{{ quote }}</q> ~ Mitchell Kapor</h4>
      <div>
        <h4>Join our growing community!</h4>
        <router-link to="signup">
          <button class="btn btn-primary">
            Sign Up
          </button>
        </router-link>
      </div>
    </div>
    <div v-else class="container-fluid" style="margin-top: 25px">
      <div class="row">
        <div class="col-4 col-sm-4 col-md-4" style=""><h3>Threads List</h3></div>
        <div class="col-4 col-sm-4 col-md-4" style="">
          <!-- <form class="form-inline" style="margin-top: 15px">
            <input class="form-control" type="text" placeholder="Search">
            <input class="btn btn-default" type="submit" value="Search">
          </form> -->
        </div>
        <div class="col-4 col-sm-4 col-md-4" style="margin-top: 15px">
          <router-link to="postQuestion">
            <button class="btn btn-primary">
              Ask a Question
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  props: ['isloggedin'],
  methods: {
    showThread: function() {
      this.$emit("showThread");
    }
  },
  data () {
    return {
      msg: 'Welcome to StuckOverFlow',
      quote: 'Getting information off the internet is like taking a drink from a fire hydrant'
    }
  },
  mounted: function() {
    this.showThread();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  border-top: 5px solid Grey;
  border-bottom: 5px solid Grey;
  height: 250px;
  padding-top: 25px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
