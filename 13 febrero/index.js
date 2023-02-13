const app = Vue.createApp({
  data () {
    return {
      users: []
    }
  },
  methods: {
    fetchData () {
      fetch('https://randomuser.me/api/?results=5')
        .then(response => response.json())
        .then(data =>
          data.results.map(user => {
            console.log(user, 'user')
            this.users.push(user)
          })
        )

        console.log("s",this.users)
    }
  }
})

app.mount('#app')
