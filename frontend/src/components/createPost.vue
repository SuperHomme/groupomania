<template>
    <div id="createPost">
        <div class="create-post post">
            <h2>Poster un message</h2>
            <form action="" method="get" class="post__comment-area">
                <div class="comment-area">
                <label for="comment"></label>
                <input type="text" name="comment" id="comment" required>
                </div>
                <i class="fas fa-file-image"></i>
                <i class="fas fa-paper-plane"></i>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'createPost'
}
</script>

<style lang="sass">
.create-post
    margin-top: 6rem
    padding-top: 2rem
    padding-bottom: 1rem
    width: 500px
    height: auto
    i
        margin-right: 2rem

h2
    margin-left: 2rem
</style>