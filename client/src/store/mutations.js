export default {
  fillThreads: function(state, threads) {
    console.log(threads);
    threads.forEach(function(thread) {
      state.threads2.push(thread);
    });

  }
}
