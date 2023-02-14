const app = Vue.createApp({
  data () {
    return {
      pages: null,
      selectedPage: null,
      charactersList: []
    }
  },
  methods: {
    async fetchData (page) {
      console.log('selected', this.selectedPage)
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?page=${this.selectedPage}`
        )
        const characters = await response.json()
        this.charactersList=characters.results
        this.pages = characters.info.pages
      } catch (error) {
        console.log(error)
      }
    },
    addToCart(char){
      console.log(char)
      alert(char.name+char.id)
    }
  },

  created () {}
})

app.mount('#app')
