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
      isValid: false
    }
  },
  methods: {
    validateInput (input, type) {
      switch (type) {
        case 'text':
          return /[^a-zA-Z]/.test(input)
          break

        case 'number':
          return /^\d+$/.test(input)
          break

        case 'mixed':
          break
      }
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

        this.isValid = this.validateInput(this.name, 'text')

        console.log(this.isValid)

        //Validate if user already exists:

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

          this.info.map(m => console.log('Ususarios', m))
        }

        //Verificación de entrada de name y surname (Solo texto):
      }
    },
    generatePassword () {
      Math.floor(Math.random())

      const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      const letters = ['u', 'v', 'w', 'x', 'y', 'z']
      const symbols = ['.', '-', '_', '!', '?', '/']

      const nameLength=this.name.length
      const surnameLength=this.surname.length
      const maxLength=10
      const generatedPassword=''

      console.log(nameLength,surnameLength)

      for(let i=0; i<=nameLength;i++){


      }
    }
  }
})

app.mount('#app')
