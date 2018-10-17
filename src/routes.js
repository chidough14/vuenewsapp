
import Home from './components/Home.vue'
import GameOver from './components/GameOver.vue'

const routes = [
   {
     path: '/',
     name: 'home',
     component: Home
   },
   {
    path: 'gameover',
    name: 'GameOver',
    component: GameOver
  }
]


export default routes
