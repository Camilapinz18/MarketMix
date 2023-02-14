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
            location.reload()
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
    async getFlag () {
      console.log('countryNameFlag', this.users[0].country)
      this.users.map(async user => {
        await fetch(user.country)
          .then(response => response.json())
          .then(data => {
            user.country = data[0].flags.png
          })
          .then(() => {
            localStorage.setItem('users', JSON.stringify(this.users))
          })
      })
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

                country: `https://restcountries.com/v3.1/name/${user.location.country}?fields=flags`,

                email: user.email,
                phone: user.cell,
                username: user.login.username,
                password: user.login.password,
                gender: user.gender
              })
            })
          )

        this.getFlag()
        console.log('length', this.users.length)
      }
    },
    deleteUser (userToDelete) {
      console.log('delete', userToDelete.name)
      //Delete in this.users
      if (confirm('Do you want to delete the user?')) {
        console.log('deleted')
        this.users = this.users.filter(user => {
          return user.name !== userToDelete.name
        })

        this.filterByGender()

        localStorage.setItem('users', JSON.stringify(this.users))
      } else {
        console.log('not deleted')
      }
    },
    filterByGender () {
      console.log('selected', this.genderSelected)
      this.quantity = this.users.length
      console.log('QQQQ', this.quantity)

      const logged = localStorage.getItem('userLogged')
      console.log('LLOGEDD', logged)

      this.usersToShow = this.users.filter(user => {
        if (this.genderSelected === 'all') {
          return user.username !== logged
        } else if (this.genderSelected === 'female') {
          if (user.username !== logged) {
            return user.gender === 'female'
          }
        } else if (this.genderSelected === 'male') {
          if (user.username !== logged) {
            return user.gender === 'male'
          }
        }
      })

      console.log('usersToShow', this.usersToShow)
      this.usersToShow = this.usersToShow
      localStorage.setItem('users', JSON.stringify(this.users))
    },
    logout () {
      this.isList=false
      this.isLogin=true
      localStorage.removeItem('userLogged')
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
