<template>
  <div class="container">
    <div class="col-md-3"></div>
    <div class="col-md-6">
      <form class="form-group text-left">
        <label for="title">Title</label>
        <input id="title" class="form-control" type="text" placeholder="Title">
        <label for="question" style="margin-top: 10px">Question</label>
        <textarea id="question" rows="10" class="form-control" placeholder="Your question here"></textarea>
        <label for="tags" style="margin-top: 10px">Tags</label>
        <input id="tags" class="form-control" type="text" placeholder="Tags, separated by spaces, max. 5 tags">
        <input type="submit" class="btn btn-primary" value="Post Your Question" style="margin-top: 20px">
      </form>
    </div>
    <div class="col-md-3"></div>
  </div>

</template>

<script>
export default {
  name: 'postQuestion',
  props: ['isloggedin', 'user'],
  data: function() {
    return {
      starter: '',
      title: '',
      question: '',
      tags: []
    }
  },
  methods: {
    dontShowThread: function() {
      this.$emit('dontShowThread');
    }
  },
  mounted: function() {
    this.dontShowThread();
    this.starter = this.user.id;
  }
}
</script>
