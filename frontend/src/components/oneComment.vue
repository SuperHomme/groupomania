<template>

<div class="comment" :id="comment._id">

    <div class="user-picture comment__user-picture">
        <img v-bind:src="comment.userpicture">
    </div>
    
    <div class="comment__body">
        <div class="comment__infos">
            <div class="user-name comment__user-name">{{ comment.username }}</div>
            <div class="date comment__date">{{ formattedDate(comment.date_sql)}}</div>
        </div>
        <div class="comment__content">{{ comment.content }}</div>
    </div>

</div>

</template>

<script>
export default {
    name: 'oneComment',
    props: {
        comment: {
            type: Object,
            required: true,
        }
    },
    methods: {
        formattedDate(date_sql) {
            const formatted = new Date(date_sql);
            const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
            const optionsTime = {hour: '2-digit', minute: '2-digit'};
            const format_date_sql = 'le ' + formatted.toLocaleDateString('fr-FR', optionsDate) + ' à ' + formatted.toLocaleTimeString('fr-FR', optionsTime).replace(':', 'h');
            return format_date_sql;
        },
    },
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