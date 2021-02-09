<template>
  <div id='feed'>
    <headerNav />
    <div class="feed">
      <showPost />
      <createPost />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import headerNav from '@/components/headerNav.vue'
import showPost from '@/components/showPost.vue'
import createPost from '@/components/createPost.vue'

export default {
  name: 'feed',
  components: {
    headerNav, showPost, createPost
  }
}
</script>

<style lang="sass" scoped>
.feed
    display: flex
    flex-direction: row
    justify-content: space-around
</style>
