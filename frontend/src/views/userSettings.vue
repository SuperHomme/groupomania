<template>
  <div id='user-settings'>

    <headerNav />

    <editUser 
      class="edit-profile"/>

  </div>
</template>

<script>
import headerNav from '@/components/headerNav.vue'
import editUser from '@/components/editUser.vue'

export default {
  name: 'userSettings',
  title: 'Groupomania - paramètres',
  components: {
    headerNav, editUser
  }
}
</script>

<style lang="sass" scoped>
#user-settings
  display: flex
  flex-direction: column
</style>