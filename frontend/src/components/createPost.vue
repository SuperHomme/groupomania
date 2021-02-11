<template>
    <div id="createPost">
        <div class="create-post">
            <h2>Poster un message</h2>
            <form action="" method="get">
                <div class="legend">
                    <input type="text" name="comment" id="comment" v-model="legendPending" placeholder="   Ajoutez une légende à votre GIF" required>
                        <label for="comment">
                        </label>
                </div>
                <input v-on:change="onFileChange()" class="file" type="file" id="file" name="file">
                    <label for="file">
                        <i v-if="legendPending != null && legendPending !== ''" class="fas fa-file-image"></i>
                    </label>
                <button v-on:click.prevent="sendPost()" v-if="imagePending != null && imagePending !== ''" type="submit">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
// const axios = require('axios');

export default {
    name: 'createPost',
    data: () => {
        return {
            legendPending: "",
            imagePending: "",
            showImageFileIcon: false,
            showPaperPlaneIcon: false,
        }
    },
    methods: {
        sendPost() { console.log(imagePending)
        //     axios
        //     .post('http://localhost:3000/api/posts')
        //         .then(reponse => this.posts = reponse.data)
        //         .catch((error) => console.log(error));
        },
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(files[0]);
        },
        createImage(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;
            reader.onload = (e) => {
                vm.image = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        removeImage: function (e) {
            this.image = '';
        }
    }
}
</script>

<style lang="sass" scoped>
.create-post
    margin-top: 6rem
    padding-top: 2rem
    padding-bottom: 1rem
    width: 500px
    max-height: 130px
    border-radius: 10px
    background-color: #ffffff
    box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.2)
    i
        margin-right: 2rem
        cursor: pointer
    .file
        display: none

form
    height: 30px
    display: flex
    flex-direction: row
    align-items: center
    padding-top: 1rem
    padding-bottom: 2rem
    .legend
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

button
    border: none
    background: none
    outline: none
    cursor: pointer

h2
    margin-left: 2rem
</style>