<template>
  <div id='user-settings'>

    <headerNav />

    <editProfile 
      class="edit-profile"/>

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
#user-settings
  display: flex
  flex-direction: column
</style>