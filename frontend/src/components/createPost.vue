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
                <input v-on:change="onFileChange" class="file" type="file" id="file" name="file">
                    <label for="file">
                        <i v-if="legendPending != null && legendPending !== ''" class="fas fa-file-image"></i>
                    </label>
                <button v-on:click.prevent="sendPost" v-if="imagePending != null && imagePending !== ''" type="submit">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </form>
            <ul class="warning">
                <li v-if="errorSize !== ''">{{errorSize}}</li>
                <li v-if="errorType !== ''">{{errorType}}</li>
            </ul>
            <div v-if="imagePending != null && imagePending !== ''" class="create-post__content">
                <img :src="imagePending" />
                <div class="create-post__legend">{{legendPending}}</div>
            </div>
        </div>
    </div>
</template>

<script>
const axios = require('axios');

export default {
    name: 'createPost',
    data: () => {
        return {
            errorSize: "",
            errorType: "",
            legendPending: "",
            imagePending: "",
        }
    },
    methods: {
        // eslint-disable-next-line no-unused-vars
        onFileChange(e) {
            this.removeImage(); // on enlève d'abords l'image éventuellement déjà présente (quant on veut changer d'image)
            // eslint-disable-next-line no-unused-vars
            let files = e.target.files || e.dataTransfer.files; // disons que files est égal à ces deux façons de récupérer la donnée, sélection et drag&drop
            if (!files.length) // si cette donnée n'existe pas, 
                return; // on arrête la fonction là
            console.log(files);
            this.checkImage(files[0]);  // on prend le premier elt de l'array files
        },
        checkImage(file) {
            if (file.size >= 1000000 || file.type != "image/gif") {
                if (file.size >= 1000000) { // si la taille du fichier dépasse 1 million de bytes = 1 MB
                    const bytes = this.formatBytes(file.size);
                    this.errorSize = "ce fichier est trop lourd (limite 1Mo) car il pèse "  + bytes;
                }
                if (file.type != "image/gif") { // si le type du fichier n'est pas un GIF
                    this.errorType = "ce fichier n'est pas un GIF, c'est un "  + file.type.substr(file.type.search("/")+1);
                }
                console.log("là, y a un pb sur l'image");
                return;
            }
            console.log("tout de bon !  GIF choisi : nickel");
            this.createImage(file); // si l'image est conforme, on crée l'image
        },
        createImage(file) {
            // eslint-disable-next-line no-unused-vars
            let imagePending = new Image();
            let reader = new FileReader();
            let vm = this; // astuce pour éviter une confusion sur les références this
            // eslint-disable-next-line no-unused-vars
            reader.onload = (e) => {
                // eslint-disable-next-line no-unused-vars
                vm.imagePending = e.target.result; // le résultat 
            };
            reader.readAsDataURL(file); // la méthode readAsDataURL permet de lire le contenu de l’objet file. à la fin de l'opération de lecture, l’attribut result contient les données dans une URL représentant les données du fichier sous forme de chaîne encodée en base64.
        },
        // eslint-disable-next-line no-unused-vars
        removeImage: function (e) { // pour supprimer l'image, (pas d'arrow function, sinon pas de this)
            this.imagePending = ''; // on remet à zero la variable imagePending
            this.errorSize = "";
            this.errorType = "";
        },
        formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1000; // should be 1024, but whatever
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['octets', 'ko', 'Mo', 'Go', 'To', 'Po', 'Eo', 'Zo', 'Yo']; // Bytes in french is octets
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        },
        sendPost() {
            axios
            .post('http://localhost:3000/api/posts')
                .then(reponse => this.posts = reponse.data)
                .catch((error) => console.log(error));
        },
    }
}
</script>

<style lang="sass" scoped>
.create-post
    margin-top: 6rem
    padding-top: 2rem
    padding-bottom: 2rem
    width: 500px
    max-height: auto
    border-radius: 10px
    background-color: #ffffff
    box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.2)
    i
        margin-right: 2rem
        cursor: pointer
    .file
        display: none
    img
        width: 500px
    ul
        padding-left: 3rem
        padding-right: 2rem
        list-style: square
    &__content
        position: relative
        text-align: center
    &__legend
        position: absolute
        background-color: white
        bottom: 16px
        left: 16px

.warning
    color: red

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