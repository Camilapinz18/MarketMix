const app = Vue.createApp({
  data () {
    return {
      info: [],
      actualDate: new Date(),
      name: '',
      surname: '',
      username: '',
      birthDate: '',
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
          return /^[a-zA-ZÁÉÍÓÚáéíóúÑñ ]+$/.test(input)
          break
        case 'mixed':
          return /^[a-zA-ZÁÉÍÓÚáéíóúÑñ0-9]+$/.test(input)
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

      this.isValid = validation.find(value => value === false)
      this.isValid === undefined
        ? (this.isValid = true)
        : (this.isValid = false)

      return this.isValid
    },
    createNewUser () {
      //console.log(this.name, this.surname, this.username, this.birthDate)
      //console.log('birthdatzzzze', typeof Date(this.birthDate))

      //Validate empty fields:
      if (
        this.name === '' ||
        this.surname === '' ||
        this.username === '' ||
        this.birthDate === ''
      ) {
        this.isError = true
        this.errorMessage = ' You must fill all the fields to continue'
        setTimeout(() => {
          this.isError = false
        }, 2000)
      } else {
        //Validate input format:
        const inputValidation = this.validateInputs()

        if (inputValidation) {
          usernameExists = this.info.find(
            user => user.username === this.username.toLowerCase()
          )
          if (usernameExists) {
            this.isError = true
            this.errorMessage =
              ' The username is already registered. Try another'
              setTimeout(() => {
                this.isError = false
              }, 1500)
          } else {
            let ageCalculated = this.determineAge()
            if (ageCalculated) {
              this.info.push({
                name: this.name,
                surname: this.surname,
                fullName: this.name + ' ' + this.surname,
                username: this.username.toLowerCase(),
                birthDate: this.assignBirthDate(),
                age: ageCalculated,
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

              this.info.map(users => console.log('Registeded Users:', users))
            } else {
              this.isError = true
              this.errorMessage =
                'Invalid birth date. You must be above 18 to sign up'
              setTimeout(() => {
                this.isError = false
              }, 1500)
            }
          }
        } else {
          this.isError = true
          this.errorMessage =
            'Invalid fields. Please check your name, surname or username'
          setTimeout(() => {
            this.isError = false
          }, 1500)
        }
      }
    },
    generatePassword () {
      const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      const letters = ['b', 'v', 'w', 'x', 'y', 'z', 'k', 'n', 'd', 't']
      const arrays = [0, 0, 0, 0, 1, 1, 1, 1]
      const maxLength = 9
      const generatedPassword = []
      let randNumbers = []

      for (let j = 0; j < maxLength; j++) {
        randNumbers.push(Math.floor(Math.random() * 10))
      }

      arrays.sort(function () {
        return Math.random() - 0.5
      })

      for (let i = 0; i < maxLength; i++) {
        if (arrays[i] === 0) {
          generatedPassword.push(numbers[randNumbers[i]])
        }
        if (arrays[i] === 1) {
          generatedPassword.push(letters[randNumbers[i]])
        }
      }

      return generatedPassword.join('')
    },
    assignBirthDate () {
      const dob = new Date(this.birthDate)

      const selectedYear = parseInt(dob.getFullYear())
      const selectedMonth = parseInt(dob.getMonth())
      const selectedDay = parseInt(dob.getDate()) + 1
      const dobCorrected = new Date(selectedYear, selectedMonth, selectedDay)
      return dobCorrected
    },

    determineAge () {
      const actualYear = parseInt(this.actualDate.getFullYear())
      const actualMonth = parseInt(this.actualDate.getMonth()) 
      const actualDay = parseInt(this.actualDate.getDate())

      const selectedDate=this.assignBirthDate()
      const selectedYear = parseInt(selectedDate.getFullYear())
      const selectedMonth = parseInt(selectedDate.getMonth())
      const selectedDay = parseInt(selectedDate.getDate())

      //resta de años:
      const yearsDiff = actualYear - selectedYear
      //resta de meses:
      const monthDiff = actualMonth - selectedMonth
      //resta de dias:
      const daysDiff = actualDay - selectedDay

      let age = 0
      if (monthDiff < 0||daysDiff<0) {
        age = yearsDiff - 1
      } else {
        age = yearsDiff
      }

      if (age < 18) {
        this.isError = true
        this.messageError =
          'Invalid birth date. You must be above 18 to sign up'
        setTimeout(() => {
          this.isError = false
        }, 1500)
        return false
      } else {
        return age
      }
    }
  }
})

app.mount('#app')
