const app = Vue.createApp({
  data () {
    return {
      info: [],
      name: '',
      surname: '',
      username: '',
      birthDate: '',
      emptyFields: false,
      userExists: false,
      isSaved: false,
      isValid: false,
      isError: false,
      errorMessage: ''
    }
  },
  methods: {
    validateInputFormat (input, type) {
      switch (type) {
        case 'text':
          return !/[^a-zA-Z]/.test(input)
          break
        case 'mixed':
          return /^[a-z][0-9]$/.test(input)
          break

        default:
          console.log('Invalid input')
      }
    },

    validateInputs () {
      let validation = []

      validation.push(this.validateInputFormat(this.name, 'text'))
      validation.push(this.validateInputFormat(this.surname, 'text'))
      validation.push(this.validateInputFormat(this.username, 'mixed'))

      validation.map(v => console.log('validaiton', v))
      this.isValid = validation.find(value => value === false)
      this.isValid === undefined
        ? (this.isValid = true)
        : (this.isValid = false)

      console.log('isvaliod', this.isValid)

      return this.isValid
    },
    createNewUser () {
      console.log(
        'add new user',
        this.name,
        this.surname,
        this.username,
        this.birthDate
      )

      //Validate empty fields:
      if (
        this.name === '' ||
        this.surname === '' ||
        this.username === ''
        // this.birthDate === ''
      ) {
        console.log('birthdate', this.birthDate)
        this.emptyFields = true
        setTimeout(() => {
          this.emptyFields = false
        }, 2000)
      } else {
        this.emptyFields = false
        //Validate input:

        //Validate if user already exists:
        const inputValidation = this.validateInputs()

        if (inputValidation) {
          usernameExists = this.info.find(
            user => user.username === this.username.toLowerCase()
          )
          if (usernameExists) {
            this.userExists = true
            console.log('ya existe', usernameExists)

            this.username = ''
          } else {
            this.userExists = false
            this.isSaved = true
            this.info.push({
              name: this.name,
              surname: this.surname,
              fullName: this.name + ' ' + this.surname,
              username: this.username.toLowerCase(),
              birthDate: this.birthDate,
              age: '',
              password: this.generatePassword()
            })
            this.isSaved = true
            setTimeout(() => {
              this.isSaved = false
            }, 1500)

            this.name = ''
            this.surname = ''
            this.username = ''
            this.birthDate = ''

            //this.info.map(m => console.log('Ususarios', m))
          }
        } else {
          this.isError = true
          this.message =
            'Invalid fields. Please check your name, surname and username'
          setTimeout(() => {
            this.isError = false
          }, 1500)
        }

        //Verificación de entrada de name y surname (Solo texto):
      }
    },
    generatePassword () {
      Math.floor(Math.random())

      const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      const letters = ['u', 'v', 'w', 'x', 'y', 'z']
      const symbols = ['.', '-', '_', '!', '?', '/']

      const nameLength = this.name.length
      const surnameLength = this.surname.length
      const maxLength = 10
      const generatedPassword = ''

      console.log(nameLength, surnameLength)

      for (let i = 0; i <= nameLength; i++) {}
    }
  }
})

app.mount('#app')
