<template>
  <div id='userSettings'>
    <headerNav />
    <editProfile />
  </div>
</template>

<script>
import headerNav from '@/components/headerNav.vue'
import editProfile from '@/components/editProfile.vue'

export default {
  name: 'userSettings',
  title: 'Groupomania - paramètres',
  components: {
    headerNav, editProfile
  }
}
</script>

<style lang="sass" scoped>

</style>