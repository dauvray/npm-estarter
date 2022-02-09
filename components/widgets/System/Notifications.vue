<template>
    <div>
        <button
            type="button"
            class="btn btn-primary position-relative"
            @click="onDisplayNotifications"
        >
            Notification
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {{notifications.length}}
            <span class="visually-hidden">unread messages</span>
          </span>
        </button>

        <component
            v-bind:is="currentModalComponent"
            v-if="showModal"
            :show="showModal"
            :notification="currentNotification"
            @hide-modal="onHideModal"
        ></component>

    </div>
</template>

<script>
    import {RestDataSourcesMixin} from 'vuejs-estarter/mixins/RestDataSourcesMixin'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "Notifications",
        components: {

        },
        props: {
            user: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                showModal: false,
                currentModalComponent: null,
                currentNotification: null,
                interval: null,
            }
        },
        mounted() {
            if (!this.interval) {
                this.interval = setInterval(this.getNotifications, 1000);
            }
        },
        beforeDestroy() {
            clearInterval(this.interval)
            this.interval = null
        },
        computed: {
            ...mapGetters({
                notifications: 'notifications/getNotifications',
            }),
        },
        methods: {
            ...mapActions([
                'notifications/loadNotifications',
            ]),
            onShowModal() {
                this.showModal = true
            },
            onHideModal() {
                this.showModal = false
            },
            getNotifications() {
                this['notifications/loadNotifications'](this.user.id)
                .then(() => {
                    this.checkNotifications()
                })
            },
            checkNotifications() {
                this.notifications.forEach((notif, idx) => {
                    // check type and do something
                })
            },
            onDisplayNotifications() {

            },
        }
    }
</script>

<style scoped>

</style>
