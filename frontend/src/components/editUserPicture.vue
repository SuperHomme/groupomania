<template>

    <div class="user__picture">

        <img v-bind:src="imagePreview">
        
        <input v-on:change="onFileChange" class="file" type="file" id="file" name="file">

        <label for="file">
            <i class="fas fa-plus-square"></i>
        </label>

        <ul class="warning">
            <li v-if="errorSize !== ''">{{errorSize}}</li>
            <li v-if="errorType !== ''">{{errorType}}</li>
        </ul>

    </div>

</template>

<script>
// eslint-disable-next-line no-unused-vars
const axios = require('axios');

export default {
    name: 'editUserPicture',
    data: () => {
        return {
            errorSize: '',
            errorType: '',
            imagePending: '', // imagePending sous forme de file
            imagePreview: '', // image decrite en base64
            loginUserId: JSON.parse(localStorage.getItem("vuex")).account.userId,
            loginToken: JSON.parse(localStorage.getItem("vuex")).account.token,
        }
    },
    props: {
        user: {
            type: Object,
            required: true,
        }
    },
    methods: {
        // eslint-disable-next-line no-unused-vars
        onFileChange(e) {
            this.removeImage(); // on enlève d'abords l'image éventuellement déjà présente (quant on veut changer d'image)
            // eslint-disable-next-line no-unused-vars
            let files = e.target.files || e.dataTransfer.files; // disons que files est égal à ces deux façons de récupérer la donnée, sélection et drag&drop
            if (!files.length) // si cette donnée n'existe pas, 
                return; // on arrête la fonction ici
            this.checkImage(files[0]);  // on prend le premier elt de l'array files
        },
        checkImage(file) {
            this.imagePending = file;
            if (file.size >= 2000000 || !this.isImage(file.type)) {
                if (file.size >= 2000000) { // si la taille du fichier dépasse 2 million de bytes = 2 MB
                    const bytes = this.formatBytes(file.size);
                    this.errorSize = "ce fichier est trop lourd (limite 2Mo) car il pèse "  + bytes;
                }
                if (!this.isImage(file.type)) { // si le type du fichier n'est pas une image
                    this.errorType = "ce fichier n'est pas une image, c'est un "  + file.type.substr(file.type.search("/")+1);
                }
                console.log("il y a un pb sur l'image");
                return;
            }
            this.createImage(file); // si l'image est conforme, on crée l'image
            this.createUpdatedUserPicture();
        },
        isImage(fileType) {
            var ext = fileType.substr(fileType.search("/")+1);
            switch (ext.toLowerCase()) {
                case 'jpg':
                case 'gif':
                case 'bmp':
                case 'png':
                case 'jpeg' :
                return true }
            return false;
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
            this.errorSize = '';
            this.errorType = '';
        },
        formatBytes(bytes, decimals = 2) {
            if (bytes === 0) return '0 Bytes';
                const k = 1000; // should be 1024, but whatever
                const dm = decimals < 0 ? 0 : decimals;
                const sizes = ['octets', 'ko', 'Mo', 'Go', 'To', 'Po', 'Eo', 'Zo', 'Yo']; // Bytes in french is octets
                const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        },
        createUpdatedUserPicture() {
            const updatedUserPicture = new FormData(); // img & date sont créés en backend
            updatedUserPicture.append("image", this.imagePending); // imagePending, c'est file, soit files[0], cad l'image sous forme pure de fichier. et multer attend un single.('image')
            // console.log(this.imagePending);
            this.sendUpdatedUserPicture(updatedUserPicture);
        },
        sendUpdatedUserPicture(updatedUserPicture) {
            axios
                .put('http://localhost:3000/api/users/' + this.loginUserId + '/picture', updatedUserPicture, { headers: { Authorization: "Bearer " + this.loginToken }} )
                    .then(console.log("user picture modifiée !"))
                    .catch((error) => console.log(error));
        },
        setUserPicture() {
            this.imagePreview = this.user.userpicture
        }
    },
    computed: {
    },
    beforeMount() {
        this.setUserPicture()
    },
    updated() {
    }
}
</script>

<style lang="sass" scoped>
.user
    &__picture
        margin: 1rem
        height: 250px
        position: relative
        img
            width: 250px
            border-radius: 50%
        .file
            display: none
            position: absolute
            right: 0
            bottom: 0
            margin: 0.5rem
        i
            font-size: 24px
            color: rgb(51, 204, 255)
            cursor: pointer
        ul
            padding-left: 3rem
            padding-right: 2rem
            list-style: square
            background-color: pink
</style>