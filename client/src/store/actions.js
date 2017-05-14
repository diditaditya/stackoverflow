export default {
  fetchThreads: function(context) {
    let url = "http://localhost:3000/threads";
    axios.get(url)
      .then(function(response) {
        if(response.status === 200) {
          let threads = response.data;
          context.commit('fillThreads', threads)
        } else {
          console.log(response);
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  fetchUsers: function() {

  }
}
