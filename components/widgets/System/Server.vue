<template>
    <div id="system-estarter">
        <AlertWidget/>
        <Teleport to=".avatar-wrapper">
            <NotificationsWidget
                v-if="notificationactived && logged"
                class="d-flex"
            ></NotificationsWidget>
            <GravatarStatus
                size="small"
            ></GravatarStatus>
        </Teleport>
    </div>
</template>

<script>

    import AlertWidget from 'vuejs-estarter/components/widgets/Alert.vue'
    import GravatarStatus from 'vuejs-estarter/components/widgets/Gravatar.vue'
    import { defineAsyncComponent } from 'vue'
    import { mapState, mapActions } from 'pinia'
    import { useMeStore } from 'vuejs-estarter/stores/me.js'

    export default {
        name: "Server",
        inject: ["eventBus"],
        components: {
         NotificationsWidget: defineAsyncComponent(() => import('vuejs-estarter/components/widgets/System/Notifications.vue')),
         AlertWidget,
         GravatarStatus,
        },
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
             ...mapState(useMeStore, {
                logged: 'logged',
            }),
        },
        created() {
            this.loadMe()
            this.eventBus.$on('who-am-i', this.sendUser)
        },
        unmounted() {
            this.eventBus.$off('who-am-i')
        },
        methods: {
            ...mapActions(
                useMeStore, ['loadMe']
                ),
            sendUser() {
                this.eventBus.$emit('here-i-am', this.user)
            },
        }
    }
</script>

<style scoped>

</style>
