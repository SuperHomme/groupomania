<template>
  <div id='feed'>

    <headerNav />

    <div class="feed">

      <getAllPosts
        v-on:update:nb-posts="setNbPosts"/>

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
    return `Groupomania — feed`
  },
  render (h) {
    return h('h3', null, this.page)
  },
  data () {
    return {
      nbPost: "defaut",
    }
  },
  // metaInfo() {
  //   // eslint-disable-next-line no-unused-vars
  //   const nbPost = this.nbPost;
  //   return {
  //     title: `Groupomania — feed : ${this.nbPost} posts`,
  //   };
  // },
  components: {
    headerNav, getAllPosts, addPost
  },
  methods: {
    setNbPosts(nbPost) {
      this.nbPost = nbPost;
      console.log("nb posts dans le feed : " + this.nbPost)
    }
  },
  beforeMount() {
    this.$root.$on('reloadNbPosts', nbPost => this.setNbPosts(nbPost) );
  }
}
</script>

<style lang="sass" scoped>
.feed
  display: flex
  flex-direction: row
  justify-content: space-around
  margin: auto
  width: 1150px
</style>
