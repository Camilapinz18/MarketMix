const app = Vue.createApp({
  data () {
    return {
      users: [],
      countries: [],
      countriesToUse: [],
      username: null,
      password: null,
      isLogin: false,
      isList: false
    }
  },
  methods: {
    login () {
      if (
        this.password === null ||
        this.password === undefined ||
        this.password === ''
      ) {
        alert('You must fill all the fields to continue')
      } else {
        console.log('username', this.username)
        const userToLogin = this.users.find(user => {
          return this.username === user.username
        })

        if (userToLogin) {
          if (userToLogin.password === this.password) {
            this.isLogin = false
            this.isList = true
            localStorage.setItem('userLogged', userToLogin.username)
          } else {
            alert('Wrong password')
          }
        } else {
          alert("The user doesn't exists")
        }
        console.log('UserToLogin', userToLogin)
      }
    },
    loggedUserVerification () {
      if (
        localStorage.getItem('userLogged') === null ||
        localStorage.getItem('userLogged') === undefined
      ) {
        this.isLogin = true
      } else {
        this.isLogin = false
        this.isList = true
      }
    },
    localStorageVerification () {
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
            this.users.push({
              photo: user.picture.thumbnail,
              name: user.name.first,
              age: user.dob.age,
              country:
                `https://countryflagsapi.com/png/${user.location.country}`,
              email: user.email,
              phone: user.cell,
              username: user.login.username,
              password: user.login.password
            })
          })
        )
      //this.getCountryFlag()
      localStorage.setItem('users', JSON.stringify(this.users))
    }
  },
  created () {
    this.isLogin = true
    this.localStorageVerification()
    this.loggedUserVerification()
    this.fetchData()
  }
})

app.mount('#app')
