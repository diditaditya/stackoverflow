<template>
  <div class="container" style="padding-top: 50px">
    <table class="table">
      <tbody>
        <tr v-for="(thread, index) in threads">
          <td>
            <button class="btn btn-default center">
              <span class="badge">{{ thread.voteCount }}</span> Votes
            </button>
            <button class="btn btn-default center">
              <span class="badge">{{ thread.answers }}</span> Answers
            </button>
          </td>
          <td>
            <a href="#" class="text-left"><h4>{{ thread.title }}</h4></a>
            <p>{{ thread.starter.username }}</p>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ThreadList',
  props: ['threads', 'message'],
  data () {
    return {}
    }
}
</script>

<style scoped>

.center {
  vertical-align: middle;
}

</style>
