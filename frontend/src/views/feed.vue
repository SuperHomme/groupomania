<template>
  <div id='feed'>
    <headerNav />
    <div class="feed">
      <getAllPosts />
      <addPost />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import headerNav from '@/components/headerNav.vue'
import getAllPosts from '@/components/getAllPosts.vue'
import addPost from '@/components/addPost.vue'

export default {
  name: 'feed',
  title () {
    return `Groupomania — feed : ${this.nbPost} posts`
  },
  data () {
    return {
      nbPost: 52
    }
  },
  components: {
    headerNav, getAllPosts, addPost
  }
}
</script>

<style lang="sass" scoped>
.feed
    display: flex
    flex-direction: row
    justify-content: space-around
</style>
