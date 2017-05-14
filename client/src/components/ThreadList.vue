<template>
  <div class="container" style="padding-top: 25px">
    <table class="table">
      <tbody>
        <tr v-for="(thread, index) in threads2">
          <td>
            <div style="margin-top: 10px">
              <div class="center label label-info">
                <span class="badge">{{ thread.voteCount }}</span> Votes
              </div>
              <div class="center label label-info">
                <span class="badge">{{ thread.answers.length }}</span> Answers
              </div>
            </div>
          </td>
          <td>
            <router-link :to="{path:'/thread/'+index, params:{index: index}}" v-on:click.native="dontShowThreadList">
              <a href="#" class="text-left"><h4>{{ thread.title }}</h4></a>
            </router-link>
            <span class="text-left">at {{ convertTime(thread.createdAt) }}</span>
            <span>by <b>{{ thread.starter.username }}</b></span>
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
  computed: {
    threads2: function() {
      return this.$store.getters.threads2;
    }
  },
  data () {
    return {

    }
  },
  methods: {
    dontShowThreadList: function() {
      this.$emit('dontShowThreadList');
    },
    convertTime: function(time) {
      let oriTime = new Date(time);
      let year = oriTime.getFullYear();
      let month = oriTime.getMonth() + 1;
      let date = oriTime.getDate();
      let hour = oriTime.getHours();
      let minute = oriTime.getMinutes();
      let second = oriTime.getSeconds();

      return `${year}-${month}-${date} ${hour}:${minute}:${second}`
    }
  }
}
</script>

<style scoped>

.center {
  font-size: 1em;
  vertical-align: middle;
  padding: 10px;
  border-radius: 25px;
  margin-right: 10px;
}

.badge {
  background-color: black;
}

</style>
