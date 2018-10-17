<template>
     <v-container>
       <div v-if="!secondplayer && !finished">
           <h2>Welcome to General Quiz</h2>
           <v-card-text>Test your knowledge on general studies</v-card-text>
           <v-card-text>Invite another player {{ url }}</v-card-text>
       </div>

       <div v-if="secondplayer">
         <notifications group="foo" :classes="notificationClass"/>
          <div class="wrapper">
            <div class="scores">
              <v-flex xs12>
                <div class="left">
                  <v-card color="green lighten-2">
                    <v-card-text class="black--text">User 1</v-card-text>
                    <v-card-text class="black--text">Total Score: {{playerdata.one.score}}</v-card-text>
                  </v-card>
                </div>
                <div class="right">
                   <v-card color="green lighten-2">
                    <v-card-text class="black--text">User 2</v-card-text>
                    <v-card-text class="black--text">Total Score: {{playerdata.two.score}}</v-card-text>
                  </v-card>
                </div>
              </v-flex>
            </div>

            <div class="qando">
                <v-layout row>
                  <v-flex xs12>
                    <v-card color="yellow">
                       <v-card-text class="brown--text headline">{{ question.question }}</v-card-text>
                    </v-card><br>
                    <div v-for="(item, index) in options" :key="index" @click="checkAnswer(item)">
                      <v-card color="light-blue">
                       <v-card-text class="black--text ">{{ item }}</v-card-text>
                    </v-card>
                    <br>
                    </div>
                  </v-flex>
                </v-layout>
            </div>
          </div>
       </div>

       <div v-if="finished">
         <h2>You have finished answering. Wait for the results</h2>
       </div>
     </v-container>
</template>


<script>
 import ChannelDetails from './ChannelDetails'
import axios from 'axios'
import { setInterval, clearInterval } from 'timers';

