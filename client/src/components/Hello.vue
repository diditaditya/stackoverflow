<template>
  <div class="hello container">
    <h1><b>{{ msg }}</b></h1>
    <h4><q>{{ quote }}</q> ~ Mitchell Kapor</h4>
    <div v-if="isloggedin === false">
      <h4>Join our growing community!</h4>
      <router-link to="signup">
        <button class="btn btn-primary">
          Sign Up
        </button>
      </router-link>
    </div>
    <div v-else>
      <h4>Take a look at the threads or post your own question</h4>
      <router-link to="post">
        <button class="btn btn-primary">
          Post a Question
        </button>
      </router-link>
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
