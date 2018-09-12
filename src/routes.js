import Home from './components/Home.vue'
import SingleListing from './components/SingleListing.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/singlelisting/:category',
    name: 'singlelisting',
    component: SingleListing
  }
]


export default routes
