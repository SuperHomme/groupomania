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