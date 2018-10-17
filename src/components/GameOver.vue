<template>
   <v-container>
     <v-flex xs6 style="margin: auto;">
       <v-card color="light-green">
        <v-card-text class="brown--text headline">GAME OVER</v-card-text>
        <v-card-text class="black--text">Player one : {{playeronescore}}%</v-card-text>
        <v-card-text class="black--text">Player two : {{playertwoscore}}%</v-card-text>
        <v-card-text class="black--text">{{ text }}</v-card-text>
     </v-card>
     </v-flex>
  </v-container>
</template>

<script>
export default {
   created(){
     if (this.playeronescore > this.playertwoscore){
         this.text = 'Player one wins'
     }else if (this.playertwoscore > this.playeronescore){
         this.text = 'Player two wins'
     }else {
         this.text = 'Draw'
     }
   },
   data(){
     return {
       text: ''
     }
   },
   computed: {
     playeronescore(){
       return Math.round(this.$store.getters.playeronescore / 70 * 100)
     },
     playertwoscore(){
       return Math.round(this.$store.getters.playertwoscore / 70 * 100)
     }
   }
}
</script>

