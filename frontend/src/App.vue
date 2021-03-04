<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang="sass">
@import url("https://fonts.googleapis.com/css2?family=Ubuntu&display=swap");

*
  padding: 0
  margin: 0
  box-sizing: border-box
  font-family: "Ubuntu", sans-serif

body
  margin: 0 auto
  background: rgba(254, 254, 254, 0.8)
  padding-bottom: 4rem
  color: #333
  overflow-x: hidden

a, a:visited
  color: #333

//mixins
=mq-mobileS
  @media screen and (max-width: map-get($breakpoints, mobileS))
    @content

=mq-mobileM
  @media screen and (max-width: map-get($breakpoints, mobileM))
    @content

=mq-mobileL
  @media screen and (max-width: map-get($breakpoints, mobileL))
    @content

=mq-tablet
  @media screen and (max-width: map-get($breakpoints, mobiletablet))
    @content

=mq-special($mq-special: $initial-model)
  @media screen and (max-width: $mq-special)
    @content
</style>