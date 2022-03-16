import {mapActions, mapGetters} from "vuex";

export default {
    components: {
        AuthorWidget: () => import('vuejs-estarter/components/widgets/Author'),
        DateHelper: () => import('vuejs-eblogger/components/widgets/DateHelper'),
    },
    props: {
        notification: {
            type: Object,
            required: true
        },
        profileurl: {
            type: String,
            required: false,
            default: ''
        }
    },
    data() {
        return {
            isActive: true
        }
    },
    computed: {
        ...mapGetters({
            me: 'me/getMe',
        }),
    },
    methods: {
        ...mapActions([
            'notifications/deleteNotification'
        ]),
        onDeleteNotification() {
            this['notifications/deleteNotification'](this.notification.id)
            this.isActive = false
        }
    }
}
