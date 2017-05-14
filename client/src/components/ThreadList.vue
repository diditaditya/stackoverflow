<template>
  <div class="container" style="padding-top: 25px">
    <table class="table">
      <tbody>
        <tr v-for="(thread, index) in threads">
          <td>
            <div class="btn btn-default center">
              <span class="badge">{{ thread.voteCount }}</span> Votes
            </div>
            <div class="btn btn-default center">
              <span class="badge">{{ thread.answers.length }}</span> Answers
            </div>
          </td>
          <td>
            <router-link :to="{path:'/thread/'+index, params:{index: index}}" v-on:click.native="dontShowThreadList">
              <a href="#" class="text-left"><h4>{{ thread.title }}</h4></a>
            </router-link>
            <p>{{ thread.starter.username }}</p>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Thread from "./Thread";

export default {
  name: 'ThreadList',
  props: ['threads', 'message'],
  data () {
    return {

    }
  },
  methods: {
    dontShowThreadList: function() {
      this.$emit('dontShowThreadList');
    }
  }
}
</script>

<style scoped>

.center {
  vertical-align: middle;
}

</style>
