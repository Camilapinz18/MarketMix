const app = Vue.createApp({
  data () {
    return {
      users: [],

      countries: [],
      countriesToUse: [],
      username: null,
      password: null,
      isLogin: false,
      isList: false,
      genderSelected: 'all',
      usersToShow: [],
      quantity: null
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
      location.reload()
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
      if (this.users.length <= 15 && this.users.length > 1) {
        console.log('Ya hay usuarios')
      } else if (this.users.length < 1) {
        await fetch('https://randomuser.me/api/?results=15')
          .then(response => response.json())
          .then(data =>
            data.results.map(user => {
              this.users.push({
                photo: user.picture.thumbnail,
                name: `${user.name.first + ' ' + user.name.last}`,
                age: user.dob.age,
                country: `https://countryflagsapi.com/png/${user.location.country}`,
                email: user.email,
                phone: user.cell,
                username: user.login.username,
                password: user.login.password,
                gender: user.gender
              })
            })
          )
        //this.getCountryFlag()
        localStorage.setItem('users', JSON.stringify(this.users))

        console.log('length', this.users.length)
      }
    },
    deleteUser (userToDelete) {
      console.log('delete', userToDelete.name)
      //Delete in this.users
      this.users = this.users.filter(user => {
        return user.name !== userToDelete.name
      })

      this.filterByGender()

      localStorage.setItem('users', JSON.stringify(this.users))
    },
    filterByGender () {
      console.log('selected', this.genderSelected)
      this.quantity = this.users.length
      console.log("QQQQ",this.quantity)
      this.usersToShow = this.users.filter(user => {
        if (this.genderSelected === 'all') {
          return user
        } else if (this.genderSelected === 'female') {
          return user.gender === 'female'
        } else if (this.genderSelected === 'male') {
          return user.gender === 'male'
        }
      })

      console.log('usersToShow', this.usersToShow)
      this.usersToShow = this.usersToShow
      localStorage.setItem('users', JSON.stringify(this.users))
    }
  },

  created () {
    this.isLogin = true
    this.localStorageVerification()
    this.loggedUserVerification()
    this.fetchData()
    this.filterByGender()
  }
})

app.mount('#app')
