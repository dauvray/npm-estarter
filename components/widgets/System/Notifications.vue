<template>
    <div class="notification-btn">
        <button
            v-if="notifications.length"
            type="button"
            class="btn btn-link position-relative"
            @click="onDisplayNotifications"
        >
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
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "Notifications",
        inject: ["eventBus"],
        components: {

        },
        props: {
            // user: {
            //     type: Object,
            //     required: true
            // }
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
                this.getNotifications()
                this.interval = setInterval(this.getNotifications, 5000)
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
                this['notifications/loadNotifications']()
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
                document.location.href="/notifications"
            },
        }
    }
</script>

<style scoped>
    .notification-btn{
        position: absolute;
        z-index: 100;
        left: 25px;
    }
</style>
