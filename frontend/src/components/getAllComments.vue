<template>

<div class="comment" :id="comment._id">

    <div class="user-picture comment__user-picture">
        <img v-bind:src="comment.userpicture">
    </div>
    
    <div class="comment__body">
        <div class="comment__infos">
            <div class="user-name comment__user-name">{{ comment.username }}</div>
            <div class="date comment__date">{{ comment.date }}</div>
        </div>
        <div class="comment__content">{{ comment.content }}</div>
    </div>

</div>

</template>

<script>
// eslint-disable-next-line no-unused-vars
const axios = require('axios');

export default {
    name: 'getAllComments',
    props: {
        comment: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style lang="sass" scoped>
.comment
    display: flex
    flex-direction: row
    padding-top: 1rem
    &__body
        width: 100%
    &__infos
        display: flex
        flex-direction: row
    &__image
        margin-left: 1rem
        margin-right: 1rem
    &__content
        margin-left: 1rem
        margin-right: 1rem
</style>