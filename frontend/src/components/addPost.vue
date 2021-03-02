<template>

<div class="add-post">

    <h2>Poster un message</h2>

    <form action="" method="get">
        
        <div class="legend">
            <div class="legend__nb-character" :class="characterLimitStyle">
                {{legendPending.length}} / {{characterLimit}}
            </div>

            <div class="legend__field">
                <input type="text" name="comment" id="comment" v-model="legendPending" placeholder="   Ajoutez une légende à votre GIF" :maxlength="characterLimit" required>
                <label for="comment">
                </label>
            </div>
        </div>

        <input v-on:change="onFileChange" class="file" type="file" id="file" name="file">
        <label for="file">
            <i v-show="legendPending.length>10" class="fas fa-file-image"></i>
        </label>

        <button v-on:click.prevent="createPost" @keyup.enter="createPost" v-if="imagePreview != null && imagePreview !== ''"  type="submit">
            <i class="fas fa-paper-plane"></i>
        </button>

    </form>

    <ul class="warning">
        <li v-if="errorSize !== ''">{{errorSize}}</li>
        <li v-if="errorType !== ''">{{errorType}}</li>
    </ul>

    <div v-if="imagePreview != null && imagePreview !== ''" class="preview__content">
        <img :src="imagePreview" />
        <div class="preview__legend">{{legendPending}}</div>
    </div>

</div>

</template>

<script>
const axios = require('axios');

export default {
    name: 'addPost',
    data: () => {
        return {
            errorSize: "",
            errorType: "",
            legendPending: "",
            imagePending: "", // imagePending sous forme de file
            imagePreview: "", // image decrite en base64
            characterLimit: 50, // à tester et à changer à ma guise
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
            this.checkImage(files[0]);  // on prend le premier elt de l'array files
        },
        checkImage(file) {
            this.imagePending = file;
            if (file.size >= 2000000 || file.type != "image/gif") {
                if (file.size >= 2000000) { // si la taille du fichier dépasse 2 million de bytes = 2 MB
                    const bytes = this.formatBytes(file.size);
                    this.errorSize = "ce fichier est trop lourd (limite 2Mo) car il pèse "  + bytes;
                }
                if (file.type != "image/gif") { // si le type du fichier n'est pas un GIF
                    this.errorType = "ce fichier n'est pas un GIF, c'est un "  + file.type.substr(file.type.search("/")+1);
                }
                console.log("là, y a un pb sur l'image");
                return;
            }
            this.createImage(file); // si l'image est conforme, on crée l'image
        },
        createImage(file) {
            // eslint-disable-next-line no-unused-vars
            let imagePreview = new Image(); // constructeur Image. cela devient une balise <img>
            let reader = new FileReader(); // constucteur FileReader
            let vm = this; // astuce pour éviter une confusion sur les références this
            // eslint-disable-next-line no-unused-vars
            reader.onload = (e) => {
                // eslint-disable-next-line no-unused-vars
                vm.imagePreview = e.target.result; // le résultat est envoyé dans imagePreview
            };
            reader.readAsDataURL(file); // la méthode readAsDataURL permet de lire le contenu de l’objet file. à la fin de l'opération de lecture, l’attribut result contient les données dans une URL représentant les données du fichier sous forme de chaîne encodée en base64.
        },
        // eslint-disable-next-line no-unused-vars
        removeImage: function (e) { // pour supprimer l'image, (pas d'arrow function, sinon pas de this)
            console.log("image preview supprimée");
            this.imagePending = ''; // on remet à zero les variables
            this.imagePreview = '';
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
        createPost() {
            const postData = new FormData(); // img & date sont créés en backend
            postData.append("legend", this.legendPending);
            postData.append("userId", JSON.parse(localStorage.getItem("vuex")).account.userId);
            postData.append("userpicture", "Hector_Castor.jpg");
            postData.append("username", "Hector Castor");
            postData.append("image", this.imagePending); // imagePending, c'est file, soit files[0], cad l'image sous forme pure de fichier. et multer attend un single.('image')
            console.log(this.imagePending);
            this.sendPost(postData);
        },
        sendPost(postData) {
            console.log("nouveau post sur le point d'être envoyé");
            axios
            .post('http://localhost:3000/api/posts', postData, { headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("vuex")).account.token }} )
                .then(  
                    res => this.reloadGetAllPosts(res), // on lance le refresh de getAllPosts
                    console.log("nouveau post envoyé"),
                    this.removeImage(), // on supprime la preview une fois l'image envoyée
                    this.legendPending = "",
                ) 
                .catch((error) => console.log(error));
        },
        reloadGetAllPosts(data) {
            this.$root.$emit('reloadGetAllPosts', data);
        }
    },
    computed: {
        characterLimitStyle: function () {
            return {
                orangeLimit: this.legendPending.length>(this.characterLimit-15),
                redLimit: this.legendPending.length>(this.characterLimit-5)  || this.legendPending.length<10
            }
        }
    },
    mounted () {
        const vuex = localStorage.getItem("vuex");
        console.log(JSON.parse(vuex).account.token);
    },
}
</script>

<style lang="sass" scoped>

.add-post
    margin-top: 6rem
    padding-top: 2rem
    padding-bottom: 2rem
    width: 500px
    height: 100%
    border-radius: 10px
    background-color: #ffffff
    box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.2)
    ul
        padding-left: 3rem
        padding-right: 2rem
        list-style: square
        background-color: pink

.preview
    &__content
        position: relative
        text-align: center
        img
            width: 500px
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
    align-items: flex-end
    margin-bottom: 1.5rem
    .file
        display: none
    i
        height: 16px
        width: 12px
        margin-left: auto
        margin-right: 2rem
        cursor: pointer

.legend
    margin-left: 2rem
    margin-right: 2rem
    width: 100%
    display: flex
    flex-direction: column
    align-items: flex-end
    &__field
        width: 100%
        input
            width: 100%
            border-radius: 10px
            border-style: solid
            border-color: #cdcdcd
            border-width: 0.1px
    &__nb-character
        height: 0.75rem
        font-size: 0.75rem
        font-color: grey
        padding-right: 0.5rem

.orangeLimit
    color: orange

.redLimit
    color: red

button
    border: none
    background: none
    outline: none
    cursor: pointer

h2
    margin-left: 2rem
</style>