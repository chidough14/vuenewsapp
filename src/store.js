export default {
  state: {
    playerone: {
      score: 0
    },
    playertwo: {
      score: 0
    }
  },
  getters: {
    playeronescore(state){
        return state.playerone.score
    },
    playertwoscore(state){
      return state.playertwo.score
  }
  },
  mutations: {
    addplayeronescore(state){
       state.playerone.score += 10
    },
    addplayertwoscore(state){
      state.playertwo.score += 10
   },
   minusplayeronescore(state){
    state.playerone.score = Math.max(0, state.playerone.score -= 10)
   },
   minusplayertwoscore(state){
    state.playertwo.score = Math.max(0, state.playertwo.score -= 10)
   },
   updateplayertwoscore(state, payload){
     state.playertwo.score = payload
   },
   updateplayeronescore(state, payload){
    state.playerone.score = payload
  }
  }
}
