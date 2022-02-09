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
    export default {
        name: "Server",
        inject: ["eventBus"],
        components: {
            GravatarStatus: () => import('vuejs-estarter/components/widgets/GravatarStatus'),
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
            return {
                user: null,
            }
        },
        created() {
            // get main user
            if (sessionStorage.getItem("applicationUser")) {
                const data = JSON.parse(sessionStorage.getItem("applicationUser"))
                // this is the real logged user
                if(data.id == this.mainid) {
                    this.user = data
                } else {
                    this.loadUser()
                }

            } else {
                this.loadUser()
            }

            // init bus events
            this.eventBus.$on('who-am-i', this.sendUser)
            this.eventBus.$on('refresh-global-user', this.loadUser)
        },
        methods: {
            sendUser() {
                this.eventBus.$emit('here-i-am', this.user)
            },
            loadUser() {
                this.requestApi('/get-user-data')
                    .then(response => {
                        sessionStorage.setItem('applicationUser', JSON.stringify(response.user))
                        this.user = response.user
                        this.sendUser()
                    })
            }
        }
    }
</script>

<style scoped>

</style>
