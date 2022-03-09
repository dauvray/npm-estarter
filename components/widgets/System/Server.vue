<template>
    <div v-if="user" class="d-flex">
        <notifications-widget
            v-if="notificationactived"
            :user="user"
        ></notifications-widget>
        <gravatar-status
            size="small"
            :user="user"
        ></gravatar-status>
    </div>
</template>

<script>
    import {RestDataSourcesMixin} from 'vuejs-estarter/mixins/RestDataSourcesMixin'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "Server",
        inject: ["eventBus"],
        components: {
            GravatarStatus: () => import('vuejs-estarter/components/widgets/Gravatar'),
            NotificationsWidget: () => import('vuejs-estarter/components/widgets/System/Notifications')
        },
        mixins: [
            RestDataSourcesMixin
        ],
        props: {
            //this may be the laravel connected user
           mainid: {
               type: Number,
               required: false,
               default: null
           },
            notificationactived: {
               type: Boolean,
                required: false,
                default: false
            }
        },
        data() {
            return {}
        },
        computed: {
            ...mapGetters({
                user: 'me/getMe',
            })
        },
        created() {
            this['me/loadMe']()
            this.eventBus.$on('who-am-i', this.sendUser)
            // this.eventBus.$on('refresh-global-user', this.loadUser)
        },
        methods: {
            ...mapActions([
                'me/loadMe',
            ]),
            sendUser() {
                this.eventBus.$emit('here-i-am', this.user)
            },
        }
    }
</script>

<style scoped>

</style>
