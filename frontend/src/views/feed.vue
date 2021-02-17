<template>
  <div id='feed'>
    <headerNav />
    <div class="feed">
      <getAllPost />
      <addPost />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import headerNav from '@/components/headerNav.vue'
import getAllPost from '@/components/getAllPost.vue'
import addPost from '@/components/addPost.vue'

export default {
  name: 'feed',
  components: {
    headerNav, getAllPost, addPost
  }
}
</script>

<style lang="sass" scoped>
.feed
    display: flex
    flex-direction: row
    justify-content: space-around
</style>
