<template>

<form action="" method="get" class="write-comment" >
    <div class="comment-zone">
        <label for="comment"></label>
        <input type="text" name="comment" placeholder="   Tapez ici votre commentaire" required>
    </div>
    <i class="fas fa-paper-plane"></i>
</form>

</template>

<script>
// eslint-disable-next-line no-unused-vars
const axios = require('axios');

export default {
    name: 'addComment',
    data: () => {
        return {  
        }
    },
    props: {
        showComment: {
            type: Boolean
        } 
    }
}
</script>

<style lang="sass" scoped>
.write-comment
    height: 30px
    display: flex
    flex-direction: row
    align-items: center
    padding-top: 1rem
    padding-bottom: 2rem

.comment-zone
    margin-left: 2rem
    margin-right: 1rem
    width: 100%
    input
        width: 100%
        border-radius: 10px
        border-style: solid
        border-color: #cdcdcd
        border-width: 0.1px

i
    margin-left: auto
    margin-right: 4rem
</style>