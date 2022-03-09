<template>
    <div id="notifications-list"></div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "NotificationsList",
        inject: ["eventBus"],
        props: {
            profileurl: {
                type: String,
                required: false,
                default: ''
            }
        },
        computed: {
            ...mapGetters({
                notifications: 'notifications/getNotifications',
            })
        },
        created() {
            this.eventBus.$on('receive-formated-notification', this.onReceiveFormatedNotification)
        },
        mounted() {
            setTimeout(() => {
                this.notifications.forEach(notification => {
                    this.eventBus.$emit('format-notification', notification, this.profileurl)
                })
            },1000)
        },
        methods: {
            onReceiveFormatedNotification(element) {
                document.querySelector('#notifications-list').append(element)
            },
        }
    }
</script>

<style scoped>

</style>
