<template>
<div class="user">

    <form action="" method="get">

        <div class="user__picture">

            <img v-bind:src="imagePreview">
            
            <input v-on:change="onFileChange" class="file" type="file" id="file" name="file">
            <label for="file">
                <i class="fas fa-plus-square"></i>
            </label>

        </div>

        <h2>{{actualUsername}}</h2>

        <div class="user__infos">

            <input type="text" :id="user._id" v-model="actualUsername" placeholder="Votre prénom et nom" maxlength="26">
            <label for="username">
            </label>

            <input type="text" :id="user._id" v-model="actualEmail" placeholder="Votre adresse électronique" minlength="5" maxlength="50">
            <label for="email">
            </label>

        </div>

        <button v-on:click.prevent="createUpdatedUserInfos">
            Enregistrer les changements
        </button>

        <button
            @click.prevent="wantChangePassword = true"
            v-if="!wantChangePassword">
            Changer le mot de passe
        </button>

        <button
            v-if="wantChangePassword"
            v-on:click.prevent="createUpdatedPassword">
            Confirmez le nouveau mot de passe
        </button>

        <div
            class="user__password"
            v-if="wantChangePassword">

            <input type="text" id="password1" v-model="password1" placeholder="mot de passe actuel" minlength="8" maxlength="26">
            <label for="password1">
            </label>

            <input type="text" id="password2" v-model="password2" placeholder="votre nouveau mot de passe" minlength="8" maxlength="26">
            <label for="password2">
            </label>

            <input type="text" id="password3" v-model="password3" placeholder="confirmez votre nouveau mot de passe" minlength="8" maxlength="26">
            <label for="password3">
            </label>

        </div>

        <button
            class="button--red"
            v-on:click.prevent="deleteUser">
            Supprimez votre compte
        </button>

    </form>

</div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
const axios = require('axios');

export default {
    name: 'editProfile',
    data: () => {
        return {
            user: {},
            actualUsername: '',
            actualEmail: '',
            errorSize: "",
            errorType: "",
            legendPending: "",
            imagePending: "", // imagePending sous forme de file
            imagePreview: "", // image decrite en base64
            wantChangePassword: false,
            loginUserId: JSON.parse(localStorage.getItem("vuex")).account.userId,
            loginToken: JSON.parse(localStorage.getItem("vuex")).account.token,
        }
    },
    methods: {
        getOneUser() {
            axios
                .get('http://localhost:3000/api/users/' + this.loginUserId, { headers: { Authorization: "Bearer " + this.loginToken }} )
                    .then(user => {
                        this.user = user.data,
                        this.actualUsername = this.user.username,
                        this.actualEmail = this.user.email,
                        this.imagePreview= this.user.userpicture })
                    .catch((error) => console.log(error));
        },
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
        createUpdatedUserPicture() {
            const updatedUserPicture = new FormData(); // img & date sont créés en backend
            updatedUserPicture.append("image", this.imagePending); // imagePending, c'est file, soit files[0], cad l'image sous forme pure de fichier. et multer attend un single.('image')
            // console.log(this.imagePending);
            this.sendUpdatedUserPicture(updatedUserPicture);
        },
        sendUpdatedUserPciture(updatedUserPicture) {
            axios
                .put('http://localhost:3000/api/users/' + this.loginUserId + '/picture', updatedUserPicture, { headers: { Authorization: "Bearer " + this.loginToken }} )
                    .then(console.log("user infos modifiées !"))
                    .catch((error) => console.log(error));
        },
        // TODO : check user input + notification
        createUpdatedUserInfos() {
            const updatedUserInfos = {
                username: this.actualUsername,
                email: this.actualEmail,
            }
            this.sendUpdatedUserInfos(updatedUserInfos)
        },
        sendUpdatedUserInfos(updatedUserInfos) {
            axios
                .put('http://localhost:3000/api/users/' + this.loginUserId + '/infos', updatedUserInfos, { headers: { Authorization: "Bearer " + this.loginToken }} )
                    .then(console.log("user infos modifiées !"), console.log( updatedUserInfos ))
                    .catch((error) => console.log(error));
        },
        // TODO : check user input + notification
        createUpdatedPassword() {

        },
        confirmDeletePost() {
            if (confirm('êtes vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
                this.deleteUser();
                console.log('suppression user confirmée');
            } else {
                console.log('suppression user annulée');
            }
        },
        deleteUser() {
            
        },
    },
    computed: {
    },
    beforeMount() { // hook juste avant le montage de la page, permet de gagner du temps
        this.getOneUser();
    },
    mounted () {
        // this.actualUsername = this.user.username;
        // this.actualEmail = this.user.email;
    },
}
</script>

<style lang="sass" scoped>
.user
    margin: auto
    margin-top: 6rem
    width: 500px
    height: 100%
    &__infos
        display: flex
        flex-direction: column
        align-items: center
        margin-top: 1rem
        margin-bottom: 1rem
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
            
    &__password
        display: flex
        flex-direction: column
        align-items: center
        margin-bottom: 1rem

form
    margin-top: 2rem
    padding: 1rem
    border-radius: 10px
    display: flex
    width: 100%
    flex-direction: column
    align-items: center
    background-color: #ffffff
    box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.2)
    input
        width: 250px
        margin-bottom: 0.5rem

button
    margin-bottom: 1rem
    padding: 0.25rem
    border: thin solid grey
    background: rgb(242, 242, 242)
    outline: none
    cursor: pointer

.button--red
    background-color: rgb(255, 204, 204)
    color: rgb(255, 77, 77)
    border: thin solid rgb(255, 77, 77)

</style>