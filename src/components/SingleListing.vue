<template>
   <v-container grid-list-md text-xs-center>
    <div>
      <h2>Listing for {{ category }}</h2>
      <v-tabs
        v-model="active"
        color="cyan"
        dark
        slider-color="yellow"
      >
        <v-tab
          v-for="article in articles"
          :key="article.id"
          ripple
        >
          Article

        </v-tab>
        <v-tab-item
          v-for="article in articles"
          :key="article.id"
        >
          <v-card flat>
            <img :src="article.urlToImage" width="100" height="100">
            <p>Author : {{ article.author}}</p>
            <p>Description : {{ article.description}}</p>
            <p>Title : {{ article.title}}</p>
            <p>Url : {{ article.url}}</p>
            <object width="600" height="250" :data="article.url"></object>
          </v-card>
        </v-tab-item>
      </v-tabs>

      <div class="text-xs-center mt-3">
        <v-btn @click="next">next tab</v-btn>
      </div>
  </div>
   </v-container>
</template>


<script>
import axios from 'axios'
  export default {
    created(){
       this.category = this.$route.params.category

       axios.get('https://newsapi.org/v2/top-headlines?country=ng&category='+this.category+'&pageSize=8&apiKey=64d2f65d48534ed581ed0e26d26d69f6')
       .then(response => {
           console.log(response)
           this.articles = response.data.articles
       })
    },
    data () {
      return {
        active: null,
        category: '',
        articles: [],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    },
    methods: {
      next () {
        const active = parseInt(this.active)
        this.active = (active < 7 ? active + 1 : 0)
      }
    }
  }
</script>