export default {
    name: 'home',
    data(){
      return {
        apiquestions: null,
        //this holds current presenceid
        presenceid: null,
        //checks if a question has been answerd
        hasAnswered: null,
        //holds the current question
        question: null,
        // hold the options
        options: null,
        // holds correct answer
        correctanswer: null,
        //countdown timer
        count: null,
        //no of players in the game
        players: 1,
        //checks for 2nd player and becomes true if ther is a second player
        secondplayer: false,
        notificationClass: null,
        //holds the playerdata for both players
        playerdata: {
          one: {
            id: null,
            score: 0,
            userid: null
          },
          two: {
            id: null,
            score: 0,
            userid: null
          }
        },
        //holds the userid of current player
        userid: null,
        //holds current url of the game
        url: null,
        questionsanswered: 0,
        finished: false
      }
    },
    created(){
       this.fetchData()
    },
    methods: {
      fetchData(){
        //sets the data instance presenceid variable to the result of the getUniqueId function
          this.presenceid = this.getUniqueId()
         //checks if thers np presense ID in the url and appends the the presenceid to the current url
          if(!this.checkPresenceId()){
              var separator = (window.location.href.indexOf('?') === -1) ? '?' : '&'
              window.location.href = window.location.href + separator + this.presenceid
          }

          // Sets the data instance url variable to the current URL.
            this.url = window.location.href


            fetch('https://opentdb.com/api.php?amount=10')
            .then(response => {
                return response.json()
            }).then(res => {
                   this.apiquestions = res.results
                   this.getNewQuestion()
            })

            // The channel variable is set to to the subscribeToPusher function in ChannelDetails.
            let channel = ChannelDetails.subscribeToPusher()

             // The pusher:member_added event is triggered when a user joins a channel. We increase the number of players by one and also set the secondplayer boolean to true.
            channel.bind('pusher:member_added', members => {
              this.players += 1
              this.secondplayer = true

              let self = this
              setTimeout(function(){
                self.$router.push({name: 'GameOver'})
              }, 60000)
            })

             // Once a subscription has been made to a presence channel, an event is triggered with a members iterator.
            channel.bind('pusher:subscription_succeeded', members => {
              // This checks if its just one player online and sets them up as player one and the required info for the game
              if (members.count === 1 && !this.playerdata.one.id) {
                this.playerdata.one.id = members.myID
                this.playerdata.one.userid = 1
                this.userid = 1

              // This checks if there's a player online already and sets the new player as player two.
              } else if (members.count === 2) {
                this.secondplayer = true
                this.playerdata.two.id = members.myID
                this.playerdata.two.userid = 2
                this.userid = 2

                let self = this
              setTimeout(function(){
                self.$router.push({name: 'GameOver'})
              }, 60000)
              }

             })

             // The pusher:member_removed is triggered when a user leaves a channel. We decrease the number of players by one and also set the secondplayer boolean to false.
            channel.bind('pusher:member_removed', member => {
              this.players -= 1
              if (member.count === 1) {
                this.secondplayer = false
              }
            })

             //listens and updates the scores in realtime
            channel.bind('client-send', (data) => {
              if (this.userid === 1) {
                this.playerdata.two.score = data.data.two.score
                this.$store.commit('updateplayertwoscore', data.data.two.score)
              } else if (this.userid === 2) {
                this.playerdata.one.score = data.data.one.score
                this.$store.commit('updateplayeronescore', data.data.one.score)
              }
            })
      },
      getUniqueId(){
          return 'id=' + Math.random().toString(36).substr(2, 8)
      },
      checkPresenceId(){
            let getQueryString = (field, url) => {
              let href = url ? url : window.location.href
              let reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i')
              let string = reg.exec(href)
              return string ? string[1] : null
            }
            let id = getQueryString('id')
            return id
      },
      checkAnswer(item){
        this.questionsanswered = this.questionsanswered + 1
          let channel = ChannelDetails.subscribeToPusher()

          this.hasAnswered = true
          if (item === this.correctanswer){
              if(this.userid === 1){
                  this.playerdata.one.score += 10
                  this.$store.commit('addplayeronescore')
              }else if (this.userid === 2){
                   this.playerdata.two.score += 10
                   this.$store.commit('addplayertwoscore')
              }
              this.notificationClass = 'vue-notification success'
               this.$notify({
                   group: 'foo',
                   title: 'Success',
                   text: 'Correct answer'
               })

          } else {
              if(this.userid === 1){
                 this.playerdata.one.score = Math.max(0, this.playerdata.one.score -= 10)
                 this.$store.commit('minusplayeronescore')
              }else if (this.userid === 2){
                 this.playerdata.two.score = Math.max(0, this.playerdata.two.score -= 10)
                 this.$store.commit('minusplayertwoscore')
              }

              this.notificationClass = 'vue-notification error'
               this.$notify({
                   group: 'foo',
                   title: 'Oops',
                   text: 'Wrong answer'
               })
          }

          channel.trigger('client-send', {data: this.playerdata})

          this.count = 3

          let countdown = setInterval(() => {
             this.count -= 1
             if (this.count === 0){
                clearInterval(countdown)
                this.getNewQuestion()
             }
          }, 1000)
      },
      getNewQuestion(){
       if(this.questionsanswered === 7){
          this.finished = true
          this.secondplayer = false
       }else {
         let question = this.apiquestions[Math.floor(Math.random() * this.apiquestions.length)]
          this.question = question

          //compiles the options and make sure no repititions
          let index = Math.floor(Math.random() * 4)
          if (this.question.incorrect_answers.includes(this.question.correct_answer)){
              this.options = this.question.incorrect_answers
          }else {
              this.question.incorrect_answers.splice(index, 0, this.question.correct_answer)
              this.options = this.question.incorrect_answers
          }

          this.correctanswer = this.question.correct_answer
          this.hasAnswered =false
          console.log(question)
       }
      }
    }
}
</script>

<style scoped>
   .wrapper {
        margin-top: 50px;
      }
      .scores {
        margin-top: 20px;
      }
      .scores .left{
        text-align: left;
      }
      .scores .right{
        text-align: right;
      }

      .qando {
        width: 600px;
        margin: 0 auto;
      }
</style>


