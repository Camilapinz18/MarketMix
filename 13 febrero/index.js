const app = Vue.createApp({
  data () {
    return {
      users: []
    }
  },
  methods: {
    localStorageVerification(){
        if (
            localStorage.getItem('users') === null ||
            localStorage.getItem('users') === undefined
          ) {
            localStorage.setItem('users', JSON.stringify(this.users))
          } else {
            localStorage.setItem('users', localStorage.getItem('users'))
            const toUpdateLocalUsers = JSON.parse(localStorage.getItem('users'))
            this.users = toUpdateLocalUsers
          }
    },
    async fetchData () {
      await fetch('https://randomuser.me/api/?results=5')
        .then(response => response.json())
        .then(data =>
          data.results.map(user => {
            console.log(user, 'user')
            this.users.push(user)
          })
        )
        localStorage.setItem('users', JSON.stringify(this.users))
    }
  },
  created () {
    this.localStorageVerification()
   
  }
})

app.mount('#app')
