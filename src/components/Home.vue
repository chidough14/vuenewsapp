<template>
    <div>
      <h2>Latest Headline News</h2>
      <router-link :to="{name: 'singlelisting', params: {category: 'business'}}"><v-btn color="green">Show Business news</v-btn></router-link>
      <router-link :to="{name: 'singlelisting', params: {category: 'health'}}"><v-btn color="red">Show Health news</v-btn></router-link>
      <router-link :to="{name: 'singlelisting', params: {category: 'science'}}"><v-btn color="blue">Show Science news</v-btn></router-link>
      <router-link :to="{name: 'singlelisting', params: {category: 'sports'}}"><v-btn color="yellow">Show sports news</v-btn></router-link>
      <router-link :to="{name: 'singlelisting', params: {category: 'technology'}}"><v-btn color="pink">Show Technology news</v-btn></router-link>
      <router-link :to="{name: 'singlelisting', params: {category: 'entertainment'}}"><v-btn color="orange">Show Entertainment news</v-btn></router-link>
    </div>
</template>


<script>
export default {

}
</script>
