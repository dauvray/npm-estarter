<template>
    <div class="notification-btn">
        <button
             v-if="notifications.length"
             type="button"
             class="btn btn-link position-relative"
             @click="onDisplayNotifications"
             >
             <div class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                 {{notifications.length}}
                 <span class="visually-hidden">unread messages</span>
             </div>
        </button>
        <Teleport to="body">
                <OffcanvasWidget
                    v-if="showModal"
                    :showBtn="false"
                    :trigger="showModal"
                    @hidden="onHideModal"
                    >
                    <template v-slot:header>Notifications</template>
            </OffcanvasWidget>
        </Teleport>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
   import { mapActions, mapState } from 'pinia'
   import { useNotificationsStore } from 'vuejs-estarter/stores/notifications'

    export default {
        name: "Notifications",
        inject: ["eventBus"],
        components: {
            OffcanvasWidget: defineAsyncComponent(() =>import('vuejs-estarter/components/widgets/Offcanvas.vue')),
        },

        data() {
            return {
                showModal: false,
              //  currentModalComponent: null,
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
        beforeUnmount() {
            clearInterval(this.interval)
            this.interval = null
        },
        computed: {
             ...mapState(useNotificationsStore, ['notifications']),
        },
        methods: {
             ...mapActions(useNotificationsStore, [
                'loadNotifications'
                ]),
            onShowModal() {
                this.showModal = true
            },
            onHideModal() {
                this.showModal = false
            },
            getNotifications() {
                this.loadNotifications()
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
                //document.location.href="/notifications"
               this.showModal = true
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
