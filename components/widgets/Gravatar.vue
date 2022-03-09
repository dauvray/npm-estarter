<template>
    <div class="position-relative">
        <img v-if="item.image" :src="`${path}/${item.image}.${size}.jpg`"
             class="author-image rounded-circle"/>
        <img v-else :src="item.gravatar" class="author-image rounded-circle"/>
        <gravatar-status
            :user="user"
            :size="size"
        ></gravatar-status>
    </div>
</template>

<script>
export default {
    name: 'Gravatar',
    inject: ["eventBus"],
    components: {
        GravatarStatus: () => import('vuejs-estarter/components/widgets/GravatarStatus')
    },
    props: {
        size: {
            type: String,
            default: 'medium'
        },
        user: {
            type: Object,
            required: true
        },
        path: {
            type: String,
            default: '/storage/users'
        }
    },
    data() {
        return {
            item: {...this.user}
        }
    },
    created() {
        this.eventBus.$on('here-i-am', this.refreshUser)
    },
    watch: {
        user: function (newValue, oldValue) {
            this.item = {...newValue}
        },
    },
    methods: {
        refreshUser(user) {
            if(user.id === this.item.id) {
                this.item = {...user}
            }
        }
    }
}
</script>

<style>

</style>
