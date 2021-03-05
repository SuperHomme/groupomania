<template>
  <div id='user-settings'>

    <headerNav />

    <oneUser />

  </div>
</template>

<script>
import headerNav from '@/components/headerNav.vue'
import oneUser from '@/components/oneUser.vue'

export default {
  name: 'userSettings',
  title: 'Groupomania - paramètres',
  components: {
    headerNav, oneUser
  }
}
</script>

<style lang="sass" scoped>
#user-settings
  display: flex
  flex-direction: column
</style>