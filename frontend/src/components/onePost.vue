<template>

<div :id="post._id" class="post-and-comments">

    <editPost
        v-if="post.user_id == loginUserId && hoverPost || loginRole == isAdmin && hoverPost"
        @hide-edit-menu="hoverPost = false"
        :post="post"/>

    <div class="post">

        <div
            class="post__header"
            @click.prevent="hoverPost = true"
            @mouseover="showEditMenu"
            @mouseout="hideEditMenu">

            <div class="user-picture"><img v-bind:src="post.userpicture"></div>
            <div class="user-name">{{ post.username }}</div>
            <div class="edit-post-menu"
                v-if="post.user_id == loginUserId && hoverPostEditButton && !hoverPost || loginRole == isAdmin && hoverPostEditButton && !hoverPost">
                EDIT.</div>
            <div class="date">{{ formattedDate(post.date_sql) }}</div>
        </div>

        <div class="post__content">
            <img v-bind:src="post.img">
            <div
                class="post__legend"
                :id="concatenate('legend_', post._id)">
                {{post.legend}}
            </div>
        </div>
        
        <addReaction
            :post="post"/>

        <addComment
            :post="post"
            v-show="showComments.includes(post._id)"/>
    
    </div>

    <getAllComments
        :post="post"
        v-show="showComments.includes(post._id)"/>

</div>

</template>

<script>
// eslint-disable-next-line no-unused-vars
const axios = require('axios');

import { mapState } from 'vuex'
import editPost from '@/components/editPost.vue'
import addComment from '@/components/addComment.vue'
import addReaction from '@/components/addReaction.vue'
import getAllComments from '@/components/getAllComments.vue'

export default {
    name: 'onePost',
    components: {
        editPost, addComment, addReaction, getAllComments
    },
    data: () => {
        return {
            loginUserId: JSON.parse(localStorage.getItem("vuex")).account.userId,
            loginRole: JSON.parse(localStorage.getItem("vuex")).account.role,
            isAdmin: 'admin',
            showComment: true,
            hoverPost: false,
            hoverPostEditButton: false,
            timeOutEditMenu: '',
        }
    },
    methods: {
        showEditMenu() { // on mouse over
            this.hoverPostEditButton = true;
            this.timeOutEditMenu = setTimeout(() => {this.hoverPost = true}, 1000);
        },
        hideEditMenu() { // on mouse out
            this.hoverPostEditButton = false;
            clearTimeout(this.timeOutEditMenu);
        },
        formattedDate(date_sql) {
            const formatted = new Date(date_sql);
            const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
            const optionsTime = {hour: '2-digit', minute: '2-digit'};
            const format_date_sql = 'le ' + formatted.toLocaleDateString('fr-FR', optionsDate) + ' à ' + formatted.toLocaleTimeString('fr-FR', optionsTime).replace(':', 'h');
            return format_date_sql;
        },
        concatenate(legend, postId) {
            const inputId = legend + postId;
            return inputId
        },
    },
    computed: { // VueX
        ...mapState(['showComments'])
    },
    props: {
        post: {
            type: Object,
            required: true,
        }
    },
    mounted() {
        this.$root.$on('edit-one-post', legendId => { // active le mode édition
            if (legendId == this.concatenate('legend_', this.post._id)) {
                document.getElementById(legendId).setAttribute("contenteditable", "true");
                document.getElementById(legendId).focus();
            }
        });
        this.$root.$on('legend-is-edited', legendId => { // au clic OK, le contenu de la nouvelle légende est envoyé à editPost
            if (legendId == this.concatenate('legend_', this.post._id)) {
                document.getElementById(legendId).setAttribute("contenteditable", "false");
                this.$root.$emit('edited-legend', document.getElementById(legendId).textContent);
            }
        });
    }
}
</script>

<style lang="sass" scoped>
.post-and-comments
    margin-bottom: 2rem

.post
    border-radius: 10px
    flex-direction: column
    background-color: #ffffff
    box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.2)
    &__header
        height: 50px
        display: flex
        flex-direction: row
        align-items: center
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
</style>

<style lang="sass">
.user-picture
    margin-left: 1rem
    height: 30px
    img
        width: 30px
        border-radius: 50%

.user-name
    margin-left: 1rem
    color: black
    font-weight: bold

.edit-post-menu
    margin-left: 1rem
    background-color: rgba(0, 204, 255, .1)
    border-radius: 3px
    color: rgba(0, 204, 255, 1)

.date
    color: #cdcdcd
    font-size: 10px
    margin-left: auto
    margin-right: 1rem
</style>