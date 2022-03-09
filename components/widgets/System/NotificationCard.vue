<template>
    <div class="card card-notification">
        <author-widget
            :author="from"
            :profileurl="profileurl"
            size="small"
        ></author-widget>
    </div>
</template>

<script>
    export default {
        name: "NotificationCard",
        components: {
            AuthorWidget: () => import('vuejs-estarter/components/widgets/Author'),
        },
        props: {
            from: {
                type: Object,
                required: true
            },
            profileurl: {
                type: String,
                required: false,
                default: ''
            }
        }
    }
</script>

<style scoped>

</style>
